import type { Metadata } from 'next';
import { redirect } from 'next/navigation';

import ProjectsChallengeOfficialSolutionSection from '~/components/projects/challenges/resources/ProjectsChallengeOfficialSolutionSection';

import {
  readProjectsChallengeInfo,
  readProjectsChallengeItem,
  readProjectsChallengeSolutions,
} from '~/db/projects/ProjectsReader';
import { getIntlServerOnly } from '~/i18n';
import defaultProjectsMetadata from '~/seo/defaultProjectsMetadata';

type Props = Readonly<{
  params: Readonly<{ locale: string; slug: string }>;
}>;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = params;
  const [intl, { challengeInfo }] = await Promise.all([
    getIntlServerOnly(locale),
    readProjectsChallengeInfo(slug, locale),
  ]);

  return defaultProjectsMetadata(intl, {
    description: intl.formatMessage(
      {
        defaultMessage:
          'All the resources to help you build a {challengeName}, including how-to-guides, official solutions, references and user discussions',
        description: 'Description of Projects challenge resources page',
        id: 'JrYZqa',
      },
      {
        challengeName: challengeInfo.title,
      },
    ),
    locale,
    pathname: `/projects/challenges/${slug}/resources/solutions`,
    title: intl.formatMessage(
      {
        defaultMessage: 'Challenge: {challengeName} | Official solutions',
        description: 'Title of Projects challenge resources solutions page',
        id: 'dhbnY3',
      },
      {
        challengeName: challengeInfo.title,
      },
    ),
  });
}

export default async function Page({ params }: Props) {
  const { slug, locale } = params;
  const { challenge } = await readProjectsChallengeItem(slug, locale);
  const { metadata } = challenge;

  if (!metadata.solutions?.[0]) {
    return redirect(metadata.resourcesGuidesHref);
  }

  const solution = await readProjectsChallengeSolutions(
    slug,
    metadata.solutions[0],
  );

  return <ProjectsChallengeOfficialSolutionSection solution={solution} />;
}
