import clsx from 'clsx';
import { useId } from 'react';
import { RiFireLine } from 'react-icons/ri';
import { FormattedMessage, useIntl } from 'react-intl';

import type { QuestionDifficulty } from '~/components/questions/common/QuestionsTypes';
import type { TextSize } from '~/components/ui/Text';
import Text from '~/components/ui/Text';
import Tooltip from '~/components/ui/Tooltip';

type Props = Readonly<{
  showIcon?: boolean;
  size?: TextSize;
  value: QuestionDifficulty;
}>;

const DifficultyLabelClasses: Record<QuestionDifficulty, string> = {
  easy: 'text-green',
  hard: 'text-red',
  medium: 'text-yellow-500',
};

export default function QuestionDifficultyLabel({
  showIcon = false,
  value,
  size = 'body3',
}: Props) {
  const intl = useIntl();
  const id = useId();
  const labels: Record<QuestionDifficulty, string> = {
    easy: intl.formatMessage({
      defaultMessage: 'Easy',
      description: 'Easy question difficulty',
      id: 'ldOgfx',
    }),
    hard: intl.formatMessage({
      defaultMessage: 'Hard',
      description: 'Hard question difficulty',
      id: 'zw0Ov8',
    }),
    medium: intl.formatMessage({
      defaultMessage: 'Medium',
      description: 'Medium question difficulty',
      id: 'gtouN7',
    }),
  };

  return (
    <Tooltip
      label={intl.formatMessage({
        defaultMessage: 'Difficulty',
        description: 'Question difficulty label',
        id: 'NgxUnY',
      })}
      position="above">
      <span className="sr-only" id={id}>
        <FormattedMessage
          defaultMessage="Difficulty"
          description="Question difficulty label"
          id="NgxUnY"
        />
      </span>
      <div aria-labelledby={id} className="flex items-center">
        {showIcon && (
          <RiFireLine
            aria-hidden="true"
            className="mr-1.5 h-5 w-5 flex-shrink-0 text-neutral-400"
          />
        )}
        <Text
          className={clsx(DifficultyLabelClasses[value])}
          color="inherit"
          size={size}>
          {labels[value]}
        </Text>
      </div>
    </Tooltip>
  );
}
