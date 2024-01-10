import clsx from 'clsx';
import { useId } from 'react';
import { RiFireLine } from 'react-icons/ri';
import { useIntl } from 'react-intl';

import type { BlogLevel } from '~/components/blog/BlogTypes';
import type { TextSize } from '~/components/ui/Text';
import Text from '~/components/ui/Text';
import { themeIconColor } from '~/components/ui/theme';
import Tooltip from '~/components/ui/Tooltip';

type Props = Readonly<{
  showIcon?: boolean;
  size?: TextSize;
  value: BlogLevel;
}>;

const DifficultyLabelClasses: Record<BlogLevel, string> = {
  advanced: 'dark:text-warning-light text-warning',
  intermediate: 'dark:text-info-light text-info',
  nightmare: 'dark:text-danger-light text-danger',
  starter: 'dark:text-success-light text-success',
};

export default function BlogLevelLabel({
  showIcon = false,
  value,
  size = 'body3',
}: Props) {
  const intl = useIntl();
  const id = useId();
  const labels: Record<BlogLevel, string> = {
    advanced: intl.formatMessage({
      defaultMessage: 'Advanced',
      description: 'Advanced level blog',
      id: 'PMvcx6',
    }),
    intermediate: intl.formatMessage({
      defaultMessage: 'Intermediate',
      description: 'Intermediate level blog',
      id: '0WJfoT',
    }),
    nightmare: intl.formatMessage({
      defaultMessage: 'Nightmare',
      description: 'Nightmare level blog',
      id: 'ZMFRjh',
    }),
    starter: intl.formatMessage({
      defaultMessage: 'Starter',
      description: 'Starter level blog',
      id: 'NEkaZ4',
    }),
  };
  const label = intl.formatMessage({
    defaultMessage: 'Level',
    description: 'Blog level label',
    id: 'bONB6m',
  });

  return (
    <Tooltip label={label} position="above">
      <span className="sr-only" id={id}>
        {label}
      </span>
      <div aria-labelledby={id} className="flex items-center gap-x-1.5">
        {showIcon && (
          <RiFireLine
            aria-hidden="true"
            className={clsx('h-5 w-5 flex-shrink-0', themeIconColor)}
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