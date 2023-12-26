import clsx from 'clsx';
import type { Post } from 'contentlayer/generated';
import { RiArrowRightLine } from 'react-icons/ri';

import type { BlogMetadata } from '~/components/blog/BlogTypes';
import BlogLevelLabel from '~/components/blog/metadata/BlogLevelLabel';
import BlogSeriesLabel from '~/components/blog/metadata/BlogSeriesLabel';
import BlogTags from '~/components/blog/metadata/BlogTags';
import BlogTimestamp from '~/components/blog/metadata/BlogTimestamp';
import Anchor from '~/components/ui/Anchor';
import Text from '~/components/ui/Text';
import {
  themeCardBackgroundWhiteOnLightColor,
  themeGlassyBorder,
  themeTextFaintColor,
} from '~/components/ui/theme';

type Props = Readonly<{
  metadata: BlogMetadata;
  showArrow?: boolean;
  showSeriesTag?: boolean;
  titleLines?: 1 | 2;
  type?: 'default' | 'wide';
}>;

export default function BlogCard({
  metadata,
  type = 'default',
  showArrow = true,
  titleLines = 1,
  showSeriesTag = true,
}: Props) {
  return (
    <div
      className={clsx(
        'group relative flex h-full items-center justify-between overflow-hidden rounded-lg',
        type === 'wide' && 'px-8 py-5 gap-x-6',
        type === 'default' && 'pl-6 pr-4 py-6 gap-x-4',
        themeCardBackgroundWhiteOnLightColor,
        themeGlassyBorder,
      )}>
      {type === 'wide' && metadata.imageUrl && (
        <img
          alt={metadata.title}
          className="!m-0 hidden h-[80px] aspect-[15/8] shrink-0 rounded object-cover lg:block"
          src={metadata.imageUrl}
        />
      )}
      <div className="flex flex-1 flex-col gap-y-4 h-full">
        <div
          className={clsx(
            'flex w-full flex-col grow',
            type === 'default' && 'gap-y-2',
            type === 'wide' && 'gap-y-1',
          )}>
          <div className="flex items-center gap-x-3">
            {type === 'wide' && metadata.imageUrl && (
              <img
                alt={metadata.title}
                className="!m-0 h-[32px] w-[32px] shrink-0 rounded object-cover lg:hidden"
                src={metadata.imageUrl}
              />
            )}
            <Anchor href={metadata.href} variant="unstyled">
              <span aria-hidden={true} className="absolute inset-0" />
              <div className="flex items-center gap-3">
                <Text
                  className={clsx(
                    titleLines === 1 && '!line-clamp-1',
                    titleLines === 2 && '!line-clamp-2',
                    type === 'wide' && 'text-base lg:text-xl',
                  )}
                  display="block"
                  size={type === 'default' ? 'body1' : 'custom'}
                  weight="bold">
                  {metadata.title}
                </Text>
                {metadata.isSeries && showSeriesTag && <BlogSeriesLabel />}
              </div>
            </Anchor>
          </div>
          {metadata.description && (
            <Text
              className={clsx(type === 'default' && '!line-clamp-2')}
              color={type === 'default' ? 'subtitle' : 'secondary'}
              size="body2">
              {metadata.description}
            </Text>
          )}
        </div>
        <div className="flex items-center gap-x-6 gap-y-2">
          {type === 'wide' && (
            <BlogLevelLabel showIcon={true} value={metadata.level} />
          )}
          {(metadata as Post).createdAt && !metadata.isSeries && (
            <Text color="secondary" display="block" size="body3">
              <BlogTimestamp
                date={new Date((metadata as Post).createdAt).getTime()}
              />
            </Text>
          )}
          {metadata.tags.length > 0 && (
            <BlogTags showMultiple={type === 'wide'} tags={metadata.tags} />
          )}
        </div>
      </div>
      {showArrow && (
        <RiArrowRightLine
          aria-hidden={true}
          className={clsx(
            'h-5 w-5 shrink-0',
            themeTextFaintColor,
            'group-hover:text-brand dark:group-hover:text-brand',
          )}
        />
      )}
    </div>
  );
}