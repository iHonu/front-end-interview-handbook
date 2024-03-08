import type { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';

import absoluteUrl from '~/lib/absoluteUrl';
import { normalizeCurrencyValue } from '~/lib/stripeUtils';

import fetchInterviewsPricingPlanPaymentConfigLocalizedRecord from '~/components/interviews/purchase/fetchInterviewsPricingPlanPaymentConfigLocalizedRecord';
import type { InterviewsPricingPlanType } from '~/components/interviews/purchase/InterviewsPricingPlans';
import fetchProjectsPricingPlanPaymentConfigLocalizedRecord from '~/components/projects/purchase/fetchProjectsPricingPlanPaymentConfigLocalizedRecord';
import type {
  PurchasePricingPlanPaymentConfigBase,
  PurchasePricingPlanPaymentConfigLocalized,
} from '~/components/purchase/PurchaseTypes';

import type { ProjectsSubscriptionPlan } from '@prisma/client';

type BaseCheckoutQueryParams = Readonly<{
  // Two-letter ISO country code.
  country_code: string;
  // First promoter tracking ID.
  first_promoter_tid?: string;
  // Email to send the receipt to.
  receipt_email?: string;
  // Stripe customer ID (cus_xxxxx)
  stripe_customer_id: string;
}>;

export type CheckoutProductVertical = 'interviews' | 'projects';

type InterviewsCheckoutQueryParams = BaseCheckoutQueryParams &
  Readonly<{
    plan_type: InterviewsPricingPlanType;
    product_vertical: 'interviews';
  }>;

type ProjectsCheckoutQueryParams = BaseCheckoutQueryParams &
  Readonly<{
    plan_type: ProjectsSubscriptionPlan;
    product_vertical: 'projects';
  }>;

export type CheckoutQueryParams =
  | InterviewsCheckoutQueryParams
  | ProjectsCheckoutQueryParams;

// This API exists as a standard API route because the Stripe npm module
// uses some Node.js APIs which are not available in Edge runtimes.
// So we separate out the checkout session generation functionality into
// two parts:
//  1. Part that requires next/server (available on middlewares and Edge runtime) like geolocation to get the user location and convert it into a currency.
//  2. Part that requires Node.js APIs, the generation of the checkout session (this file).

// This API is secret and should only be called on the server. Why? Because we want
// to make it harder for scammers to spoof the country code and check out via a currency
// and price that they don't belong to and pay a lower price than they deserve.
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const {
    country_code: countryCode,
    first_promoter_tid: firstPromoterTrackingId,
    stripe_customer_id: stripeCustomerId,
    receipt_email: receiptEmail,
    product_vertical: productVertical,
    plan_type: planType,
  } = req.query as CheckoutQueryParams;

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: '2023-10-16',
  });

  const planPaymentConfig: PurchasePricingPlanPaymentConfigLocalized =
    await (async () => {
      switch (productVertical) {
        case 'projects': {
          const data =
            await fetchProjectsPricingPlanPaymentConfigLocalizedRecord(
              countryCode,
            );

          return data[planType];
        }
        case 'interviews': {
          const data =
            await fetchInterviewsPricingPlanPaymentConfigLocalizedRecord(
              countryCode,
            );

          return data[planType];
        }
      }
    })();

  if (planPaymentConfig == null) {
    return res.status(401).send({
      error: {
        message: `Invalid or non-existent plan type: ${planType}`,
      },
      success: false,
    });
  }

  const { currency, unitCostCurrency } = planPaymentConfig;
  const unitAmountInStripeFormat = normalizeCurrencyValue(
    unitCostCurrency.withPPP.after,
    currency,
  );

  if (planPaymentConfig.checkoutMode === 'subscription') {
    return await processSubscriptionPlan(
      req,
      res,
      stripeCustomerId,
      stripe,
      planType,
      planPaymentConfig,
      currency,
      unitAmountInStripeFormat,
      firstPromoterTrackingId,
    );
  }

  if (planPaymentConfig.checkoutMode === 'payment') {
    return await processOneTimePlan(
      req,
      res,
      stripeCustomerId,
      stripe,
      planType,
      planPaymentConfig,
      currency,
      unitAmountInStripeFormat,
      receiptEmail,
      firstPromoterTrackingId,
    );
  }
}

async function processSubscriptionPlan(
  req: NextApiRequest,
  res: NextApiResponse,
  stripeCustomerId: string,
  stripe: Stripe,
  planType: string,
  planPaymentConfig: PurchasePricingPlanPaymentConfigBase,
  currency: string,
  unitAmountInCurrency: number,
  firstPromoterTrackingId?: string,
) {
  const { recurring, urls, productId } = planPaymentConfig;

  const priceObject = await stripe.prices.create({
    currency,
    product: productId,
    recurring: {
      interval: recurring!.interval!,
      interval_count: recurring?.count,
    },
    unit_amount: unitAmountInCurrency,
  });

  const { origin } = absoluteUrl(req);

  const cancelUrl = `${origin}/${urls.cancel}?cancel=1&plan=${planType}`;
  const successUrl = `${origin}/${urls.success}?plan=${planType}`;

  const session = await stripe.checkout.sessions.create({
    allow_promotion_codes: planPaymentConfig.allowPromoCode,
    cancel_url: cancelUrl,
    client_reference_id: firstPromoterTrackingId || 'fp_' + String(Date.now()),
    customer: stripeCustomerId,
    line_items: [
      {
        price: priceObject.id,
        quantity: 1,
      },
    ],
    mode: 'subscription',
    success_url: successUrl,
  });

  return res.json({
    payload: {
      id: session.id,
      url: session.url,
    },
    success: true,
  });
}

async function processOneTimePlan(
  req: NextApiRequest,
  res: NextApiResponse,
  stripeCustomerId: string,
  stripe: Stripe,
  planType: string,
  planPaymentConfig: PurchasePricingPlanPaymentConfigBase,
  currency: string,
  unitAmountInCurrency: number,
  receiptEmail?: string,
  firstPromoterTrackingId?: string,
) {
  const { origin } = absoluteUrl(req);
  const { urls, productId } = planPaymentConfig;

  const cancelUrl = `${origin}/${urls.cancel}?cancel=1&plan=${planType}`;
  const successUrl = `${origin}/${urls.success}?plan=${planType}`;

  const session = await stripe.checkout.sessions.create({
    allow_promotion_codes: planPaymentConfig.allowPromoCode,
    cancel_url: cancelUrl,
    client_reference_id: firstPromoterTrackingId || 'fp_' + String(Date.now()),
    customer: stripeCustomerId,
    invoice_creation: {
      // TODO: find out cost for invoice creation and disable if too expensive.
      enabled: true,
    },
    line_items: [
      {
        price_data: {
          currency,
          product: productId,
          unit_amount: unitAmountInCurrency,
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    payment_intent_data: {
      receipt_email: receiptEmail ?? undefined,
    },
    success_url: successUrl,
  });

  return res.json({
    payload: {
      id: session.id,
      url: session.url,
    },
    success: true,
  });
}
