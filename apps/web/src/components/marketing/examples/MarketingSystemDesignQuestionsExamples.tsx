import clsx from 'clsx';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import gtag from '~/lib/gtag';

import type { QuestionMetadata } from '~/components/questions/common/QuestionsTypes';
import QuestionsList from '~/components/questions/listings/QuestionsList';
import Button from '~/components/ui/Button';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';

export default function MarketingSystemDesignQuestionsExamples({
  questions,
}: Readonly<{
  questions: ReadonlyArray<QuestionMetadata>;
}>) {
  const intl = useIntl();
  const sectionMarkerRef = useRef(null);
  const isInView = useInView(sectionMarkerRef, {
    amount: 'all',
    once: true,
  });

  return (
    <div
      className={clsx(
        'transition-opacity duration-[1500ms] ease-in-out lg:grid lg:grid-cols-6 lg:gap-x-8',
        isInView ? 'opacity-100' : 'opacity-0',
      )}>
      <div className="lg:col-span-2">
        <p className="text-brand-500 text-base font-semibold sm:text-lg">
          <FormattedMessage
            defaultMessage="You can't find it elsewhere"
            description="Label for an example list of System Design Questions on marketing pages"
            id="kL0yEH"
          />
        </p>
        <Heading className="mt-2 text-2xl font-bold tracking-tight text-slate-900 md:text-3xl lg:text-4xl">
          <FormattedMessage
            defaultMessage="System Design Questions"
            description="Title for an example list of System Design Questions on marketing pages"
            id="jnV/ZP"
          />
        </Heading>
        <Section>
          <div ref={sectionMarkerRef} />
          <div className="space-y-2 py-10 text-lg text-slate-500 md:text-xl">
            <FormattedMessage
              defaultMessage="Front end system design resources are virtually non-existent. This is the only place you'll find in-depth solutions for front end system design questions along with our proven answering framework."
              description="Subtitle for an example list of User Interface Questions on marketing pages"
              id="QIRY6V"
            />
          </div>
          <div>
            <Button
              href="/prepare/system-design"
              label={intl.formatMessage({
                defaultMessage: 'View All Questions',
                description:
                  'Link label to the list of all System Design questions',
                id: '68EGSg',
              })}
              variant="primary"
              onClick={() => {
                gtag.event({
                  action: 'marketing.questions.system_design.cta.click',
                  category: 'engagement',
                  label: 'View All Questions',
                });
              }}
            />
          </div>
        </Section>
      </div>
      <Section>
        <div className="relative mt-12 select-none lg:col-span-4 lg:mt-0">
          <QuestionsList
            checkIfCompletedQuestion={() => false}
            columns={2}
            questions={questions}
            showProgress={false}
          />
        </div>
      </Section>
    </div>
  );
}
