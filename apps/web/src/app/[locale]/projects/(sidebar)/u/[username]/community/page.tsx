import { redirect } from 'next/navigation';

import ProjectsContributionsSection from '~/components/projects/common/progress-and-contributions/ProjectsContributionsSection';

import prisma from '~/server/prisma';

type Props = Readonly<{
  params: Readonly<{ locale: string; username: string }>;
}>;

export default async function Page({ params }: Props) {
  const userProfile = await prisma.profile.findUnique({
    include: {
      projectsProfile: true,
    },
    where: {
      username: params.username,
    },
  });

  // If no user profile.
  if (userProfile == null) {
    return redirect(`/projects/challenges`);
  }

  return <ProjectsContributionsSection userId={userProfile.id} />;
}