import clsx from 'clsx';
import React from 'react';

type ContainerWidth =
  | '2xl'
  | '3xl'
  | '4xl'
  | '5xl'
  | '6xl'
  | '7xl'
  | 'lg'
  | 'marketing'
  | 'md'
  | 'screen-2xl'
  | 'screen-xl'
  | 'xl';
type Props = Readonly<{
  children: React.ReactNode;
  className?: string;
  width?: ContainerWidth;
}>;

const widthStyles: Record<ContainerWidth, string> = {
  '2xl': 'max-w-2xl',
  '3xl': 'max-w-3xl',
  '4xl': 'max-w-4xl',
  '5xl': 'max-w-5xl',
  '6xl': 'max-w-6xl',
  '7xl': 'max-w-7xl',
  lg: 'max-w-lg',
  marketing: 'lg:max-w-[928px] xl:max-w-[1104px]',
  md: 'max-w-md',
  'screen-2xl': 'max-w-screen-2xl',
  'screen-xl': 'max-w-screen-xl',
  xl: 'max-w-xl',
};

export default function Container({
  children,
  className,
  width = '6xl',
}: Props) {
  return (
    <div
      className={clsx(
        'mx-auto w-full',
        'max-xl:px-6',
        widthStyles[width],
        className,
      )}>
      {children}
    </div>
  );
}
