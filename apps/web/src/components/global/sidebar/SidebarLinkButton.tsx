import clsx from 'clsx';
import { useState } from 'react';
import { RiArrowRightSLine } from 'react-icons/ri';

import Anchor from '~/components/ui/Anchor';
import NavbarPopover from '~/components/ui/Navbar/NavbarPopover';
import NavbarPopoverTabs from '~/components/ui/Navbar/NavbarPopoverTabs';
import type { NavbarPrimaryItem } from '~/components/ui/Navbar/NavTypes';
import Text from '~/components/ui/Text';
import {
  themeBackgroundElementEmphasizedStateColor,
  themeBackgroundElementPressedStateColor_Active,
  themeOutlineElement_FocusVisible,
  themeOutlineElementBrandColor_FocusVisible,
  themeTextBrandColor,
  themeTextBrandColor_Hover,
  themeTextSecondaryColor,
} from '~/components/ui/theme';
import Tooltip from '~/components/ui/Tooltip';

import { useI18nPathname } from '~/next-i18nostic/src';

import { Content, Portal, Root, Trigger } from '@radix-ui/react-popover';

type Props = NavbarPrimaryItem &
  Readonly<{
    isLabelHidden?: boolean;
  }>;

export default function SidebarLinkButton({
  currentMatchRegex,
  isLabelHidden = false,
  label,
  icon: Icon,
  onClick,
  ...props
}: Props) {
  const [open, setOpen] = useState(false);
  const { pathname } = useI18nPathname();
  const activeClassName = clsx(
    themeTextBrandColor,
    themeBackgroundElementEmphasizedStateColor,
  );
  const defaultClassName = clsx(
    themeTextSecondaryColor,
    themeTextBrandColor_Hover,
  );

  const isSelected = pathname != null && currentMatchRegex?.test(pathname);
  const commonClass = clsx(
    'flex shrink-0 items-center gap-2',
    'w-full p-3',
    'rounded',
    themeTextBrandColor_Hover,
    [
      themeOutlineElement_FocusVisible,
      themeOutlineElementBrandColor_FocusVisible,
    ],
    themeBackgroundElementPressedStateColor_Active,
    'transition-colors',
  );

  const iconElement =
    Icon != null ? <Icon className="size-5 shrink-0" /> : null;
  const labelElement = !isLabelHidden && (
    <Text
      className="grow text-start"
      color="inherit"
      size="body2"
      weight={isSelected ? 'bold' : 'medium'}>
      {label}
    </Text>
  );

  if (props.type === 'link') {
    const isLinkSelected = pathname === props.href || isSelected;

    const link = (
      <Anchor
        aria-current={isLinkSelected ? 'page' : undefined}
        aria-label={isLabelHidden ? label : undefined}
        className={clsx(
          commonClass,
          isLinkSelected ? activeClassName : defaultClassName,
        )}
        href={props.href}
        scrollToTop={props.scrollToTop}
        variant="unstyled"
        onClick={onClick}>
        {iconElement}
        {labelElement}
      </Anchor>
    );

    return isLabelHidden ? (
      <Tooltip asChild={true} label={label} side="right">
        {link}
      </Tooltip>
    ) : (
      link
    );
  }

  const trigger = (
    <Trigger
      aria-label={isLabelHidden ? label : undefined}
      className={clsx(
        commonClass,
        isSelected || open ? activeClassName : defaultClassName,
      )}>
      {iconElement}
      {labelElement}
      {!isLabelHidden && (
        <RiArrowRightSLine aria-hidden="true" className="size-4 shrink-0" />
      )}
    </Trigger>
  );

  return (
    <Root>
      {isLabelHidden ? (
        <Tooltip asChild={true} label={label} side="right">
          {trigger}
        </Tooltip>
      ) : (
        trigger
      )}
      <Portal>
        <Content
          align={props.align}
          className={clsx(
            'z-popover',
            'rounded-lg',
            'shadow-lg',
            // TODO: Increase max-width as number of items increase.
            'w-screen max-w-5xl',
          )}
          side="right"
          sideOffset={8}>
          {(() => {
            switch (props.type) {
              case 'popover':
                return (
                  <NavbarPopover
                    items={props.items}
                    onClose={() => {
                      setOpen(false);
                    }}
                  />
                );
              case 'popover-tabs':
                return (
                  <NavbarPopoverTabs
                    items={props.items}
                    onClose={() => {
                      setOpen(false);
                    }}
                  />
                );
            }
          })()}
        </Content>
      </Portal>
    </Root>
  );
}
