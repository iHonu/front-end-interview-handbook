import type { Metadata } from 'next';

import ProjectsProgressSection from '~/components/projects/common/progress-and-contributions/ProjectsProgressSection';

import { readProjectsTrackList } from '~/db/projects/ProjectsReader';
import { getIntlServerOnly } from '~/i18n';
import defaultMetadata from '~/seo/defaultMetadata';

type Props = Readonly<{
  params: Readonly<{
    locale: string;
  }>;
}>;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = params;

  const intl = await getIntlServerOnly(locale);

  return defaultMetadata({
    locale,
    pathname: '/projects/dashboard',
    title: intl.formatMessage({
      defaultMessage: 'Dashboard | Projects',
      description: 'Title of Projects Dashboard page',
      id: 'Eu20+q',
    }),
  });
}

export default async function Page({ params }: Props) {
  const { locale } = params;
  const { tracks } = await readProjectsTrackList(locale);

  return <ProjectsProgressSection projectTracks={tracks} />;
}
