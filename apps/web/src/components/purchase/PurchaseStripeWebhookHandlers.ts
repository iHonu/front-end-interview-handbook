import type Stripe from 'stripe';

import type { InterviewsProfileSubscriptionPlan } from '../global/UserProfileProvider';
import {
  interviewsCustomerAddPlan,
  interviewsCustomerRemovePlan,
  interviewsDetermineSubscriptionPlan,
} from '../interviews/purchase/InterviewsStripeSyncUtils';
import {
  projectsCustomerAddPlan,
  projectsCustomerRemovePlan,
  projectsDetermineSubscriptionPlan,
} from '../projects/purchase/ProjectsStripeSyncUtils';

import type { ProjectsSubscriptionPlan } from '@prisma/client';

export async function purchaseCustomerAddPlan(
  customerId: Stripe.Customer | Stripe.DeletedCustomer | string,
  price: Stripe.Price | null,
) {
  if (price == null) {
    throw new Error('Price is not found');
  }

  const productID = price.product;

  switch (productID) {
    // TODO: Support interviews lifetime upgrade as well.
    case process.env.STRIPE_PRODUCT_ID_INTERVIEWS: {
      const planName: InterviewsProfileSubscriptionPlan =
        interviewsDetermineSubscriptionPlan(price);

      await interviewsCustomerAddPlan(customerId, planName);

      return { customerId, plan: planName, productDomain: 'interviews' };
    }
    case process.env.STRIPE_PRODUCT_ID_PROJECTS: {
      const planName: ProjectsSubscriptionPlan =
        projectsDetermineSubscriptionPlan(price);

      await projectsCustomerAddPlan(customerId, planName);

      return { customerId, plan: planName, productDomain: 'projects' };
    }
    default: {
      throw new Error(`Unknown product ${productID}`);
    }
  }
}

export async function purchaseCustomerRemovePlan(
  subscription: Stripe.Subscription,
) {
  const customerId = subscription.customer;
  const { price } = subscription.items.data[0];
  const productID = price.product;

  switch (productID) {
    case process.env.STRIPE_PRODUCT_ID_INTERVIEWS: {
      await interviewsCustomerRemovePlan(customerId);

      return {
        customerId,
        plan: interviewsDetermineSubscriptionPlan(price),
        productDomain: 'interviews',
      };
    }
    case process.env.STRIPE_PRODUCT_ID_PROJECTS: {
      await projectsCustomerRemovePlan(customerId);

      return {
        customerId,
        plan: projectsDetermineSubscriptionPlan(price),
        productDomain: 'projects',
      };
    }
    default: {
      throw new Error(`Unknown product ${productID}`);
    }
  }
}
