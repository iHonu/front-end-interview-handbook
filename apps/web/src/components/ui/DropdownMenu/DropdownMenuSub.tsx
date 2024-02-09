import clsx from 'clsx';
import React from 'react';

import type { Props as DropdownMenuItemProps } from './DropdownMenuItem';
import DropdownMenuItemContent from './DropdownMenuItemContent';
import {
  dropdownContentClassName,
  dropdownContentItemClassName,
} from './dropdownStyles';
import type { TextColor } from '../Text';

import {
  Portal,
  Sub,
  SubContent,
  SubTrigger,
} from '@radix-ui/react-dropdown-menu';

type ChildItem = React.ReactElement<DropdownMenuItemProps>;

export type Props = Readonly<{
  children: ChildItem | ReadonlyArray<ChildItem>;
  color?: TextColor;
  forceDark?: boolean;
  icon?: (props: React.ComponentProps<'svg'>) => JSX.Element;
  isDisabled?: boolean;
  isSelected?: boolean;
  label: string;
  onClick?: React.MouseEventHandler<HTMLElement>;
}>;

export default function DropdownMenuSub({
  color = 'secondary',
  children,
  forceDark = false,
  icon: Icon,
  isSelected = false,
  label,
  onClick,
}: Props) {
  return (
    <Sub>
      <SubTrigger
        className={clsx(dropdownContentItemClassName)}
        onClick={onClick}>
        <DropdownMenuItemContent
          color={color}
          icon={Icon}
          isSelected={isSelected}
          label={label}
          usage="trigger"
        />
      </SubTrigger>
      <Portal>
        <SubContent
          className={dropdownContentClassName}
          data-mode={forceDark ? 'dark' : undefined}>
          {children}
        </SubContent>
      </Portal>
    </Sub>
  );
}
