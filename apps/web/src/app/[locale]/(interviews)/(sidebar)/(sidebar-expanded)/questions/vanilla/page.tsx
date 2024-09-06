import type { Metadata } from 'next/types';

import QuestionsFrameworkPage from '~/components/interviews/questions/category/QuestionsFrameworkPage';
import type { QuestionFramework } from '~/components/interviews/questions/common/QuestionsTypes';

import { fetchQuestionCompletionCount } from '~/db/QuestionsCount';
import { fetchCodingQuestionsForFramework } from '~/db/QuestionsListReader';
import { getIntlServerOnly } from '~/i18n';
import defaultMetadata from '~/seo/defaultMetadata';

// TODO(interviews): disable to do A/B test.
// export const dynamic = 'force-static';

const framework: QuestionFramework = 'vanilla';

type Props = Readonly<{
  params: Readonly<{
    locale: string;
  }>;
}>;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = params;

  const intl = await getIntlServerOnly(locale);

  return defaultMetadata({
    description: intl.formatMessage({
      defaultMessage:
        'Top Vanilla JavaScript UI front end interview coding questions to practice, with detailed solutions and explanations by ex-interviewers at FAANG.',
      description:
        'Description of Vanilla JavaScript UI Interview Questions page',
      id: 'VLFSw7',
    }),
    locale,
    pathname: `/questions/${framework}`,
    title: intl.formatMessage({
      defaultMessage:
        'Practice Vanilla JavaScript UI Interview Questions with Solutions',
      description: 'Title of Vanilla JavaScript UI Interview Questions page',
      id: 'A+H3cR',
    }),
  });
}

export default async function Page() {
  const [questionList, questionCompletionCount] = await Promise.all([
    fetchCodingQuestionsForFramework(framework),
    fetchQuestionCompletionCount(['user-interface']),
  ]);

  // TODO: i18n
  return (
    <QuestionsFrameworkPage
      description="Top Vanilla JavaScript UI coding interview questions."
      featuredQuestions={questionList.filter((question) => question.featured)}
      featuredSectionTitle="Try these popular Vanilla JavaScript UI questions"
      framework={framework}
      questionCompletionCount={questionCompletionCount}
      questionList={questionList}
      title="Vanilla JavaScript User Interface Questions"
    />
  );
}
