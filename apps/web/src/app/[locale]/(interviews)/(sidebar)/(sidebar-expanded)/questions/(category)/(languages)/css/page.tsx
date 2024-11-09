import type { Metadata } from 'next/types';

import InterviewsQuestionsCategoryLanguagePage from '~/components/interviews/questions/listings/category/InterviewsQuestionsCategoryLanguagePage';

import { fetchQuestionCompletionCount } from '~/db/QuestionsCount';
import {
  fetchQuestionsListCoding,
  fetchQuestionsListQuiz,
} from '~/db/QuestionsListReader';
import { getIntlServerOnly } from '~/i18n';
import defaultMetadata from '~/seo/defaultMetadata';

const language = 'css';

export const dynamic = 'force-static';

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
        'Top CSS front end interview coding questions to practice, with detailed solutions and explanations by ex-interviewers at FAANG.',
      description: 'Description of Interview Questions page',
      id: 'pTuBE6',
    }),
    locale,
    pathname: `/questions/${language}`,
    title: intl.formatMessage({
      defaultMessage: 'Practice CSS Interview Questions with Solutions',
      description: 'Title of interview Questions page',
      id: 'GkiSbQ',
    }),
  });
}

export default async function Page({ params }: Props) {
  const { locale } = params;
  const [
    { questions: questionsCoding },
    { questions: questionsQuiz },
    questionCompletionCount,
  ] = await Promise.all([
    fetchQuestionsListCoding(locale),
    fetchQuestionsListQuiz(locale),
    fetchQuestionCompletionCount(['javascript', 'user-interface', 'quiz']),
  ]);

  const questionsCodingCSS = questionsCoding.filter((metadata) =>
    metadata.languages.includes(language),
  );
  const questionsQuizCSS = questionsQuiz.filter((metadata) =>
    metadata.topics.includes(language),
  );

  return (
    <InterviewsQuestionsCategoryLanguagePage
      language={language}
      questionCompletionCount={questionCompletionCount}
      questionsCoding={questionsCodingCSS}
      questionsQuiz={questionsQuizCSS}
    />
  );
}
