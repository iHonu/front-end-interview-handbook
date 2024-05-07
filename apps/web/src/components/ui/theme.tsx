import clsx from 'clsx';

// Text colors.
export const themeTextBrandColor = clsx('text-brand-dark dark:text-brand');
export const themeTextBrandColor_Hover = clsx(
  'hover:text-brand-dark dark:hover:text-brand',
);
export const themeTextBrandColor_GroupHover = clsx(
  'group-hover:text-brand-dark dark:group-hover:text-brand',
);
export const themeTextColor = clsx('text-neutral-900 dark:text-neutral-100');
export const themeTextSubtitleColor = clsx(
  'text-neutral-700 dark:text-neutral-300',
);
export const themeTextSecondaryColor = clsx(
  'text-neutral-600 dark:text-neutral-400',
);
export const themeTextSubtleColor = clsx(
  'text-neutral-500 dark:text-neutral-500',
);
export const themeTextFaintColor = clsx(
  'text-neutral-400 dark:text-neutral-600',
);
export const themeTextFainterColor = clsx(
  'text-neutral-300 dark:text-neutral-700',
);
export const themeTextSecondaryInvertColor = clsx(
  'text-neutral-400 dark:text-neutral-600',
);
export const themeTextInvertColor = clsx(
  'text-neutral-100 dark:text-neutral-900',
);
export const themeTextDarkColor = clsx('text-neutral-900');
export const themeTextLightColor = clsx('text-neutral-100');

// Text colors -- semantic.
export const themeTextSuccessColor = clsx(
  'text-success dark:text-success-light',
);
export const themeTextWarningColor = clsx(
  'text-warning dark:text-warning-light',
);
export const themeTextDangerColor = clsx('text-danger');
export const themeTextPlaceholderColor = themeTextFaintColor;
export const themeTextDisabledColor = themeTextFainterColor;
export const themeTextLabelColor = clsx(
  'text-neutral-700 dark:text-neutral-300',
);

export const themeIconColor = clsx('text-neutral-400 dark:text-neutral-500');

// Background colors.
export const themeBackgroundBrandColor = clsx('bg-brand-dark dark:bg-brand');
export const themeBackgroundColor = clsx('bg-white dark:bg-neutral-900');
export const themeBackgroundInvertColor = clsx('bg-neutral-950 dark:bg-white');
export const themeBackgroundLayerColor = clsx('bg-white dark:bg-neutral-900');

export const themeBackgroundEmphasized = clsx(
  'bg-neutral-50 dark:bg-neutral-900',
);
export const themeBackgroundEmphasized_Hover = clsx(
  'hover:bg-neutral-50 dark:hover:bg-neutral-900',
);
export const themeBackgroundLayerEmphasized = clsx(
  'bg-neutral-50 dark:bg-neutral-800',
);
export const themeBackgroundLayerEmphasized_Hover = clsx(
  'hover:bg-neutral-50 dark:hover:bg-neutral-800',
);
export const themeBackgroundCardColor = clsx(
  'bg-neutral-50 dark:bg-neutral-800/40',
);
export const themeBackgroundCardAltColor = clsx(
  'bg-neutral-50 dark:bg-neutral-800/70',
);
export const themeBackgroundCardWhiteOnLightColor = clsx(
  'bg-white dark:bg-neutral-800/40',
);
export const themeBackgroundChipColor = clsx(
  'bg-neutral-200 dark:bg-neutral-800',
);
export const themeBackgroundGlimmerColor = clsx(
  'bg-neutral-600 dark:bg-neutral-400',
);

export const themeBackgroundLineColor = clsx(
  'bg-neutral-200 dark:bg-neutral-800',
);
export const themeBackgroundLineEmphasizedColor = clsx(
  'bg-neutral-300 dark:bg-neutral-700',
);

export const themeBackgroundElementColor = clsx('bg-white dark:bg-neutral-900');
export const themeBackgroundElementEmphasizedStateColor = clsx(
  'bg-neutral-100 dark:bg-neutral-800/70',
);
export const themeBackgroundElementEmphasizedStateColor_Hover = clsx(
  'hover:bg-neutral-100 dark:hover:bg-neutral-800/70',
);
export const themeBackgroundElementEmphasizedStateColor_Focus = clsx(
  'focus:bg-neutral-100 dark:focus:bg-neutral-800/70',
);
export const themeBackgroundElementPressedStateColor_Active = clsx(
  'active:bg-neutral-200 dark:active:bg-neutral-700',
);

