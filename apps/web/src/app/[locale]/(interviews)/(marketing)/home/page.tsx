import { notFound } from 'next/navigation';
import type { Metadata } from 'next/types';

import { INTERVIEWS_REVAMP_2024 } from '~/data/FeatureFlags';

import { InterviewsMarketingTestimonialsDict } from '~/components/interviews/marketing/testimonials/InterviewsMarketingTestimonials';
import { QuestionCount } from '~/components/interviews/questions/listings/stats/QuestionCount';

import { fetchInterviewsCompanyGuides } from '~/db/contentlayer/InterviewsCompanyGuideReader';
import {
  readQuestionJavaScriptContents,
  readQuestionUserInterface,
} from '~/db/QuestionsContentsReader';
import {
  fetchQuestionsListAlgo,
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

export default async function Page({ params }: Props) {
  if (!INTERVIEWS_REVAMP_2024) {
    return notFound();
  }

  const { locale } = params;

  const [
    { question: javaScriptEmbedExample },
    todoListReactSolutionBundle,
    todoListVanillaSolutionBundle,
    todoListAngularSolutionBundle,
    todoListVueSolutionBundle,
    todoListSvelteSolutionBundle,
    { questions: quizQuestions },
    { questions: javaScriptQuestions },
    { questions: algoQuestions },
    { questions: userInterfaceQuestions },
    { questions: systemDesignQuestions },
    companyGuides,
  ] = await Promise.all([
    // JS question embed
    readQuestionJavaScriptContents('flatten', locale),
    // UI question embed
    readQuestionUserInterface('todo-list', 'react', 'solution-improved'),
    readQuestionUserInterface('todo-list', 'vanilla', 'solution-template'),
    readQuestionUserInterface('todo-list', 'angular', 'solution'),
    readQuestionUserInterface('todo-list', 'vue', 'solution'),
    readQuestionUserInterface('todo-list', 'svelte', 'solution'),
    // Question list
    fetchQuestionsListQuiz(locale),
    fetchQuestionsListJavaScript(locale),
    fetchQuestionsListAlgo(locale),
    fetchQuestionsListUserInterface(locale),
    fetchQuestionsListSystemDesign(locale),
    // Company guides
    fetchInterviewsCompanyGuides(),
  ]);

  const testimonials = InterviewsMarketingTestimonialsDict();

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
      questions={{
        algo: algoQuestions,
        js: javaScriptQuestions,
        quiz: quizQuestions,
        'system-design': systemDesignQuestions,
        ui: userInterfaceQuestions,
      }}
      testimonials={[
        testimonials.shoaibAhmed,
        testimonials.locChuong,
        testimonials.lunghaoLee,
        testimonials.luke,
        testimonials.ryan,
      ]}
      uiCodingQuestion={{
        frameworks: {
          angular: todoListAngularSolutionBundle,
          react: todoListReactSolutionBundle,
          svelte: todoListSvelteSolutionBundle,
          vanilla: todoListVanillaSolutionBundle,
          vue: todoListVueSolutionBundle,
        },
        metadata: todoListReactSolutionBundle.metadata,
      }}
    />
  );
}
