import clsx from 'clsx';

import {
  themeBackgroundColor,
  themeBackgroundElementEmphasizedStateColor_Focus,
  themeBackgroundElementEmphasizedStateColor_Hover,
  themeBorderElementColor,
} from '../theme';

export const dropdownContentClassName = clsx(
  'flex flex-col gap-1',
  'p-3',
  'min-w-52',
  'rounded-lg',
  'shadow-lg',
  themeBackgroundColor,
  ['border', themeBorderElementColor],
  'z-30',
);

export const dropdownContentItemClassName = clsx(
  'flex grow px-3 py-2',
  'w-full text-left',
  'rounded',
  'select-none outline-none',
  themeBackgroundElementEmphasizedStateColor_Hover,
  themeBackgroundElementEmphasizedStateColor_Focus,
);