// Fills
export const themeFillBrandColor = clsx('fill-brand-dark dark:fill-brand');

// Lines.
export const themeBorderColor = clsx(
  'border-neutral-200 dark:border-neutral-800',
);
export const themeDivideColor = clsx(
  'divide-neutral-200 dark:divide-neutral-800',
);
export const themeBorderEmphasizeColor = clsx(
  'border-neutral-300 dark:border-neutral-700',
);
export const themeBorderSecondaryColor = clsx(
  'border-neutral-400 dark:border-neutral-600',
);
export const themeBorderSubtleColor = clsx(
  'border-neutral-500 dark:border-neutral-500',
);
export const themeDivideEmphasizeColor = clsx(
  'divide-neutral-300 dark:divide-neutral-700',
);
export const themeBorderElementColor = themeBorderEmphasizeColor;
export const themeGlassyBorder = clsx(
  'glassbox border border-neutral-200 dark:border-transparent',
);
export const themeBorderBrandColor = clsx(
  'border-brand-dark dark:border-brand',
);
export const themeBorderBrandColor_Hover = clsx(
  'hover:border-brand-dark dark:hover:border-brand',
);
export const themeBorderBrandColor_GroupHover = clsx(
  'group-hover:border-brand-dark dark:group-hover:border-brand',
);

export const themeOutlineElement_FocusVisible = clsx(
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2',
);
export const themeOutlineElementBrandColor_FocusVisible = clsx(
  'focus-visible:outline-brand-dark dark:focus-visible:outline-brand',
);

export type ThemeGradient<
  StartColor extends string = string,
  EndColor extends string = string,
> = {
  className: `bg-[linear-gradient(133.77deg,_${StartColor}_0%,_${EndColor}_97.95%)]`;
  endColor: EndColor;
  startColor: StartColor;
};

// Gradient colors.
export const themeGradientPurpleGreen: ThemeGradient<'#6366F1', '#10B981'> = {
  className: 'bg-[linear-gradient(133.77deg,_#6366F1_0%,_#10B981_97.95%)]',
  endColor: '#10B981',
  startColor: '#6366F1',
};
export const themeGradientPurple: ThemeGradient<'#6366F1', '#818CF8'> = {
  className: 'bg-[linear-gradient(133.77deg,_#6366F1_0%,_#818CF8_97.95%)]',
  endColor: '#818CF8',
  startColor: '#6366F1',
};

export const themeGradientGreenYellow: ThemeGradient<'#1C9F5E', '#F1C000'> = {
  className: 'bg-[linear-gradient(133.77deg,_#1C9F5E_0%,_#F1C000_97.95%)]',
  endColor: '#F1C000',
  startColor: '#1C9F5E',
};

export const themeGradientYellowGreen: ThemeGradient<'#F1C000', '#1C9F5E'> = {
  className: 'bg-[linear-gradient(133.77deg,_#F1C000_0%,_#1C9F5E_97.95%)]',
  endColor: '#1C9F5E',
  startColor: '#F1C000',
};

export const themeGradientPinkPurple: ThemeGradient<'#EC4899', '#818CF8'> = {
  className: 'bg-[linear-gradient(133.77deg,_#EC4899_0%,_#818CF8_97.95%)]',
  endColor: '#818CF8',
  startColor: '#EC4899',
};

export const themeRadialGlowBackground = clsx(
  'relative before:rounded-[inherit] before:opacity-50 before:-z-10 before:top-0 before:left-0 before:right-0 before:absolute before:bg-top before:bg-cover before:w-full before:h-[500px]',
  'before:bg-[radial-gradient(78.57%_78.57%_at_50.65%_0.84%,_var(--brand-gradient-radial-light)_0%,_var(--brand-gradient-radial-dark)_0%,_rgba(15,_23,_42,_0.0001)_100%)]',
);
