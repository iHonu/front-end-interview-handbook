import ProjectsProfileProgressTracksTab from '~/components/projects/profile/progress/ProjectsProfileProgressTracksTab';
import readViewerProjectsProfile from '~/components/projects/utils/readViewerProjectsProfile';

import { readProjectsTrackList } from '~/db/projects/ProjectsReader';

type Props = Readonly<{
  params: Readonly<{
    locale: string;
  }>;
}>;

export default async function Page({ params }: Props) {
  const { locale } = params;
  const [{ viewerProjectsProfile }, { tracks }] = await Promise.all([
    readViewerProjectsProfile(),
    readProjectsTrackList(locale),
  ]);

  return (
    <ProjectsProfileProgressTracksTab
      isViewerPremium={viewerProjectsProfile?.premium ?? false}
      projectTracks={tracks}
    />
  );
}