'use client';

import { useEffect, useState } from 'react';
import { RiListUnordered, RiMenu2Line } from 'react-icons/ri';
import { useIntl } from 'react-intl';

import Container from '~/components/ui/Container';
import SlideOut from '~/components/ui/SlideOut';

import { useI18nPathname } from '~/next-i18nostic/src';

import type { GuideNavigation } from './GuidesLayoutSidebar';
import { GuidesSidebar } from './GuidesSidebar';
import type { TableOfContents } from './GuidesTableOfContents';
import GuidesTableOfContents from './GuidesTableOfContents';
import Button from '../ui/Button';

export default function GuidesNavbar({
  navigation,
  tableOfContents,
}: Readonly<{
  navigation: GuideNavigation;
  tableOfContents: TableOfContents | undefined;
}>) {
  const intl = useIntl();
  const [isLeftSidebarOpen, setIsLeftSidebarOpen] = useState(false);
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(false);
  const { pathname } = useI18nPathname();

  useEffect(() => {
    // Hide left sidebar when page changes.
    setIsLeftSidebarOpen(false);
  }, [pathname]);

  useEffect(() => {
    // Hide right sidebar when hash changes.
    const onHashChanged = () => {
      setIsRightSidebarOpen(false);
    };

    window.addEventListener('hashchange', onHashChanged);

    return () => {
      window.removeEventListener('hashchange', onHashChanged);
    };
  });

  return (
    <div
      className="sticky z-30 border-b border-neutral-200 bg-white lg:hidden"
      style={{ top: 'var(--navbar-height)' }}>
      <Container className="flex h-10 items-center justify-between">
        <Button
          addonPosition="start"
          icon={RiMenu2Line}
          label={intl.formatMessage({
            defaultMessage: 'Menu',
            description: 'Guides navbar menu button label',
            id: 'oo7GzR',
          })}
          size="xs"
          variant="secondary"
          onClick={() => {
            setIsLeftSidebarOpen(true);
          }}
        />
        {tableOfContents && (
          <Button
            addonPosition="start"
            icon={RiListUnordered}
            label={intl.formatMessage({
              defaultMessage: 'Table of Contents',
              description: 'Guides table of contents menu button label',
              id: 'WZy7m4',
            })}
            size="xs"
            variant="secondary"
            onClick={() => {
              setIsRightSidebarOpen(true);
            }}
          />
        )}
      </Container>
      <SlideOut
        enterFrom="start"
        isShown={isLeftSidebarOpen}
        size="sm"
        title={navigation.title}
        onClose={() => setIsLeftSidebarOpen(false)}>
        <GuidesSidebar navigation={navigation} />
      </SlideOut>
      {tableOfContents && (
        <SlideOut
          enterFrom="end"
          isShown={isRightSidebarOpen}
          size="sm"
          onClose={() => setIsRightSidebarOpen(false)}>
          <GuidesTableOfContents tableOfContents={tableOfContents} />
        </SlideOut>
      )}
    </div>
  );
}
