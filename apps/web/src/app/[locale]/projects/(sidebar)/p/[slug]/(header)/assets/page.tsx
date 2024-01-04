import ProjectsProjectAssetsPage from '~/components/projects/details/assets/ProjectsProjectAssetsPage';

import { readProjectsProjectDetails } from '~/db/projects/ProjectsReader';

type Props = Readonly<{
  params: Readonly<{ locale: string; slug: string }>;
}>;

export default async function Page({ params }: Props) {
  const { slug, locale } = params;
  const { project } = await readProjectsProjectDetails(slug, locale);

  return <ProjectsProjectAssetsPage project={project} />;
}
