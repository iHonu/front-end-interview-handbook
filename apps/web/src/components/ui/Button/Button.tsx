import clsx from 'clsx';
import type { HTMLAttributeAnchorTarget, ReactNode } from 'react';

import Anchor from '../Anchor';
import Spinner from '../Spinner';
import type { TooltipPosition } from '../Tooltip';
import Tooltip from '../Tooltip';
import type { TooltipAlignment } from '../Tooltip/Tooltip';

export type ButtonDisplay = 'block' | 'inline';
export type ButtonSize = 'lg' | 'md' | 'sm' | 'xs';
export type ButtonVariant =
  | 'danger'
  | 'primary'
  | 'secondary'
  | 'success'
  | 'tertiary';

type Props = Readonly<{
  addonPosition?: 'end' | 'start';
  'aria-controls'?: string;
  className?: string;
  display?: ButtonDisplay;
  href?: string;
  icon?: (props: React.ComponentProps<'svg'>) => JSX.Element;
  isDisabled?: boolean;
  isLabelHidden?: boolean;
  isLoading?: boolean;
  label: string;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  size?: ButtonSize;
  target?: HTMLAttributeAnchorTarget;
  tooltip?: ReactNode;
  tooltipAlignment?: TooltipAlignment;
  tooltipPosition?: TooltipPosition;
  type?: 'button' | 'submit';
  variant: ButtonVariant;
}>;

const horizontalPaddingClasses: Record<ButtonSize, string> = {
  lg: 'px-5',
  md: 'px-4',
  sm: 'px-3',
  xs: 'px-2',
};

const heightClasses: Record<ButtonSize, string> = {
  lg: 'h-10',
  md: 'h-9',
  sm: 'h-8',
  xs: 'h-7',
};

const widthClasses: Record<ButtonSize, string> = {
  lg: 'w-10',
  md: 'w-9',
  sm: 'w-8',
  xs: 'w-7',
};

const fontSizeClasses: Record<ButtonSize, string> = {
  lg: 'text-base',
  md: 'text-sm',
  sm: 'text-xs',
  xs: 'text-xs',
};

const borderRadiusClasses: Record<ButtonSize, string> = {
  lg: 'rounded-full',
  md: 'rounded-full',
  sm: 'rounded-full',
  xs: 'rounded-full',
};

const spacingClasses: Record<ButtonSize, string> = {
  lg: 'gap-x-2',
  md: 'gap-x-1',
  sm: 'gap-x-1',
  xs: 'gap-x-1',
};

const sizeIconClasses: Record<ButtonSize, string> = {
  lg: '!h-4 !w-4',
  md: '!h-4 !w-4',
  sm: '!h-4 !w-4',
  xs: '!h-4 !w-4',
};

const variantClasses: Record<ButtonVariant, string> = {
  danger: clsx(
    'border-transparent',
    'text-white dark:text-neutral-950',
    'bg-danger',
    'hover:bg-danger-dark dark:hover:bg-danger-light',
    'active:bg-danger-darker dark:active:bg-danger-lighter',
    'focus-visible:outline-danger',
  ),
  primary: clsx(
    'border-transparent',
    'text-white dark:text-neutral-950',
    'bg-brand-dark dark:bg-brand',
    'hover:bg-brand-darker dark:hover:bg-brand-light',
    'active:bg-brand-darkest dark:active:bg-brand-lighter',
    'focus-visible:outline-brand',
  ),
  secondary: clsx(
    'border-neutral-300 dark:border-neutral-800',
    'text-neutral-600 dark:text-neutral-200',
    'bg-white dark:bg-neutral-950',
    'hover:bg-neutral-100 dark:hover:bg-neutral-900',
    'active:bg-neutral-200 dark:active:bg-neutral-800',
    'focus-visible:outline-neutral-500',
  ),
  success: clsx(
    'border-transparent',
    'text-white dark:text-neutral-950',
    'bg-success',
    'hover:bg-success-dark dark:hover:bg-success-light',
    'active:bg-success-darker dark:active:bg-success-lighter',
    'focus-visible:outline-success',
  ),
  tertiary: clsx(
    'border-transparent',
    'text-neutral-600 dark:text-neutral-200',
    'bg-transparent',
    'hover:bg-neutral-100 dark:hover:bg-neutral-900',
    'active:bg-neutral-200 dark:active:bg-neutral-800',
    'focus-visible:outline-neutral-500',
  ),
};

const variantDisabledClasses: Record<ButtonVariant, string> = {
  danger: clsx(
    'disabled:border-transparent',
    'disabled:text-white dark:disabled:text-neutral-700',
    'disabled:bg-neutral-300 dark:disabled:bg-neutral-900',
  ),
  primary: clsx(
    'disabled:border-transparent',
    'disabled:text-white dark:disabled:text-neutral-700',
    'disabled:bg-brand-lighter dark:disabled:bg-neutral-900',
  ),
  secondary: clsx(
    'disabled:border-neutral-200 dark:disabled:border-neutral-800',
    'disabled:text-neutral-400 dark:disabled:text-neutral-800',
    'disabled:bg-transparent',
  ),
  success: clsx(
    'disabled:border-transparent',
    'disabled:text-white dark:disabled:text-neutral-700',
    'disabled:bg-neutral-300 dark:disabled:bg-neutral-900',
  ),
  tertiary: clsx(
    'disabled:border-transparent',
    'disabled:text-neutral-300 dark:disabled:text-neutral-700',
  ),
};

export default function Button({
  addonPosition = 'end',
  'aria-controls': ariaControls,
  className,
  display = 'inline',
  href,
  icon: Icon,
  isDisabled = false,
  isLabelHidden = false,
  isLoading = false,
  label,
  size = 'sm',
  target,
  tooltip,
  tooltipAlignment,
  tooltipPosition,
  type = 'button',
  variant,
  onClick,
}: Props) {
  const addOnClass = sizeIconClasses[size];

  const addOn = isLoading ? (
    <Spinner className={addOnClass} color="inherit" size="xs" />
  ) : Icon != null ? (
    <Icon aria-hidden="true" className={addOnClass} />
  ) : null;

  const children = (
    <>
      {addonPosition === 'start' && addOn}
      {!isLabelHidden && <div>{label}</div>}
      {addonPosition === 'end' && addOn}
    </>
  );

  const commonProps = {
    'aria-controls': ariaControls ?? undefined,
    'aria-label': isLabelHidden ? label : undefined,
    children,
    className: clsx(
      display === 'block' ? 'flex w-full' : 'inline-flex',
      'whitespace-nowrap items-center justify-center border font-medium',
      'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 transition-colors',
      variantClasses[variant],
      variantDisabledClasses[variant],
      isDisabled && 'pointer-events-none',
      heightClasses[size],
      isLabelHidden ? widthClasses[size] : horizontalPaddingClasses[size],
      fontSizeClasses[size],
      borderRadiusClasses[size],
      spacingClasses[size],
      className,
    ),
    disabled: isDisabled,
    onClick,
  };

  const el =
    href == null ? (
      <button type={type === 'button' ? 'button' : 'submit'} {...commonProps} />
    ) : (
      <Anchor href={href} {...commonProps} target={target} variant="unstyled" />
    );

  return tooltip == null ? (
    el
  ) : (
    <Tooltip
      alignment={tooltipAlignment}
      label={tooltip}
      position={tooltipPosition}>
      {el}
    </Tooltip>
  );
}
