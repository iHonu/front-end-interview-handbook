import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { getUser } from '~/app/lib/auth';
import prisma from '~/server/prisma';

import ProjectEditPage from './ProjectEditPage';

import type { ProjectTransformed } from '~/types';

type Props = Readonly<{
  params: {
    projectSlug: string;
  };
}>;

export const metadata: Metadata = {
  description: 'Social moderator',
  title: 'SocialMon | Edit project',
};

export default async function Page({ params }: Props) {
  const user = await getUser();

  if (!user?.isAdmin) {
    return notFound();
  }

  const { projectSlug } = params;
  const project = await prisma.project.findUnique({
    where: {
      slug: projectSlug,
    },
  });

  if (!project) {
    return notFound();
  }

  return <ProjectEditPage data={project as ProjectTransformed} />;
}
