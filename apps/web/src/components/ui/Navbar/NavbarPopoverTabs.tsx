import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { useMediaQuery } from 'usehooks-ts';

import { popoverContentClassName } from '~/components/ui/Popover/popoverStyles';
import {
  themeBackgroundCardColor,
  themeBorderColor,
  themeOutlineElement_FocusVisible,
} from '~/components/ui/theme';

import NavbarPopoverLink from './NavbarPopoverLink';
import type { NavPopoverListItem } from './NavTypes';
import { textVariants } from '../Text';
import { themeTextColor_Hover } from '../theme';

import * as TabsPrimitive from '@radix-ui/react-tabs';

export default function NavbarPopoverTabs({
  items,
  onClose,
}: Readonly<{
  items: ReadonlyArray<NavPopoverListItem>;
  onClose: (event?: React.MouseEvent<HTMLElement>) => void;
}>) {
  const [value, setValue] = useState(items[0].itemKey);
  const laptopAndAbove = useMediaQuery('(min-width: 1024px)');

  useEffect(() => {
    // Automatically close when popover is still open and
    // screen has been resized to be below laptop.
    if (!laptopAndAbove) {
      onClose();
    }
  }, [onClose, laptopAndAbove]);

  return (
    <div className={clsx('flex gap-4', popoverContentClassName, '!p-0')}>
      <TabsPrimitive.Root
        className="flex w-full gap-4"
        orientation="vertical"
        value={value}
        onValueChange={setValue}>
        <TabsPrimitive.List
          className={clsx(
            'w-56',
            'flex shrink-0 flex-col gap-y-2',
            'px-1 py-4',
            themeBackgroundCardColor,
            ['border-r', themeBorderColor],
          )}>
          {items.map(({ itemKey, label }) => (
            <TabsPrimitive.Trigger
              key={itemKey}
              className={clsx(
                'block w-full',
                'rounded-md',
                'px-3 py-2',
                'text-left text-sm font-medium',
                'outline-none',
                themeOutlineElement_FocusVisible,
                themeTextColor_Hover,
                'text-pretty',
                textVariants({
                  color: value === itemKey ? 'default' : 'secondary',
                  size: 'body2',
                  weight: 'medium',
                }),
              )}
              value={itemKey}
              onMouseEnter={() => {
                setValue(itemKey);
              }}>
              {label}
            </TabsPrimitive.Trigger>
          ))}
        </TabsPrimitive.List>
        <div className="flex w-full grow items-center py-4 pe-4">
          {items.map((item) => (
            <TabsPrimitive.Content
              key={item.itemKey}
              className={clsx(
                'outline-none',
                value === item.itemKey && 'size-full flex flex-col gap-y-2',
              )}
              value={item.itemKey}>
              {item.items.map((childItem) => (
                <NavbarPopoverLink
                  key={childItem.itemKey}
                  {...childItem}
                  onClick={(event) => {
                    // To close the popover.
                    onClose(event);
                    item.onClick?.(event);
                  }}
                />
              ))}
            </TabsPrimitive.Content>
          ))}
        </div>
      </TabsPrimitive.Root>
    </div>
  );
}
