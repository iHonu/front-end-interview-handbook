import clsx from 'clsx';
import type { ReactNode } from 'react';

import MarketingSectionTitleLabel from '~/components/marketing/MarketingSectionTitleLabel';
import Heading from '~/components/ui/Heading';
import Text from '~/components/ui/Text';

type Props = Readonly<{
  description?: ReactNode;
  mode?: 'dark' | 'light';
  sectionLabel?: ReactNode;
  size?: 'lg' | 'md' | 'xl';
  title?: string;
}>;

export default function TextPairing({
  description,
  sectionLabel,
  size = 'md',
  title,
  mode = 'light',
}: Props) {
  return (
    <div className="grid gap-y-2 lg:gap-y-3">
      {sectionLabel && (
        <MarketingSectionTitleLabel>{sectionLabel}</MarketingSectionTitleLabel>
      )}
      <Heading
        className={clsx(
          'font-bold tracking-tight text-slate-900',
          mode === 'light' && 'text-slate-900',
          mode === 'dark' && 'text-white',
          size === 'md' && 'text-xl md:text-2xl',
          size === 'lg' && 'text-2xl md:text-3xl',
          size === 'xl' && 'text-3xl md:text-4xl',
        )}>
        {title}
      </Heading>
      {description && (
        <Text
          className={clsx(
            'max-w-xl',
            (size === 'md' || size === 'lg') && 'text-sm leading-6',
            mode === 'light' && 'text-slate-700',
            mode === 'dark' && 'text-slate-300',
          )}
          color="inherit"
          display="block">
          {description}
        </Text>
      )}
    </div>
  );
}
