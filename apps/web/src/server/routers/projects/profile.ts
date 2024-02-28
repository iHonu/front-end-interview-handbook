import { z } from 'zod';

import { profileUserNameSchemaServer } from '~/components/profile/fields/ProfileUsernameSchema';
import { projectsJobTitleInputSchemaServer } from '~/components/projects/profile/edit/ProjectsProfileSchema';
import { fetchProjectsProfileRecalculatePoints } from '~/components/projects/reputation/ProjectsProfileRecalculatePoints';
import { projectsSkillListInputOptionalSchemaServer } from '~/components/projects/skills/form/ProjectsSkillListInputSchema';

import prisma from '~/server/prisma';
import { createSupabaseAdminClientGFE_SERVER_ONLY } from '~/supabase/SupabaseServerGFE';
import { base64toBlob } from '~/utils/projects/profilePhotoUtils';

import { projectsUserProcedure, publicProjectsProcedure } from './procedures';
import { publicProcedure, router, userProcedure } from '../../trpc';

async function fetchProjectsProfileStatistics(projectsProfileId: string) {
  const [
    codeReviews,
    completedChallenges,
    submissionUpvotes,
    discussionUpvotes,
    submissionViews,
  ] = await Promise.all([
    prisma.projectsDiscussionComment.count({
      where: {
        author: {
          id: projectsProfileId,
        },
        category: 'CODE_REVIEW',
        domain: {
          in: ['PROJECTS_CHALLENGE', 'PROJECTS_SUBMISSION'],
        },
      },
    }),
    prisma.projectsChallengeSubmission.count({
      where: {
        profileId: projectsProfileId,
      },
    }),
    prisma.projectsChallengeSubmissionVote.count({
      where: {
        submission: {
          profileId: projectsProfileId,
        },
      },
    }),
    prisma.projectsDiscussionCommentVote.count({
      where: {
        comment: {
          author: {
            id: projectsProfileId,
          },
        },
      },
    }),
    prisma.projectsChallengeSubmission.aggregate({
      _sum: {
        views: true,
      },
      where: {
        profileId: projectsProfileId,
      },
    }),
  ]);

  return {
    codeReviews,
    completedChallenges,
    submissionViews: submissionViews._sum.views,
    upvotes: Number(submissionUpvotes) + Number(discussionUpvotes),
  };
}

