import { z } from 'zod';

import absoluteUrl from '~/lib/absoluteUrl';

import {
  projectsReputationSubmissionVoteAwardPoints,
  projectsReputationSubmissionVoteRevokePoints,
} from '~/components/projects/reputation/ProjectsReputationUtils';
import {
  projectsSkillListInputOptionalSchemaServer,
  projectsSkillListInputSchemaServer,
} from '~/components/projects/skills/form/ProjectsSkillListInputSchema';
import { isImageFile } from '~/components/projects/submissions/code-viewer/GithubRepositoryCodeViewer';
import { projectsChallengeSubmissionDeploymentUrlsSchemaServer } from '~/components/projects/submissions/form/fields/ProjectsChallengeSubmissionDeploymentUrlsSchema';
import { projectsChallengeSubmissionImplementationSchemaServer } from '~/components/projects/submissions/form/fields/ProjectsChallengeSubmissionImplementationSchema';
import { projectsChallengeSubmissionRepositoryUrlSchemaServer } from '~/components/projects/submissions/form/fields/ProjectsChallengeSubmissionRepositoryUrlSchema';
import { projectsChallengeSubmissionSummarySchemaServer } from '~/components/projects/submissions/form/fields/ProjectsChallengeSubmissionSummarySchema';
import { projectsChallengeSubmissionTitleSchemaServer } from '~/components/projects/submissions/form/fields/ProjectsChallengeSubmissionTitleSchema';

import type { ProjectsSubmissionScreenshotRequestBody } from '~/pages/api/projects/submission-screenshot';
import prisma from '~/server/prisma';

import { projectsUserProcedure } from './procedures';
import { publicProcedure, router } from '../../trpc';

import { Prisma } from '@prisma/client';
import { TRPCError } from '@trpc/server';

const projectsChallengeProcedure = projectsUserProcedure.input(
  z.object({
    slug: z.string(),
  }),
);

const projectsChallengeSubmissionFormSchema = z.object({
  deploymentUrls: projectsChallengeSubmissionDeploymentUrlsSchemaServer,
  implementation: projectsChallengeSubmissionImplementationSchemaServer,
  repositoryUrl: projectsChallengeSubmissionRepositoryUrlSchemaServer,
  roadmapSkills: projectsSkillListInputSchemaServer,
  summary: projectsChallengeSubmissionSummarySchemaServer,
  techStackSkills: projectsSkillListInputOptionalSchemaServer,
  title: projectsChallengeSubmissionTitleSchemaServer,
});

const githubApiUrl = 'https://api.github.com';

const githubRepositoryFilesSchema = z.object({
  sha: z.string(),
  tree: z.array(
    z.object({
      mode: z.string(),
      path: z.string(),
      sha: z.string(),
      size: z.number().optional(),
      type: z.string(),
      url: z.string(),
    }),
  ),
  truncated: z.boolean(),
  url: z.string(),
});

const githubFileResponseSchema = z.object({
  content: z.string(),
});

function getImageDataSpecification(filePath: string) {
  const extension = filePath.split('.').pop();

  if (extension === 'svg') {
    return 'image/svg+xml';
  }

  if (extension === 'pdf') {
    return 'application/pdf';
  }

  return `image/${extension}`;
}

