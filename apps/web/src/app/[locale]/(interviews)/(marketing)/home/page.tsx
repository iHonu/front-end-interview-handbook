import { notFound } from 'next/navigation';
import type { Metadata } from 'next/types';

import { INTERVIEWS_REVAMP_2024 } from '~/data/FeatureFlags';

import type { EmbedUIQuestion } from '~/components/interviews/marketing/embed/InterviewsMarketingEmbedUIQuestion';
import { sortQuestions } from '~/components/interviews/questions/listings/filters/QuestionsProcessor';
import { QuestionCount } from '~/components/interviews/questions/listings/stats/QuestionCount';

import { fetchInterviewsCompanyGuides } from '~/db/contentlayer/InterviewsCompanyGuideReader';
import {
  readQuestionJavaScriptContents,
  readQuestionUserInterface,
} from '~/db/QuestionsContentsReader';
import {
  fetchQuestionsListJavaScript,
  fetchQuestionsListQuiz,
  fetchQuestionsListSystemDesign,
  fetchQuestionsListUserInterface,
} from '~/db/QuestionsListReader';
import { getIntlServerOnly } from '~/i18n';
import defaultMetadata from '~/seo/defaultMetadata';

import InterviewsMarketingHomePageNew from './InterviewsMarketingHomePageNew';

export const dynamic = 'force-static';

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = params;

  const intl = await getIntlServerOnly(locale);

  return defaultMetadata({
    description: intl.formatMessage(
      {
        defaultMessage: `The complete prep platform for Front End interviews. Practice {questionCount}+ questions with solutions, code in-browser, and use prep plans devised by ex-interviewers.`,
        description: 'Description of GreatFrontEnd standard page',
        id: 'BQSR58',
      },
      {
        questionCount: QuestionCount,
      },
    ),
    locale,
    pathname: '/',
    socialTitle: intl.formatMessage({
      defaultMessage: 'GreatFrontEnd Interviews',
      description: 'Social title of GreatFrontEnd standard page',
      id: '719/YQ',
    }),
    title: intl.formatMessage({
      defaultMessage:
        'GreatFrontEnd: The Great Way to Prepare for Front End Interviews',
      description: 'Title of GreatFrontEnd standard page',
      id: '6xnZGh',
    }),
  });
}

type Props = Readonly<{
  params: Readonly<{ locale: string }>;
}>;

// Custom skeleton example.
const FLATTEN_SKELETON_JS = `/**
 * @param {Array<*|Array>} value
 * @return {Array}
 */
export default function flatten(value) {
  // Add a return to the next line
  // to pass the tests!
  value.reduce(
    (acc, curr) => acc.concat(
      Array.isArray(curr) ?
        flatten(curr) : curr),
    [],
  );
}`;

const FLATTEN_SKELETON_TS = `type ArrayValue = any | Array<ArrayValue>;

export default function flatten(
  value: Array<ArrayValue>
): Array<any> {
  // Add a return to the next line
  // to pass the tests!
  value.reduce(
    (acc, curr) => acc.concat(
      Array.isArray(curr) ?
        flatten(curr) : curr),
    [],
  );
}
`;

const QUESTIONS_TO_SHOW = 6;

export default async function Page({ params }: Props) {
  if (!INTERVIEWS_REVAMP_2024) {
    return notFound();
  }

  const { locale } = params;

  const [
    { question: javaScriptEmbedExample },
    todoListReactSolutionBundle,
    todoListVanillaSolutionBundle,
  ] = await Promise.all([
    readQuestionJavaScriptContents('flatten', locale),
    readQuestionUserInterface('todo-list', 'react', 'solution-improved'),
    readQuestionUserInterface('todo-list', 'vanilla', 'solution-template'),
  ]);

  const [
    { questions: quizQuestions },
    { questions: javaScriptQuestions },
    { questions: userInterfaceQuestions },
    { questions: systemDesignQuestions },
    companyGuides,
  ] = await Promise.all([
    fetchQuestionsListQuiz(locale),
    fetchQuestionsListJavaScript(locale),
    fetchQuestionsListUserInterface(locale),
    fetchQuestionsListSystemDesign(locale),
    fetchInterviewsCompanyGuides(),
  ]);

  const sortedGuides = companyGuides
    .slice()
    .sort((a, b) => a.ranking - b.ranking);

  return (
    <InterviewsMarketingHomePageNew
      companyGuides={sortedGuides}
      javaScriptEmbedExample={{
        ...javaScriptEmbedExample,
        skeleton: {
          js: FLATTEN_SKELETON_JS,
          ts: FLATTEN_SKELETON_TS,
        },
      }}
      javaScriptQuestions={sortQuestions(
        javaScriptQuestions.filter((question) => question.featured),
        'importance',
        false,
      ).slice(0, QUESTIONS_TO_SHOW)}
      quizQuestions={sortQuestions(
        quizQuestions.filter((question) => question.featured),
        'importance',
        false,
      ).slice(0, QUESTIONS_TO_SHOW)}
      systemDesignQuestions={sortQuestions(
        systemDesignQuestions.filter((question) => question.featured),
        'ranking',
        true,
      ).slice(0, QUESTIONS_TO_SHOW)}
      uiCodingQuestion={
        {
          frameworks: {
            // TODO(workspace): Add other supported frameworks
            react: todoListReactSolutionBundle,
            vanilla: todoListVanillaSolutionBundle,
          },
          metadata: todoListReactSolutionBundle.metadata,
        } as EmbedUIQuestion
      }
      userInterfaceQuestions={sortQuestions(
        userInterfaceQuestions.filter((question) => question.featured),
        'importance',
        false,
      ).slice(0, QUESTIONS_TO_SHOW)}
    />
  );
}