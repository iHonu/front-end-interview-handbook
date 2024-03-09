import type Stripe from 'stripe';

import type { InterviewsProfileSubscriptionPlan } from '~/components/global/UserProfileProvider';

import { createSupabaseAdminClientGFE_SERVER_ONLY } from '~/supabase/SupabaseServerGFE';

export function interviewsDetermineSubscriptionPlan(
  price: Stripe.Price | null,
): InterviewsProfileSubscriptionPlan {
  if (price == null) {
    throw new Error('Price is not found');
  }

  const { type, recurring } = price;

  if (type === 'one_time') {
    return 'lifetime';
  }

  if (type === 'recurring' && recurring != null) {
    const { interval, interval_count: intervalCount } = recurring;

    if (interval === 'year' && intervalCount === 1) {
      return 'year';
    }

    if (interval === 'month' && intervalCount === 3) {
      return 'quarter';
    }

    if (interval === 'month' && intervalCount === 1) {
      return 'month';
    }
  }

  throw new Error('Unable to determine plan');
}

export async function interviewsCustomerAddPlan(
  customerId: Stripe.Customer | Stripe.DeletedCustomer | string,
  planName: InterviewsProfileSubscriptionPlan,
) {
  const supabaseAdmin = createSupabaseAdminClientGFE_SERVER_ONLY();

  await supabaseAdmin
    .from('Profile')
    .update({
      plan: planName,
      premium: true,
    })
    .eq('stripeCustomer', customerId);
}

export async function interviewsCustomerRemovePlan(
  customerId: Stripe.Customer | Stripe.DeletedCustomer | string,
) {
  const supabaseAdmin = createSupabaseAdminClientGFE_SERVER_ONLY();

  await supabaseAdmin
    .from('Profile')
    .update({
      plan: null,
      premium: false,
    })
    .eq('stripeCustomer', customerId);
}