export const projectsChallengeSubmissionItemRouter = router({
  create: projectsChallengeProcedure
    .input(projectsChallengeSubmissionFormSchema)
    .mutation(
      async ({
        input: {
          slug,
          title,
          summary,
          roadmapSkills,
          techStackSkills,
          deploymentUrls,
          repositoryUrl,
          implementation,
        },
        ctx: { projectsProfileId, req },
      }) => {
        const existingSession = await prisma.projectsChallengeSession.findFirst(
          {
            where: {
              profileId: projectsProfileId,
              slug,
              status: 'IN_PROGRESS',
            },
          },
        );

        // Write to database first.
        const txRes = await prisma.$transaction(async (tx) => {
          if (existingSession == null) {
            await tx.projectsChallengeSession.create({
              data: {
                profileId: projectsProfileId,
                slug,
                status: 'COMPLETED',
                stoppedAt: new Date(),
              },
            });
          } else {
            await tx.projectsChallengeSession.updateMany({
              data: {
                status: 'COMPLETED',
                stoppedAt: new Date(),
              },
              where: {
                profileId: projectsProfileId,
                slug,
                status: 'IN_PROGRESS',
              },
            });
          }

          return await tx.projectsChallengeSubmission.create({
            data: {
              deploymentUrls: deploymentUrls as Prisma.JsonArray,
              implementation,
              profileId: projectsProfileId,
              repositoryUrl,
              roadmapSkills,
              slug,
              summary,
              techStackSkills,
              title,
            },
          });
        });

        const { origin } = absoluteUrl(req);
        const payload: ProjectsSubmissionScreenshotRequestBody = {
          deploymentUrls,
          routeSecret: process.env.API_ROUTE_SECRET!,
          submissionId: txRes.id,
        };

        // Use without `await` so that it's non-blocking.
        fetch(`${origin}/api/projects/submission-screenshot`, {
          body: JSON.stringify(payload),
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'POST',
        });

        return txRes;
      },
    ),
  delete: projectsUserProcedure
    .input(
      z.object({
        submissionId: z.string().uuid(),
      }),
    )
    .mutation(
      async ({ input: { submissionId }, ctx: { projectsProfileId } }) => {
        await prisma.projectsChallengeSubmission.delete({
          where: {
            id: submissionId,
            profileId: projectsProfileId,
          },
        });

        return null;
      },
    ),
  getGitHubFileContents: publicProcedure
    .input(
      z.object({
        filePath: z.string(),
        repoName: z.string(),
        repoOwner: z.string(),
      }),
    )
    .query(async ({ input: { filePath, repoName, repoOwner } }) => {
      try {
        const response = await fetch(
          `${githubApiUrl}/repos/${repoOwner}/${repoName}/contents/${filePath}`,
          {
            headers: {
              Accept: 'application/vnd.github+json',
              Authorization: `token ${process.env.GITHUB_TOKEN}`,
            },
            method: 'GET',
          },
        );

        const json = await response.json();
        const { content: base64Content } = githubFileResponseSchema.parse(json);

        if (isImageFile(filePath)) {
          return `data:${getImageDataSpecification(
            filePath,
          )};base64,${base64Content}`;
        }

        return Buffer.from(base64Content, 'base64').toString('utf-8');
      } catch (error) {
        console.error(error);

        return null;
      }
    }),
  getGitHubRepositoryFilePaths: publicProcedure
    .input(
      z.object({
        branchName: z.string(),
        repoName: z.string(),
        repoOwner: z.string(),
      }),
    )
    .query(async ({ input: { branchName, repoName, repoOwner } }) => {
      try {
        const response = await fetch(
          `${githubApiUrl}/repos/${repoOwner}/${repoName}/git/trees/${branchName}?recursive=1`,
          {
            headers: {
              Accept: 'application/vnd.github+json',
              Authorization: `token ${process.env.GITHUB_TOKEN}`,
            },
            method: 'GET',
          },
        );

        const json = await response.json();
        const data = githubRepositoryFilesSchema.parse(json);

        return data.tree
          .filter(({ type }) => type === 'blob') // Only include files; filter out folders with type === 'tree'
          .map((file) => file.path);
      } catch (error) {
        console.error(error);

        return null;
      }
    }),
  hasVoted: projectsUserProcedure
    .input(
      z.object({
        submissionId: z.string().uuid(),
      }),
    )
    .query(async ({ input: { submissionId }, ctx: { projectsProfileId } }) => {
      // Check if the user has already voted for this submission
      const existingVote =
        await prisma.projectsChallengeSubmissionVote.findFirst({
          where: {
            profileId: projectsProfileId,
            submissionId,
          },
        });

      return existingVote;
    }),
  incrementView: publicProcedure
    .input(
      z.object({
        submissionId: z.string().uuid(),
      }),
    )
    .mutation(async ({ input: { submissionId } }) => {
      await prisma.projectsChallengeSubmission.update({
        data: {
          views: {
            increment: 1,
          },
        },
        where: {
          id: submissionId,
        },
      });

      return null;
    }),
  pin: projectsUserProcedure
    .input(
      z.object({
        submissionId: z.string().uuid(),
      }),
    )
    .mutation(
      async ({ input: { submissionId }, ctx: { projectsProfileId } }) => {
        const existingPins =
          await prisma.projectsChallengeSubmissionPin.findMany({
            where: {
              profileId: projectsProfileId,
              submissionId,
            },
          });

        if (
          existingPins.map((pin) => pin.submissionId).includes(submissionId)
        ) {
          return; // No-op since already pinned.
        }

        if (existingPins.length > 3) {
          throw 'Unable to pin more than 3 submissions';
        }

        return await prisma.projectsChallengeSubmissionPin.create({
          data: {
            profileId: projectsProfileId,
            submissionId,
          },
        });
      },
    ),
  retakeScreenshot: projectsUserProcedure
    .input(
      z.object({
        submissionId: z.string().uuid(),
      }),
    )
    .mutation(
      async ({ input: { submissionId }, ctx: { projectsProfileId, req } }) => {
        const submission = await prisma.projectsChallengeSubmission.findUnique({
          where: {
            id: submissionId,
            profileId: projectsProfileId,
          },
        });

        if (submission == null) {
          throw new TRPCError({
            code: 'BAD_REQUEST',
            message: 'Submission not found',
          });
        }

        const { origin } = absoluteUrl(req);
        const payload: ProjectsSubmissionScreenshotRequestBody = {
          deploymentUrls: submission.deploymentUrls,
          routeSecret: process.env.API_ROUTE_SECRET!,
          submissionId,
        };

        return await fetch(`${origin}/api/projects/submission-screenshot`, {
          body: JSON.stringify(payload),
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'POST',
        });
      },
    ),
  unpin: projectsUserProcedure
    .input(
      z.object({
        submissionIds: z.array(z.string().uuid()),
      }),
    )
    .mutation(
      async ({ input: { submissionIds }, ctx: { projectsProfileId } }) => {
        await prisma.projectsChallengeSubmissionPin.deleteMany({
          where: {
            profileId: projectsProfileId,
            submissionId: {
              in: submissionIds,
            },
          },
        });
      },
    ),
  unvote: projectsUserProcedure
    .input(
      z.object({
        submissionId: z.string().uuid(),
      }),
    )
    .mutation(
      async ({ input: { submissionId }, ctx: { projectsProfileId } }) => {
        const deletedVote = await prisma.projectsChallengeSubmissionVote.delete(
          {
            where: {
              submissionId_profileId: {
                profileId: projectsProfileId,
                submissionId,
              },
            },
          },
        );

        await projectsReputationSubmissionVoteRevokePoints(deletedVote);

        return null;
      },
    ),
  update: projectsUserProcedure
    .input(
      projectsChallengeSubmissionFormSchema.partial().extend({
        submissionId: z.string().uuid(),
      }),
    )
    .mutation(
      async ({
        input: {
          submissionId,
          title,
          roadmapSkills,
          techStackSkills,
          summary,
          deploymentUrls,
          repositoryUrl,
          implementation,
        },
        ctx: { projectsProfileId, req },
      }) => {
        const res = await prisma.projectsChallengeSubmission.update({
          data: {
            editedAt: new Date(),
            implementation,
            repositoryUrl,
            roadmapSkills,
            summary,
            techStackSkills,
            title,
          },
          where: {
            id: submissionId,
            profileId: projectsProfileId,
          },
        });

        const { origin } = absoluteUrl(req);
        const payload: ProjectsSubmissionScreenshotRequestBody = {
          deploymentUrls: deploymentUrls ?? [],
          routeSecret: process.env.API_ROUTE_SECRET!,
          submissionId,
        };

        // Use without `await` so that it's non-blocking.
        fetch(`${origin}/api/projects/submission-screenshot`, {
          body: JSON.stringify(payload),
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'POST',
        });

        return res;
      },
    ),
  userCompletedTimes: projectsChallengeProcedure.query(
    async ({ input: { slug }, ctx: { projectsProfileId } }) => {
      return await prisma.projectsChallengeSubmission.count({
        where: {
          profileId: projectsProfileId,
          slug,
        },
      });
    },
  ),
  vote: projectsUserProcedure
    .input(
      z.object({
        submissionId: z.string().uuid(),
      }),
    )
    .mutation(
      async ({ input: { submissionId }, ctx: { projectsProfileId } }) => {
        try {
          // Create a new vote for the submission.
          const vote = await prisma.projectsChallengeSubmissionVote.create({
            data: {
              profileId: projectsProfileId,
              submissionId,
            },
          });

          await projectsReputationSubmissionVoteAwardPoints(vote);
        } catch (error) {
          if (
            error instanceof Prisma.PrismaClientKnownRequestError &&
            // Ignore duplicate upvote.
            error.code === 'P2002'
          ) {
            // No-op.
            return;
          }
          throw error;
        }
      },
    ),
});
