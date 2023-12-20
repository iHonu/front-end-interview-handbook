'use client';

import clsx from 'clsx';

import type { BlogSeriesNavigationLink } from '~/components/blog/BlogSidebar';
import Anchor from '~/components/ui/Anchor';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import Text from '~/components/ui/Text';
import {
  themeLineColor,
  themeTextBrandColor,
  themeTextSecondaryColor,
} from '~/components/ui/theme';

import { useI18nPathname } from '~/next-i18nostic/src';

export type BlogArticleNavigationType = {
  items: ReadonlyArray<BlogSeriesNavigationLink>;
  seriesTitle?: string;
  subseriesTitle?: string;
};

function LinksList({
  items,
}: Readonly<{
  items: ReadonlyArray<BlogSeriesNavigationLink>;
  nestedLevel?: number;
}>) {
  const { pathname } = useI18nPathname();

  return (
    <ul
      className={clsx('flex flex-col gap-y-[14px] border-l', themeLineColor)}
      role="list">
      {items.map((link) => (
        <div key={link.href}>
          <Anchor
            className={clsx(
              '-ml-px flex w-full items-center gap-x-2 border-l text-sm',
              pathname === link.href
                ? clsx(themeTextBrandColor, 'border-current font-semibold')
                : clsx(
                    themeTextSecondaryColor,
                    'border-transparent hover:border-current hover:text-neutral-800 dark:hover:text-white',
                  ),
            )}
            href={link.href}
            variant="unstyled">
            <span className="pl-4">{link.title}</span>
          </Anchor>
        </div>
      ))}
    </ul>
  );
}

type BlogArticleSidebarProps = Readonly<{
  navigation: BlogArticleNavigationType;
  sticky?: boolean;
}>;

export function BlogArticleSidebar({
  sticky = true,
  navigation,
}: BlogArticleSidebarProps) {
  return (
    <nav
      className={clsx(
        'flex w-[280px] flex-shrink-0 flex-col',
        sticky && 'sticky',
      )}
      style={{
        height: sticky
          ? 'calc(100vh - 38px - var(--nav-top-offset))'
          : undefined,
        top: 'calc(38px + var(--nav-top-offset))',
      }}>
      {navigation.subseriesTitle && (
        <Text
          className="mb-4 text-neutral-700 dark:text-neutral-500"
          size="body3"
          weight="bold">
          {navigation.seriesTitle}
        </Text>
      )}
      <Heading
        className="mb-[14px] text-sm font-semibold leading-6"
        level="custom">
        {navigation.subseriesTitle || navigation.seriesTitle}
      </Heading>
      <Section>
        <LinksList items={navigation.items} />
      </Section>
    </nav>
  );
}
