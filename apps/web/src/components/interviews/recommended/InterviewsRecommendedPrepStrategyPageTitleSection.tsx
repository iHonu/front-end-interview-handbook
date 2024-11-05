import clsx from 'clsx';
import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';
import {
  RiArrowDownSLine,
  RiArrowRightLine,
  RiCheckFill,
} from 'react-icons/ri';

import { trpc } from '~/hooks/trpc';

import { useGuidesData } from '~/data/Guides';

import { FormattedMessage, useIntl } from '~/components/intl';
import Anchor from '~/components/ui/Anchor';
import Badge from '~/components/ui/Badge';
import Chip from '~/components/ui/Chip';
import Divider from '~/components/ui/Divider';
import Popover from '~/components/ui/Popover';
import Text from '~/components/ui/Text';
import {
  themeBorderElementColor,
  themeOutlineElementBrandColor_FocusVisible,
  themeTextBrandColor_GroupHover,
  themeTextSubtleColor,
} from '~/components/ui/theme';
import Tooltip from '~/components/ui/Tooltip';

import type { QuestionProgress } from '~/db/QuestionsProgressTypes';

import InterviewsPageHeaderActions from '../common/InterviewsPageHeaderActions';
import type { QuestionMetadata } from '../questions/common/QuestionsTypes';
import QuestionsStudyListPageTitleSection from '../questions/listings/learning/QuestionsStudyListPageTitleSection';
import QuestionListingQuestionCount from '../questions/listings/stats/QuestionListingQuestionCount';

import { useUser } from '@supabase/auth-helpers-react';

function RecommendedItemsDropdown({
  sessions,
}: {
  sessions: ReadonlyArray<{
    _count: {
      progress: number;
    };
    key: string;
  }>;
}) {
  const gfe75session = sessions.find(
    (session) => session.key === 'greatfrontend75',
  );
  const blind75session = sessions.find((session) => session.key === 'blind75');
  const guidesData = useGuidesData();

  const items = [
    {
      href: guidesData['front-end-interview-playbook'].href,
      // TODO(interviews): remove hardcoding
      isCompleted: false,
      label: guidesData['front-end-interview-playbook'].name,
    },
    {
      href: '/interviews/greatfrontend75',
      // TODO(interviews): better way to count completion.
      isCompleted: gfe75session?._count.progress === 75,
      label: 'GFE 75',
    },
    {
      href: '/interviews/blind75',
      // TODO(interviews): better way to count completion.
      isCompleted: blind75session?._count.progress === 75,
      label: 'Blind 75',
    },
    {
      href: guidesData['front-end-system-design-playbook'].href,
      // TODO(interviews): remove hardcoding
      isCompleted: false,
      label: guidesData['front-end-system-design-playbook'].shortName,
    },
  ];

  const pathname = usePathname();

  return (
    <Popover
      className="flex flex-col gap-6 !p-6"
      side="bottom"
      trigger={
        <button
          className={clsx(themeOutlineElementBrandColor_FocusVisible)}
          type="button">
          <Tooltip
            asChild={true}
            label={
              <FormattedMessage
                defaultMessage="Explore other items from our recommended preparation strategy."
                description="Tooltip for other recommended preparation strategy"
                id="/7J8Gp"
              />
            }>
            <div className="flex items-center gap-1">
              <Text
                className="line-clamp-1 text-ellipsis text-left"
                size="body3"
                weight="medium">
                <FormattedMessage
                  defaultMessage="{count} other items"
                  description="Trigger label for other items"
                  id="59u5/i"
                  values={{
                    count: items.length - 1,
                  }}
                />
              </Text>
              <RiArrowDownSLine
                aria-hidden={true}
                className={clsx('size-4 shrink-0', themeTextSubtleColor)}
              />
            </div>
          </Tooltip>
        </button>
      }>
      <Text className="block" color="secondary" size="body3" weight="medium">
        <FormattedMessage
          defaultMessage="Recommended prep strategy"
          description="Label for other items dropdown"
          id="gBdxyo"
        />
      </Text>
      <div className="flex flex-col gap-6">
        {items.map(({ label, href, isCompleted }, index) => {
          const isSelected = pathname ? href.startsWith(pathname) : false;

          return (
            <div key={label} className="flex w-full gap-4">
              <div
                className={clsx(
                  'relative flex flex-col justify-center self-stretch',
                )}>
                {isCompleted ? (
                  <Chip
                    icon={RiCheckFill}
                    isLabelHidden={true}
                    label="Completed"
                    size="sm"
                    variant="success"
                  />
                ) : (
                  <Chip
                    label={(index + 1).toString()}
                    size="sm"
                    variant={isSelected ? 'active' : 'neutral'}
                  />
                )}
                {index < items.length - 1 && (
                  <div
                    className={clsx(
                      'absolute top-full h-4 w-px translate-y-1 self-center border-l',
                      themeBorderElementColor,
                    )}
                  />
                )}
              </div>
              <Anchor
                className={clsx(
                  'flex grow items-center justify-between gap-4',
                  'group',
                  'transition-colors',
                )}
                href={href}
                variant="unstyled">
                <Text
                  className="block group-hover:text-neutral-900 dark:group-hover:text-neutral-100"
                  color={isSelected ? 'default' : 'secondary'}
                  size="body2"
                  weight={isSelected ? 'bold' : 'normal'}>
                  {label}
                </Text>
                {!isSelected && (
                  <RiArrowRightLine
                    className={clsx(
                      'size-4 shrink-0',
                      themeTextSubtleColor,
                      themeTextBrandColor_GroupHover,
                    )}
                  />
                )}
              </Anchor>
            </div>
          );
        })}
      </div>
    </Popover>
  );
}

