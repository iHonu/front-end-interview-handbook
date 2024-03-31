import clsx from 'clsx';
import { RiCheckboxCircleLine, RiCheckLine } from 'react-icons/ri';
import { useIntl } from 'react-intl';

import Badge from '~/components/ui/Badge';
import Chip from '~/components/ui/Chip';
import { themeTextSuccessColor } from '~/components/ui/theme';
import Tooltip from '~/components/ui/Tooltip';

import type {
  ProjectsStatusBadgeType,
  ProjectsStatusBadgeVariant,
} from './types';

type Props = Readonly<{
  entity: ProjectsStatusBadgeType;
  variant?: ProjectsStatusBadgeVariant;
}>;

const Icon = RiCheckboxCircleLine;

export default function ProjectsStatusBadgeCompleted({
  entity,
  variant = 'badge',
}: Props) {
  const intl = useIntl();

  const tooltip = (() => {
    switch (entity) {
      case 'challenge':
        return intl.formatMessage({
          defaultMessage: 'You have completed this challenge',
          description: 'Description for projects completed status',
          id: '9FjmkH',
        });
      case 'track':
        return intl.formatMessage({
          defaultMessage: 'You have completed this track',
          description: 'Description for projects track completed status',
          id: 'wnW+2J',
        });
      case 'skill':
        return intl.formatMessage({
          defaultMessage: 'You have completed this skill',
          description: 'Description for projects skill completed status',
          id: '8TZX1E',
        });
    }
  })();

  const label = intl.formatMessage({
    defaultMessage: 'Completed',
    description: 'Project completed label',
    id: 'YY7lXv',
  });

  return (
    <Tooltip label={tooltip}>
      {variant === 'badge' && (
        <Badge icon={RiCheckLine} label={label} size="sm" variant="success" />
      )}
      {variant === 'icon' && (
        <Icon
          aria-label={label}
          className={clsx('size-5 shrink-0', themeTextSuccessColor)}
        />
      )}
      {variant === 'chip' && (
        <Chip
          icon={Icon}
          isLabelHidden={true}
          label={label}
          size="sm"
          variant="success"
        />
      )}
    </Tooltip>
  );
}