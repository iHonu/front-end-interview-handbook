import type { z } from 'zod';

import type { aiResponseSchema, projectSchema } from './schema';
import type { Project, RedditPost, RedditPostReply } from '.prisma/client';

export type PostTab = 'all' | 'replied' | 'unreplied';

export type User = Readonly<{
  email?: string | null;
  image?: string | null;
  name?: string | null;
}>;

export type AIResponse = z.infer<typeof aiResponseSchema>;

export type Comment = Readonly<{
  author: string;
  body: string;
  created_utc: number;
  id: string;
  replies: Comments | '';
  ups: number;
}>;

export type Comments = Readonly<{
  data: {
    children: Array<{
      data: Comment;
    }>;
  };
}>;

export type PostReplyExtended = Readonly<{
  redditUser: {
    username: string;
  };
  user: {
    id: string;
    name: string | null;
  };
}> &
  RedditPostReply;

export type PostExtended = Readonly<{
  reply: PostReplyExtended | null;
}> &
  RedditPost;

export type ProjectTransformed = Omit<Project, 'productsToAdvertise'> &
  Readonly<{
    productsToAdvertise: Array<{
      description: string;
      url: string;
    }> | null;
  }>;

export type ProjectFormValues = z.infer<typeof projectSchema>;
