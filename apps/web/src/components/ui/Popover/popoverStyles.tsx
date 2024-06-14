import clsx from 'clsx';

import { themeBackgroundColor, themeBorderElementColor } from '../theme';

export const popoverContentClassName = clsx(
  'p-4',
  'rounded-lg',
  'shadow-lg',
  themeBackgroundColor,
  ['border', themeBorderElementColor],
  'text-sm',
  'z-popover',
);