export const projectsProfileRouter = router({
  dashboardStatistics: publicProcedure
    .input(
      z.object({
        projectsProfileId: z.string().uuid(),
      }),
    )
    .query(async ({ input: { projectsProfileId } }) => {
      return await fetchProjectsProfileStatistics(projectsProfileId);
    }),
  dashboardStatisticsSelf: projectsUserProcedure.query(
    async ({ ctx: { projectsProfileId } }) => {
      return await fetchProjectsProfileStatistics(projectsProfileId);
    },
  ),
  hovercard: publicProcedure
    .input(
      z.object({
        profileId: z.string().uuid(),
      }),
    )
    .query(async ({ input: { profileId } }) => {
      const submissionCount = 2;
      const [profile, pinnedSubmissions, latestSubmissions] = await Promise.all(
        [
          prisma.profile.findUnique({
            include: {
              projectsProfile: {
                select: {
                  id: true,
                  points: true,
                },
              },
            },
            where: {
              id: profileId,
            },
          }),
          prisma.projectsChallengeSubmission.findMany({
            orderBy: {
              createdAt: 'desc',
            },
            take: submissionCount,
            where: {
              pins: {
                some: {
                  projectsProfile: {
                    userId: profileId,
                  },
                },
              },
            },
          }),
          prisma.projectsChallengeSubmission.findMany({
            orderBy: {
              createdAt: 'desc',
            },
            take: submissionCount,
            where: {
              projectsProfile: {
                userId: profileId,
              },
            },
          }),
        ],
      );

      // TODO(projects): see how we can integrate into the Promise.all().
      const { completedChallenges, upvotes, submissionViews, codeReviews } =
        await fetchProjectsProfileStatistics(
          profile?.projectsProfile?.id ?? '',
        );

      return {
        profile,
        stats: {
          codeReviews,
          completedChallenges,
          submissionViews,
          upvotes,
        },
        submissions:
          pinnedSubmissions.length >= submissionCount
            ? pinnedSubmissions
            : latestSubmissions,
      };
    }),
  motivationsUpdate: userProcedure
    .input(
      z.object({
        motivations: z.array(z.string()),
      }),
    )
    .mutation(async ({ input: { motivations }, ctx: { user, req } }) => {
      const projectsProfileFields = {
        motivations,
      };

      const result = await prisma.profile.update({
        data: {
          projectsProfile: {
            upsert: {
              create: projectsProfileFields,
              update: projectsProfileFields,
            },
          },
        },
        select: {
          projectsProfile: {
            select: {
              id: true,
            },
          },
        },
        where: {
          id: user.id,
        },
      });

      if (result) {
        fetchProjectsProfileRecalculatePoints(req, result.projectsProfile?.id);
      }

      return result;
    }),
  onboardingStep1: userProcedure.query(async ({ ctx: { user } }) => {
    return await prisma.profile.findUnique({
      select: {
        avatarUrl: true,
        company: true,
        currentStatus: true,
        name: true,
        startWorkDate: true,
        title: true,
        username: true,
      },
      where: {
        id: user.id,
      },
    });
  }),
  onboardingStep1Update: userProcedure
    .input(
      z.object({
        avatarUrl: z.string().optional(),
        company: z.string().optional().nullable(),
        currentStatus: z.string().optional().nullable(),
        name: z.string(),
        startWorkDate: z.date().optional().nullable(),
        title: projectsJobTitleInputSchemaServer,
        username: profileUserNameSchemaServer,
      }),
    )
    .mutation(
      async ({
        input: {
          currentStatus,
          name,
          title,
          startWorkDate,
          avatarUrl,
          username,
          company,
        },
        ctx: { user, req },
      }) => {
        const result = await prisma.profile.update({
          data: {
            avatarUrl,
            company,
            currentStatus,
            name,
            startWorkDate,
            title,
            username,
          },
          select: {
            projectsProfile: {
              select: {
                id: true,
              },
            },
          },
          where: {
            id: user.id,
          },
        });

        if (result) {
          fetchProjectsProfileRecalculatePoints(
            req,
            result.projectsProfile?.id,
          );
        }

        return result;
      },
    ),
  onboardingStep2: userProcedure.query(async ({ ctx: { user } }) => {
    return await prisma.profile.findUnique({
      select: {
        bio: true,
        githubUsername: true,
        linkedInUsername: true,
        projectsProfile: {
          select: {
            skillsProficient: true,
            skillsToGrow: true,
          },
        },
        website: true,
      },
      where: {
        id: user.id,
      },
    });
  }),
  onboardingStep2Update: userProcedure
    .input(
      z.object({
        bio: z.string(),
        githubUsername: z
          .union([z.string().length(0), z.string().url()])
          .transform((val) => (val ? val : null))
          .nullable(),
        linkedInUsername: z
          .union([z.string().length(0), z.string().url()])
          .transform((val) => (val ? val : null))
          .nullable(),
        skillsProficient: projectsSkillListInputOptionalSchemaServer,
        skillsToGrow: projectsSkillListInputOptionalSchemaServer,
        website: z
          .union([z.string().length(0), z.string().url()])
          .transform((val) => (val ? val : null))
          .nullable(),
      }),
    )
    .mutation(
      async ({
        input: {
          bio,
          githubUsername,
          linkedInUsername,
          website,
          skillsProficient,
          skillsToGrow,
        },
        ctx: { user, req },
      }) => {
        const projectsProfileFields = {
          skillsProficient,
          skillsToGrow,
        };

        const result = await prisma.profile.update({
          data: {
            bio,
            githubUsername,
            linkedInUsername,
            projectsProfile: {
              upsert: {
                create: projectsProfileFields,
                update: projectsProfileFields,
              },
            },
            website,
          },
          select: {
            projectsProfile: {
              select: {
                id: true,
              },
            },
          },
          where: {
            id: user.id,
          },
        });

        if (result) {
          fetchProjectsProfileRecalculatePoints(
            req,
            result.projectsProfile?.id,
          );
        }

        return result;
      },
    ),
  update: projectsUserProcedure
    .input(
      z
        .object({
          avatarUrl: z.string().optional(),
          bio: z.string(),
          company: z.string().optional().nullable(),
          currentStatus: z.string().optional().nullable(),
          githubUsername: z
            .union([z.string().length(0), z.string().url()])
            .transform((val) => (val ? val : null))
            .nullable(),
          linkedInUsername: z
            .union([z.string().length(0), z.string().url()])
            .transform((val) => (val ? val : null))
            .nullable(),
          motivations: z.array(z.string()),
          name: z.string(),
          skillsProficient: projectsSkillListInputOptionalSchemaServer,
          skillsToGrow: projectsSkillListInputOptionalSchemaServer,
          startWorkDate: z.date().optional().nullable(),
          title: projectsJobTitleInputSchemaServer,
          username: profileUserNameSchemaServer,
          website: z
            .union([z.string().length(0), z.string().url()])
            .transform((val) => (val ? val : null))
            .nullable(),
        })
        .partial(),
    )
    .mutation(
      async ({
        input: {
          bio,
          currentStatus,
          githubUsername,
          linkedInUsername,
          motivations,
          name,
          skillsProficient,
          skillsToGrow,
          startWorkDate,
          title,
          website,
          avatarUrl,
          username,
          company,
        },
        ctx: { user, req },
      }) => {
        const projectsProfileFields = {
          motivations,
          skillsProficient,
          skillsToGrow,
        };

        const result = await prisma.profile.update({
          data: {
            avatarUrl,
            bio,
            company,
            currentStatus,
            githubUsername,
            linkedInUsername,
            name,
            projectsProfile: {
              upsert: {
                create: projectsProfileFields,
                update: projectsProfileFields,
              },
            },
            startWorkDate,
            title,
            username,
            website,
          },
          select: {
            projectsProfile: {
              select: {
                id: true,
              },
            },
          },
          where: {
            id: user.id,
          },
        });

        if (result) {
          fetchProjectsProfileRecalculatePoints(
            req,
            result.projectsProfile?.id,
          );
        }

        return result;
      },
    ),
  uploadProfilePhoto: userProcedure
    .input(
      z.object({
        imageFile: z.string(),
      }),
    )
    .mutation(async ({ input: { imageFile }, ctx: { user } }) => {
      const supabaseAdmin = createSupabaseAdminClientGFE_SERVER_ONLY();

      const blob = base64toBlob(imageFile);

      const storagePath = `${user.id + String(new Date().getTime())}.jpg`;
      const { error } = await supabaseAdmin.storage
        .from('user-avatars')
        .upload(storagePath, blob, {
          upsert: true,
        });

      if (error) {
        throw error;
      }

      const { data: imageUrl } = supabaseAdmin.storage
        .from('user-avatars')
        .getPublicUrl(storagePath);

      return imageUrl.publicUrl;
    }),
  usernameExists: userProcedure
    .input(
      z.object({
        username: z.string(),
      }),
    )
    .query(async ({ input: { username }, ctx: { user } }) => {
      const profile = await prisma.profile.findUnique({
        where: {
          username,
        },
      });

      return profile != null && profile.id !== user.id;
    }),
  viewer: publicProjectsProcedure.query(async ({ ctx: { user } }) => {
    return await prisma.profile.findUnique({
      include: {
        projectsProfile: true,
      },
      where: {
        id: user?.id,
      },
    });
  }),
});
