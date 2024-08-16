import clsx from 'clsx';

import PostMetadata from './PostMetadata';

import type { PostExtended } from '~/types';

import '@mantine/core/styles.css';

import { Box, Title } from '@mantine/core';

type Props = Readonly<{
  onClick: () => void;
  post: PostExtended;
  selected?: boolean;
  showMarkedAsIrrelevant?: boolean;
  showRepliedBadge?: boolean;
}>;

export default function PostItem({
  post,
  onClick,
  selected,
  showRepliedBadge,
  showMarkedAsIrrelevant,
}: Props) {
  return (
    <Box
      className={clsx(
        'w-full',
        'p-2',
        'rounded',
        'hover:bg-slate-100',
        'transition-all duration-200',
        'cursor-pointer',
        'flex flex-col gap-2',
        'text-left',
        selected && 'bg-slate-200',
      )}
      component="button"
      onClick={onClick}>
      <Title order={5}>{post.title}</Title>
      <PostMetadata
        post={post}
        showMarkedAsIrrelevant={showMarkedAsIrrelevant}
        showRepliedBadge={showRepliedBadge}
      />
    </Box>
  );
}
