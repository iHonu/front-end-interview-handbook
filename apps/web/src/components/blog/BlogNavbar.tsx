'use client';

import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';
import { RiListUnordered, RiMenu2Line } from 'react-icons/ri';
import { useIntl } from 'react-intl';

import useIsSticky from '~/hooks/useIsSticky';

import type { BlogArticleNavigationType } from '~/components/blog/articles/BlogArticleSidebar';
import { BlogArticleSidebar } from '~/components/blog/articles/BlogArticleSidebar';
import BlogSidebar from '~/components/blog/BlogSidebar';
import Button from '~/components/ui/Button';
import Container from '~/components/ui/Container';
import SlideOut from '~/components/ui/SlideOut';
import { themeLineColor } from '~/components/ui/theme';

import { useI18nPathname } from '~/next-i18nostic/src';

type Props = Readonly<{
  seriesContents?: BlogArticleNavigationType | null;
}>;

export default function BlogNavbar({ seriesContents }: Props) {
  const intl = useIntl();
  const [isLeftSidebarOpen, setIsLeftSidebarOpen] = useState(false);
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(false);
  const { pathname } = useI18nPathname();
  const navbarRef = useRef(null);
  const { isSticky } = useIsSticky(navbarRef);

  useEffect(() => {
    // Hide left sidebar when page changes.
    setIsLeftSidebarOpen(false);
  }, [pathname]);

  return (
    <div
      ref={navbarRef}
      className={clsx(
        'sticky z-30 border-b lg:hidden',
        [!isSticky && 'bg-white dark:bg-neutral-950/60', 'backdrop-blur'],
        themeLineColor,
      )}
      style={{ top: 'var(--nav-top-offset)' }}>
      <Container className="flex h-10 items-center justify-between">
        <Button
          addonPosition="start"
          className="lg:invisible"
          icon={RiMenu2Line}
          label={intl.formatMessage({
            defaultMessage: 'Blog Menu',
            description: 'Blog navbar menu button label',
            id: 'thlYdk',
          })}
          size="xs"
          variant="secondary"
          onClick={() => {
            setIsLeftSidebarOpen(true);
          }}
        />
        {seriesContents && (
          <Button
            addonPosition="start"
            icon={RiListUnordered}
            label={intl.formatMessage({
              defaultMessage: 'Series Contents',
              description: 'Series contents navigation menu button label',
              id: 'KPn83+',
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
        title={intl.formatMessage({
          defaultMessage: 'Blog Menu',
          description: 'Blog navbar menu button label',
          id: 'thlYdk',
        })}
        onClose={() => setIsLeftSidebarOpen(false)}>
        <BlogSidebar />
      </SlideOut>
      {seriesContents && (
        <SlideOut
          enterFrom="end"
          isShown={isRightSidebarOpen}
          size="sm"
          onClose={() => setIsRightSidebarOpen(false)}>
          <BlogArticleSidebar navigation={seriesContents} />
        </SlideOut>
      )}
    </div>
  );
}