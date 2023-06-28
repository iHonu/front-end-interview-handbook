import type { ReactNode } from 'react';
import {
  RiCss3Line,
  RiHtml5Line,
  RiJavascriptLine,
  RiReactjsLine,
} from 'react-icons/ri';
import { FormattedMessage, useIntl } from 'react-intl';

import TextPairing from '~/components/common/TextPairing';
import Badge from '~/components/ui/Badge';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import Tabs from '~/components/ui/Tabs';

import { roundQuestionCountToNearestTen } from '~/db/QuestionsUtils';

import type { QuestionListCategory } from '../types';

type CategoryValue = QuestionListCategory | 'react';

type Props = Readonly<{
  category: CategoryValue;
  count: number;
  description: string;
  logo?: ReactNode;
  title: string;
  titleAddOnText?: string;
}>;

const items: ReadonlyArray<{
  href: string;
  icon: (props: React.ComponentProps<'svg'>) => JSX.Element;
  label: string;
  value: CategoryValue;
}> = [
  {
    href: '/questions/js',
    icon: RiJavascriptLine,
    label: 'JavaScript',
    value: 'js',
  },
  {
    href: '/questions/html',
    icon: RiHtml5Line,
    label: 'HTML',
    value: 'html',
  },
  {
    href: '/questions/css',
    icon: RiCss3Line,
    label: 'CSS',
    value: 'css',
  },
  {
    href: '/questions/react',
    icon: RiReactjsLine,
    label: 'React',
    value: 'react',
  },
];

export default function QuestionCategoryTitleSection({
  count,
  category,
  description,
  logo,
  title,
  titleAddOnText,
}: Props) {
  const intl = useIntl();

  return (
    <div className="flex flex-col gap-y-8">
      <div className="flex flex-col gap-y-4">
        <div className="flex items-center gap-x-4">
          <Heading level="heading5">
            <FormattedMessage
              defaultMessage="Practice by framework"
              description="Questions list page title"
              id="OHistx"
            />
          </Heading>
          <Badge
            label={intl.formatMessage(
              {
                defaultMessage: '{questionCount}+ questions',
                description: 'Number of questions in the list',
                id: 'LzKi2d',
              },
              {
                questionCount: roundQuestionCountToNearestTen(count),
              },
            )}
            size="sm"
            variant="primary"
          />
        </div>
        <Tabs
          label={intl.formatMessage({
            defaultMessage: 'Select question category',
            description: 'Tab label to select another question category',
            id: 'MOxuKN',
          })}
          size="sm"
          tabs={items}
          value={category}
        />
      </div>
      <Section>
        <div className="flex gap-6">
          {logo}
          <TextPairing
            description={description}
            title={title}
            titleAddOnText={titleAddOnText}
          />
        </div>
      </Section>
    </div>
  );
}
