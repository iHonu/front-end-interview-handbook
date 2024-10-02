import clsx from 'clsx';
import type { ComponentProps } from 'react';
import { RiArrowRightSLine } from 'react-icons/ri';

import { FormattedMessage } from '~/components/intl';
import Button from '~/components/ui/Button';
import CardContainer from '~/components/ui/Card/CardContainer';
import Container from '~/components/ui/Container';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import Marquee from '~/components/ui/Marquee';
import { themeGradientHeading } from '~/components/ui/theme';

import type { InterviewsMarketingTestimonial } from './InterviewsMarketingTestimonialCard';
import TestimonialCard from './InterviewsMarketingTestimonialCard';

type Props = Readonly<{
  columns?: number;
  containerVariant?: ComponentProps<typeof Container>['variant'];
  showSeeAllLink?: boolean;
  testimonials: ReadonlyArray<InterviewsMarketingTestimonial>;
}>;

export default function InterviewsMarketingTestimonialsSection({
  containerVariant,
  columns = 3,
  showSeeAllLink = true,
  testimonials,
}: Props) {
  return (
    <Container
      className={clsx('flex flex-col gap-16', 'py-20', 'isolate')}
      variant={containerVariant}>
      <div className="max-w-xl">
        <Heading
          className={clsx(themeGradientHeading, 'pb-1')}
          level="heading2"
          weight="medium">
          <FormattedMessage
            defaultMessage="{count} engineers trust us with their job interviews"
            description="Testimonial section title"
            id="wm6L7K"
            values={{
              count: '100k+',
            }}
          />
        </Heading>
      </div>
      <Section>
        <div className={clsx('mx-auto md:mx-0', 'hidden sm:flow-root')}>
          <CardContainer
            className={clsx(
              '-mt-8 sm:-mx-3 sm:text-[0] lg:columns-2',
              columns === 3 && 'xl:columns-3',
              columns === 4 && 'xl:columns-3 2xl:columns-4',
            )}>
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="pt-6 sm:inline-block sm:w-full sm:px-3">
                <TestimonialCard {...testimonial} />
              </div>
            ))}
          </CardContainer>
        </div>
        <div className="sm:hidden">
          <CardContainer className="relative h-[500px]">
            <Marquee periodSeconds={300} startEndGap={24}>
              <div className="grid w-max grid-flow-col grid-rows-1 gap-6">
                {testimonials.map((testimonial) => (
                  <div key={testimonial.id} className="w-auto max-w-[75vw]">
                    <div className="flex flex-col whitespace-normal">
                      <TestimonialCard {...testimonial} />
                    </div>
                  </div>
                ))}
              </div>
            </Marquee>
          </CardContainer>
        </div>
        {showSeeAllLink && (
          <div className="text-center">
            <Button
              href="/interviews/testimonials"
              icon={RiArrowRightSLine}
              label="See all testimonials"
              size="md"
              variant="secondary"
            />
          </div>
        )}
      </Section>
    </Container>
  );
}