type CommonProps = Readonly<{
  description: ReactNode;
  features: ReadonlyArray<{
    icon: (props: React.ComponentProps<'svg'>) => JSX.Element;
    label: string;
  }>;
  longDescription: ReactNode;
  metadata?: {
    description: string;
    href: string;
    title: string;
  };
  overallProgress?: ReadonlyArray<QuestionProgress>;
  questions?: ReadonlyArray<QuestionMetadata>;
  questionsSessionKey?: string;
  showQuestionCountCard?: boolean;
  showRecommendedItemsDropdown?: boolean;
  title: string;
}>;

type WithIconProps = CommonProps &
  Readonly<{
    icon: (props: React.ComponentProps<'svg'>) => JSX.Element;
  }>;

type WithLogoProps = CommonProps &
  Readonly<{
    logo: React.ReactNode;
  }>;

type Props = WithIconProps | WithLogoProps;

export default function InterviewsRecommendedPrepStrategyPageTitleSection({
  description,
  title,
  features,
  longDescription,
  metadata,
  questions,
  overallProgress,
  showQuestionCountCard = true,
  showRecommendedItemsDropdown = true,
  ...props
}: Props) {
  const intl = useIntl();
  const user = useUser();
  const { data: questionListSessions } =
    trpc.questionLists.getActiveSessions.useQuery(undefined, {
      enabled: !!user && showRecommendedItemsDropdown,
    });

  const sessions = questionListSessions ?? [];

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-wrap items-center justify-between gap-x-2 gap-y-4">
        {showRecommendedItemsDropdown && (
          <div className="flex items-center gap-3">
            <Tooltip
              asChild={true}
              label={
                <FormattedMessage
                  defaultMessage="This study list is part of our recommended preparation strategy."
                  description="Tooltip for recommended preparation strategy badge"
                  id="G+XbLQ"
                />
              }>
              <Badge
                label={intl.formatMessage({
                  defaultMessage: 'Recommended',
                  description: 'Label for Recommended tag',
                  id: 'baItxW',
                })}
                size="xs"
                variant="primary"
              />
            </Tooltip>
            <RecommendedItemsDropdown sessions={sessions} />
          </div>
        )}
        {metadata && (
          <div className="flex flex-1 justify-end">
            <InterviewsPageHeaderActions metadata={metadata} />
          </div>
        )}
      </div>
      <QuestionsStudyListPageTitleSection
        description={description}
        features={features}
        overallProgress={overallProgress ?? []}
        progressTrackingAvailableToNonPremiumUsers={true}
        questions={questions ?? []}
        title={title}
        {...props}
      />
      <Divider />
      {showQuestionCountCard ? (
        <div className={clsx('grid items-center gap-6 lg:grid-cols-12')}>
          <div className="lg:col-span-9">{longDescription}</div>
          <aside className="lg:col-span-3">
            <QuestionListingQuestionCount
              count={75}
              totalCount={75}
              variant="free"
            />
          </aside>
        </div>
      ) : (
        longDescription
      )}
    </div>
  );
}
