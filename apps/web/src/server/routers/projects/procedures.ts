import { isUser, publicProcedure } from '~/server/trpc';
import getProjectsProfileId from '~/utils/projects/getProjectsProfileId';

import { TRPCError } from '@trpc/server';

const isProjectsUser = isUser.unstable_pipe(async (opts) => {
  const { ctx } = opts;

  const projectsProfileId = await getProjectsProfileId(ctx.user);

  if (projectsProfileId == null) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: 'Profile for Projects required. Register or sign in first.',
    });
  }

  return opts.next({
    ctx: {
      projectsProfileId,
    },
  });
});

export const projectsUserProcedure = publicProcedure.use(isProjectsUser);