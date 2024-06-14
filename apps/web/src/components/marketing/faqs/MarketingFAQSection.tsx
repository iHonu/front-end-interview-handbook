'use client';

import clsx from 'clsx';

import type { FAQItems } from '~/data/faqs/FAQs';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '~/components/ui/Accordion';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import Prose from '~/components/ui/Prose';

type Props = Readonly<{
  faqs: FAQItems;
  hideTitle?: boolean;
  title: string;
}>;

export default function MarketingFAQSection({
  faqs,
  title,
  hideTitle = false,
}: Props) {
  return (
    <div className="flex flex-col gap-y-2">
      <Heading className={clsx(hideTitle && 'sr-only')} level="heading4">
        {title}
      </Heading>
      <Section>
        <Accordion type="multiple">
          {faqs.map((faq) => (
            <AccordionItem key={faq.key} value={faq.key}>
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent>
                <Prose className="prose-sm sm:prose-base">{faq.answer}</Prose>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Section>
    </div>
  );
}