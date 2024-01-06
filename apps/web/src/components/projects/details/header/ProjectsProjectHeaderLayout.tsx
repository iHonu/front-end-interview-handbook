'use client';

import { useSelectedLayoutSegment } from 'next/navigation';
import type { ComponentProps } from 'react';

import Container from '~/components/ui/Container';

import ProjectsProjectHeader from './ProjectsProjectHeader';
import ProjectsProjectGetStartedDialog from '../get-started/ProjectsProjectGetStartedDialog';
import ProjectsProjectSessionContextProvider, {
  useProjectsProjectSessionContext,
} from '../ProjectsProjectSessionContext';
import ProjectsProjectStepsTabsImpl from '../ProjectsProjectStepsTabsImpl';
import type { ProjectsProjectItem } from '../types';

type Props = Readonly<{
  children: React.ReactNode;
  project: ProjectsProjectItem;
}>;

export function ProjectsProjectHeaderLayoutImpl({ project, children }: Props) {
  const { slug } = project.metadata;

  const segment =
    (useSelectedLayoutSegment() as ComponentProps<
      typeof ProjectsProjectStepsTabsImpl
    >['value']) || 'project-brief';

  const { isGetStartedDialogShown, setIsGetStartedDialogShown, startSession } =
    useProjectsProjectSessionContext();

  return (
    <Container className="flex flex-col items-stretch pb-10 pt-4 lg:pb-20 lg:pt-16 gap-16">
      <ProjectsProjectHeader project={project} />
      <ProjectsProjectStepsTabsImpl project={project} value={segment} />
      {children}
      <ProjectsProjectGetStartedDialog
        isShown={isGetStartedDialogShown}
        project={project}
        onClose={() => {
          setIsGetStartedDialogShown(false);
        }}
        onStart={() => {
          startSession(slug);
        }}
      />
    </Container>
  );
}
export default function ProjectsProjectHeaderLayout({
  project,
  children,
}: Props) {
  const { slug } = project.metadata;

  return (
    <ProjectsProjectSessionContextProvider slug={slug}>
      <ProjectsProjectHeaderLayoutImpl project={project}>
        {children}
      </ProjectsProjectHeaderLayoutImpl>
    </ProjectsProjectSessionContextProvider>
  );
}
