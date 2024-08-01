'use client';

import { type ChangeEvent, useState } from 'react';

import { trpc } from '~/hooks/trpc';

import PostMetadata from './PostMetadata';
import PostResponse from './PostResponse';
import PostCommentsList from '../comments/PostCommentsList';
import { parseMarkdown } from '../utils';

import type { PostExtended } from '~/types';

import '@mantine/core/styles.css';

import {
  Button,
  Divider,
  Flex,
  Group,
  Select,
  Text,
  Textarea,
  Title,
} from '@mantine/core';
import { useInputState } from '@mantine/hooks';

type Props = Readonly<{
  generateResponse: (
    setter: (value: ChangeEvent | string | null | undefined) => void,
  ) => Promise<void>;
  isGeneratingResponse: boolean;
  isReplying: boolean;
  post: PostExtended;
  replyToPost: (response: string, redditUserId: string) => void;
  users?: Array<{ id: string; username: string }>;
}>;

export default function PostDetail({
  generateResponse,
  post,
  replyToPost,
  isGeneratingResponse,
  isReplying,
  users,
}: Props) {
  const [response, setResponse] = useInputState<string | null>(post.response);
  const [selectedRedditUserId, setSelectedRedditUserId] = useState<
    string | null
  >(null);

  const hasReply = !!post.reply;

  const postBody = parseMarkdown(post.content);
  const updatePostMutation = trpc.socialPosts.updatePost.useMutation();
  const { data, isLoading: isFetchingComments } =
    trpc.socialPosts.getPostComments.useQuery(
      {
        permalink: hasReply ? post.reply.permalink : post.permalink, // If has reply, instead fetch the reply and its replies
      },
      {
        onSuccess(result) {
          // To update the post with latest data
          const { post: latestPost } = result;

          updatePostMutation.mutate({
            data: {
              commentsCount: latestPost.commentsCount,
              content: latestPost.content,
              title: latestPost.title,
              upvoteCount: latestPost.upvoteCount,
            },
            postId: post.id,
          });
        },
      },
    );

  function handleReplyToPostButton() {
    if (response && selectedRedditUserId) {
      replyToPost(response, selectedRedditUserId);
    }
  }

  return (
    <div>
      <Flex direction="column" gap={2} justify="space-between" mb="xs" mt="md">
        <Title order={3}>{post.title}</Title>
        <PostMetadata post={post} showViewPost={true} />
      </Flex>
      <Text size="sm">
        <span
          dangerouslySetInnerHTML={{
            __html: postBody,
          }}
          className="prose"
        />
      </Text>
      <Divider my="md" />

      {/* Response */}
      {post.reply ? (
        <PostResponse
          comments={data?.comments}
          isFetchingComments={isFetchingComments}
          reply={post.reply}
        />
      ) : (users ?? [])?.length === 0 ? (
        <Text>
          No users added yet! Please add a user to comment on this post.
        </Text>
      ) : (
        <div className="flex flex-col gap-4">
          <Select
            checkIconPosition="right"
            data={users?.map((user) => ({
              label: user.username,
              value: user.id,
            }))}
            label="Select a user"
            placeholder="Select a user to add comment"
            value={selectedRedditUserId}
            onChange={(value) => setSelectedRedditUserId(value ?? null)}
          />
          <Textarea
            autosize={true}
            label="Response"
            placeholder="Generate or write your comment..."
            value={response === null ? '' : response}
            onChange={setResponse}
          />
          <Group justify="space-between" mb="xs" mt="md">
            <Button
              disabled={isGeneratingResponse}
              loading={isGeneratingResponse}
              onClick={() => generateResponse(setResponse)}>
              ✨ Generate Response
            </Button>
            <Button
              disabled={isReplying || !response || !selectedRedditUserId}
              loading={isReplying}
              onClick={handleReplyToPostButton}>
              Reply
            </Button>
          </Group>
        </div>
      )}

      {!hasReply && (
        <div className="mt-5">
          <PostCommentsList
            comments={data?.comments}
            isFetchingComments={isFetchingComments}
          />
        </div>
      )}
    </div>
  );
}
