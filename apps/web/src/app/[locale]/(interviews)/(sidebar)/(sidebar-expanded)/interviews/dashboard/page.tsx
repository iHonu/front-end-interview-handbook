import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import type { IntlShape } from 'react-intl';

import {
  INTERVIEWS_REVAMP_2024,
  INTERVIEWS_REVAMP_BOTTOM_CONTENT,
} from '~/data/FeatureFlags';

import InterviewsDashboardPage from '~/components/interviews/revamp-dashboard/InterviewsDashboardPage';

import { fetchInterviewsCompanyGuides } from '~/db/contentlayer/InterviewsCompanyGuideReader';
import { fetchInterviewListingBottomContent } from '~/db/contentlayer/InterviewsListingBottomContentReader';
import { fetchPreparationPlans } from '~/db/PreparationPlansReader';
import {
  categorizeQuestionsByFrameworkAndLanguage,
  fetchQuestionsListCoding,
  fetchQuestionsListQuiz,
  fetchQuestionsListSystemDesign,
} from '~/db/QuestionsListReader';
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
    pathname: '/interviews/dashboard',
    title: intl.formatMessage({
      defaultMessage: 'Dashboard - Track your interview preparation progress',
      description: 'Title of Get Started page',
      id: '1nme1Z',
    }),
  });
}

export default async function Page({ params }: Props) {
  if (!INTERVIEWS_REVAMP_2024) {
    return notFound();
  }

  const { locale } = params;

  const intl = await getIntlServerOnly(locale);

  const [
    preparationPlans,
    { questions: quizQuestions },
    { questions: codingQuestions },
    { questions: systemDesignQuestions },
    { framework, language },
    bottomContent,
    companyGuides,
  ] = await Promise.all([
    await fetchPreparationPlans(intl as IntlShape),
    fetchQuestionsListQuiz(locale),
    fetchQuestionsListCoding(locale),
    fetchQuestionsListSystemDesign(locale),
    categorizeQuestionsByFrameworkAndLanguage(locale),
    fetchInterviewListingBottomContent('dashboard'),
    fetchInterviewsCompanyGuides(),
  ]);

  const sortedGuides = companyGuides
    .slice()
    .sort((a, b) => a.ranking - b.ranking);

  return (
    <InterviewsDashboardPage
      bottomContent={
        INTERVIEWS_REVAMP_BOTTOM_CONTENT ? bottomContent : undefined
      }
      companyGuides={sortedGuides}
      preparationPlans={preparationPlans}
      questions={{
        codingQuestions,
        frameworkQuestions: framework,
        languageQuestions: language,
        quizQuestions,
        systemDesignQuestions,
      }}
    />
  );
}