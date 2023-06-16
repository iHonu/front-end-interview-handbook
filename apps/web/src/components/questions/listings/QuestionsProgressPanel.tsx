import { useIntl } from 'react-intl';

import Text from '~/components/ui/Text';

import QuestionsProgressBar from '../common/QuestionsProgressBar';
import QuestionsProgressFraction from '../common/QuestionsProgressFraction';

type Props = Readonly<{
  completedQuestions: number;
  icon: (props: React.ComponentProps<'svg'>) => JSX.Element;
  progressBarClassName: string;
  title: string;
  totalQuestions: number;
  variant: 'compact' | 'default';
}>;

export default function QuestionsProgressPanel({
  title,
  icon: Icon,
  completedQuestions,
  progressBarClassName,
  variant,
  totalQuestions,
}: Props) {
const intl = useIntl();

  const titleLabel = (
    <Text size="body2" weight="medium">
      {title}
    </Text>
  );

  const progressBar = (
    <QuestionsProgressBar
      className={progressBarClassName}
      completed={completedQuestions}
      total={totalQuestions}
    />
  );

  const percentageLabel = (
    <Text size="body2" weight="bold">
      {intl.formatNumber(completedQuestions / totalQuestions, {
        maximumFractionDigits: 0,
        style: 'percent',
      })}
    </Text>
  );

  const completedQuestionSummary = (
    <QuestionsProgressFraction
      completed={completedQuestions}
      total={totalQuestions}
    />
  );

  if (variant === 'compact') {
    return (
      <div className="flex items-end gap-3">
        <div className="grid flex-1">
          <div className="flex justify-between">
            {titleLabel}
            {completedQuestionSummary}
          </div>
          <div className="grid gap-1 py-1.5">{progressBar}</div>
        </div>
        {percentageLabel}
      </div>
    );
  }

  return (
    <div className="grid gap-3">
      {titleLabel}
      <div className="grid gap-1">
        <div className="flex items-center gap-3">
          {progressBar}
          {percentageLabel}
        </div>
        {completedQuestionSummary}
      </div>
    </div>
  );
}
