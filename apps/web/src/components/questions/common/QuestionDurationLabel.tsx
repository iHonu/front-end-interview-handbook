import { useId } from 'react';
import { RiTimeLine } from 'react-icons/ri';
import { FormattedMessage, useIntl } from 'react-intl';

import type { TextSize } from '~/components/ui/Text';
import Text from '~/components/ui/Text';
import Tooltip from '~/components/ui/Tooltip';
type Props = Readonly<{
  mins: number;
  showIcon?: boolean;
  size?: TextSize;
}>;

export default function QuestionDurationLabel({
  showIcon = false,
  mins,
  size = 'body3',
}: Props) {
  const id = useId();
  const intl = useIntl();

  return (
    <Tooltip
      label={intl.formatMessage({
        defaultMessage: 'Recommended Duration',
        description:
          'Recommended duration tooltip displayed on question cards found on question lists',
        id: 'BtCbN4',
      })}
      position="above">
      <span className="sr-only" id={id}>
        <FormattedMessage
          defaultMessage="Recommended Duration"
          description="Recommended duration tooltip displayed on question cards found on question lists"
          id="BtCbN4"
        />
      </span>
      <div aria-labelledby={id} className="flex items-center">
        {showIcon && (
          <RiTimeLine
            aria-hidden="true"
            className="mr-1.5 h-5 w-5 flex-shrink-0 text-neutral-400"
          />
        )}
        <Text className="whitespace-nowrap" color="secondary" size={size}>
          <FormattedMessage
            defaultMessage="{duration} mins"
            description="Actual value for recommended duration that the user should take to complete a question, displayed on question cards found on question lists"
            id="PfOyMR"
            values={{
              duration: mins,
            }}
          />
        </Text>
      </div>
    </Tooltip>
  );
}
