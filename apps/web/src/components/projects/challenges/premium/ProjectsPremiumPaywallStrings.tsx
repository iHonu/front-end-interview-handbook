import { FormattedMessage, useIntl } from 'react-intl';

import Text from '~/components/ui/Text';

import type { ProjectsPremiumAccessControlType } from './ProjectsPremiumAccessControl';
import { projectsPaidPlanFeatures } from '../../purchase/ProjectsPricingFeaturesConfig';

import type { ProjectsSubscriptionPlan } from '@prisma/client';

export function useProjectsChallengePaywallTitle(
  access: ProjectsPremiumAccessControlType,
) {
  const intl = useIntl();

  switch (access) {
    case 'SUBSCRIBE':
    case 'INSUFFICIENT_CREDITS':
      return intl.formatMessage({
        defaultMessage: 'Premium challenge',
        description: 'Title for a premium project paywall',
        id: '4gesVU',
      });
    case 'RESUBSCRIBE_TO_UNLOCK':
      return intl.formatMessage({
        defaultMessage: 'Resubscribe to unlock',
        description: 'Title for a premium project paywall',
        id: 'Euaee/',
      });
    case 'RESUBSCRIBE_TO_ACCESS':
      return intl.formatMessage({
        defaultMessage: 'Resubscribe to access',
        description: 'Title for a premium project paywall',
        id: 'OTyn9U',
      });
    case 'UNLOCK':
      return intl.formatMessage({
        defaultMessage: 'Unlock this premium challenge',
        description: 'Title for a premium project paywall',
        id: 'IDanmC',
      });
  }
}

export function useProjectsChallengePaywallSubtitle(
  access: ProjectsPremiumAccessControlType,
  credits: number,
  plan: ProjectsSubscriptionPlan | null,
) {
  const intl = useIntl();

  switch (access) {
    case 'SUBSCRIBE':
      return intl.formatMessage({
        defaultMessage:
          'Purchase premium to get access to premium challenges, production-ready Figma design files, official guides, solutions, and exclusive component tracks and skill plans.',
        description: 'Subtitle for a premium project paywall',
        id: 'f5Z9tM',
      });
    case 'RESUBSCRIBE_TO_ACCESS':
      return (
        <FormattedMessage
          defaultMessage="You have previously unlocked this challenge. Resubscribe to premium to regain access to this challenge and all of its premium features, including the  the Figma design files, official guides, and solutions."
          description="Subtitle for project paywall"
          id="Qkj3kc"
        />
      );
    case 'RESUBSCRIBE_TO_UNLOCK':
      return (
        <FormattedMessage
          defaultMessage="You have <bold>{amountLeft}</bold> premium credit(s) left. Resubscribe to premium to unlock this challenge and access all its premium features,  including the Figma design files, official guides, and solutions."
          description="Subtitle for project paywall"
          id="62VJlJ"
          values={{
            amountLeft: credits,
            bold: (chunks) => <Text weight="bold">{chunks}</Text>,
          }}
        />
      );
    case 'UNLOCK':
      return (
        <FormattedMessage
          defaultMessage="You have <bold>{amountLeft}</bold>/{totalAmount} premium credit(s) left. Unlock this project to access all premium features for this challenge, including the Figma design files, official guides, and solutions."
          description="Subtitle for project paywall"
          id="r4LDrI"
          values={{
            amountLeft: credits,
            bold: (chunks) => <Text weight="bold">{chunks}</Text>,
            totalAmount: Math.max(
              credits,
              projectsPaidPlanFeatures[plan!]?.credits || 0,
            ),
          }}
        />
      );
    case 'INSUFFICIENT_CREDITS':
      return (
        <FormattedMessage
          defaultMessage="You have no premium credits left for this cycle."
          description="Subtitle for project paywall"
          id="WqVQZk"
        />
      );
  }
}

export function useProjectsChallengeSubmissionPaywallTitle(
  access: ProjectsPremiumAccessControlType,
) {
  const intl = useIntl();

  switch (access) {
    case 'SUBSCRIBE':
    case 'INSUFFICIENT_CREDITS':
    case 'UNLOCK':
      return intl.formatMessage({
        defaultMessage: 'User submission for premium challenge',
        description:
          'Title for a paywall of a submission for a premium project',
        id: '5t66sB',
      });
    case 'RESUBSCRIBE_TO_UNLOCK':
      return intl.formatMessage({
        defaultMessage: 'Resubscribe to unlock',
        description:
          'Title for a paywall of a submission for a premium project',
        id: 'j+cFfc',
      });
    case 'RESUBSCRIBE_TO_ACCESS':
      return intl.formatMessage({
        defaultMessage: 'Resubscribe to access',
        description:
          'Title for a paywall of a submission for a premium project',
        id: 'ks4qo1',
      });
  }
}

export function useProjectsChallengeSubmissionPaywallSubtitle(
  access: ProjectsPremiumAccessControlType,
  credits: number,
  plan: ProjectsSubscriptionPlan | null,
) {
  const intl = useIntl();

  switch (access) {
    case 'SUBSCRIBE':
      return intl.formatMessage({
        defaultMessage:
          'Subscribe to premium to learn from user submissions for premium challenges.',
        description: 'Subtitle for a premium project paywall',
        id: 'WEMJz4',
      });
    case 'RESUBSCRIBE_TO_ACCESS':
      return (
        <FormattedMessage
          defaultMessage="This submission is for a premium challenge you have previously unlocked. Resubscribe to premium to learn from user submissions for premium challenges."
          description="Subtitle for project paywall"
          id="201SF4"
        />
      );
    case 'RESUBSCRIBE_TO_UNLOCK':
      return (
        <FormattedMessage
          defaultMessage="Resubscribe to premium to learn from user submissions for premium challenges. You have <bold>{amountLeft}</bold> premium credit(s) left."
          description="Subtitle for project paywall"
          id="QJPZWQ"
          values={{
            amountLeft: credits,
            bold: (chunks) => <Text weight="bold">{chunks}</Text>,
          }}
        />
      );
    case 'UNLOCK':
      return (
        <FormattedMessage
          defaultMessage="Unlock this challenge to learn from user submissions for premium challenges. You have <bold>{amountLeft}</bold>/{totalAmount} premium credit(s) left. "
          description="Subtitle for project paywall"
          id="u6hx4I"
          values={{
            amountLeft: credits,
            bold: (chunks) => <Text weight="bold">{chunks}</Text>,
            totalAmount: Math.max(
              credits,
              projectsPaidPlanFeatures[plan!]?.credits || 0,
            ),
          }}
        />
      );
    case 'INSUFFICIENT_CREDITS':
      return (
        <FormattedMessage
          defaultMessage="You have no premium credits left for this cycle. Please wait for new premium credits to be added when the next cycle starts."
          description="Subtitle for project paywall"
          id="1pqvM+"
        />
      );
  }
}
