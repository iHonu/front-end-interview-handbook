import prisma from '~/server/prisma';

export default async function getProjectsProfileId(
  user: Readonly<{ id: string }>,
) {
  const profile = await prisma.projectsProfile.findUnique({
    select: {
      id: true,
    },
    where: {
      userId: user.id,
    },
  });

  return profile?.id ?? null;
}
