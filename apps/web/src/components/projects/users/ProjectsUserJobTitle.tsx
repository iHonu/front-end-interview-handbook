import clsx from 'clsx';
import { RiBuildingLine } from 'react-icons/ri';

import Text from '~/components/ui/Text';
import { themeTextSecondaryColor } from '~/components/ui/theme';

type Size = '2xs' | 'sm';

type Props = Readonly<{ jobTitle: string; size?: Size }>;

const textClasses: Record<Size, string> = {
  '2xs': 'text-2xs',
  sm: 'text-sm',
};

export default function ProjectsUserJobTitle({ jobTitle, size = 'sm' }: Props) {
  return (
    <div className={clsx('flex items-center gap-1', themeTextSecondaryColor)}>
      <RiBuildingLine className="h-4 w-4" />
      <Text className={textClasses[size]} color="inherit" size="custom">
        {jobTitle}
      </Text>
    </div>
  );
}
