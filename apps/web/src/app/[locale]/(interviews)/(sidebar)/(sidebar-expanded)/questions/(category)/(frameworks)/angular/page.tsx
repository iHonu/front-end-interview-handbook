import type { Metadata } from 'next/types';

import InterviewsQuestionsCategoryFrameworkPage from '~/components/interviews/questions/listings/category/InterviewsQuestionsCategoryFrameworkPage';

import { readAllFrontEndInterviewGuides } from '~/db/guides/GuidesReader';
import { fetchQuestionCompletionCount } from '~/db/QuestionsCount';
import { fetchCodingQuestionsForFramework } from '~/db/QuestionsListReader';
import { roundQuestionCountToNearestTen } from '~/db/QuestionsUtils';
import { getIntlServerOnly } from '~/i18n';
import defaultMetadata from '~/seo/defaultMetadata';

const framework = 'angular';

export const dynamic = 'force-static';

type Props = Readonly<{
  params: Readonly<{
    locale: string;
  }>;
}>;

async function processParams(params: Props['params']) {
  const { locale } = params;
  const [intl, questionList] = await Promise.all([
    getIntlServerOnly(locale),
    fetchCodingQuestionsForFramework(framework),
  ]);
  const questionListForFramework = questionList.filter((metadata) =>
    metadata.frameworks.some(
      ({ framework: frameworkValue }) => frameworkValue === framework,
    ),
  );

  return {
    questionListForFramework,
    seoDescription: intl.formatMessage(
      {
        defaultMessage:
          'Practice {questionCount}+ curated Angular Interview Questions in-browser, with solutions and test cases from big tech ex-interviewers',
        description: 'Description of Interview Questions page',
        id: '/ZJu61',
      },
      {
        questionCount: roundQuestionCountToNearestTen(
          questionListForFramework.length,
        ),
      },
    ),
    seoTitle: intl.formatMessage({
      defaultMessage:
        'Angular Interview Questions | Solutions by Ex-FAANG interviewers',
      description: 'Title of React Interview Questions page',
      id: 'j/tNtM',
    }),
    socialTitle: intl.formatMessage({
      defaultMessage:
        'Angular Interview Questions with Solutions | GreatFrontEnd',
      description: 'Title of React Interview Questions page',
      id: 't6SUbS',
    }),
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = params;

  const { seoDescription, seoTitle, socialTitle } = await processParams(params);

  return defaultMetadata({
    description: seoDescription,
    locale,
    pathname: `/questions/${framework}`,
    socialTitle,
    title: seoTitle,
  });
}

export default async function Page({ params }: Props) {
  const [{ questionListForFramework }, questionCompletionCount, guides] =
    await Promise.all([
      processParams(params),
      fetchQuestionCompletionCount(['user-interface']),
      readAllFrontEndInterviewGuides(params.locale),
    ]);

  return (
    <InterviewsQuestionsCategoryFrameworkPage
      framework={framework}
      guides={guides}
      questionCompletionCount={questionCompletionCount}
      questionList={questionListForFramework}
    />
  );
}
