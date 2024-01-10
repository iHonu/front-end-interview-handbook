'use client';

import { FormattedMessage } from 'react-intl';

import Container from '~/components/ui/Container';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';

import { PromotionsReviewCashbackCard } from './review/PromotionsReviewCashbackCard';
import { PromotionsSeasonalDiscountCard } from './seasonal/PromotionsSeasonalDiscountCard';
import { PromotionsSocialDiscountCard } from './social/PromotionsSocialDiscountCard';
import { PromotionsStudentDiscountCard } from './student/PromotionsStudentDiscountCard';

export default function PromotionsPage() {
  return (
    <Container
      className="my-12 flex flex-col gap-y-8 md:my-24 md:gap-y-16"
      variant="narrow">
      <Heading level="heading2">
        <FormattedMessage
          defaultMessage="Promotions"
          description="Promotions on the platform"
          id="RBApo9"
        />
      </Heading>
      <Section>
        <div className="grid gap-4 md:gap-6 lg:gap-12">
          <PromotionsSeasonalDiscountCard />
          <PromotionsSocialDiscountCard />
          <PromotionsStudentDiscountCard />
          <PromotionsReviewCashbackCard />
        </div>
      </Section>
    </Container>
  );
}