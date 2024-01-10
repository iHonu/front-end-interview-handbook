import type { Metadata } from 'next/types';
import { ArticleJsonLd } from 'next-seo';

import type { QuestionUserInterface } from '~/components/interviews/questions/common/QuestionsTypes';
import { QuestionFrameworkLabels } from '~/components/interviews/questions/common/QuestionsTypes';
import type { QuestionUserInterfaceMode } from '~/components/interviews/questions/common/QuestionUserInterfacePath';
import { determineFrameworkAndMode } from '~/components/interviews/questions/common/QuestionUserInterfacePath';
import { sortQuestionsMultiple } from '~/components/interviews/questions/listings/filters/QuestionsProcessor';
import CodingWorkspacePaywallPage from '~/components/workspace/common/CodingWorkspacePaywallPage';
import UserInterfaceCodingWorkspacePage from '~/components/workspace/user-interface/UserInterfaceCodingWorkspacePage';

import { readQuestionUserInterface } from '~/db/QuestionsContentsReader';
import { fetchQuestionsListCoding } from '~/db/QuestionsListReader';
import { getIntlServerOnly } from '~/i18n';
import defaultMetadata from '~/seo/defaultMetadata';
import {
  createSupabaseAdminClientGFE,
  readUserFromToken,
} from '~/supabase/SupabaseServerGFE';

type Props = Readonly<{
  params: Readonly<{
    locale: string;
    rest: ReadonlyArray<string>;
    slug: string;
  }>;
}>;

function frameworkAgnosticLinks(
  question: QuestionUserInterface,
  mode: QuestionUserInterfaceMode,
) {
  const frameworkAgnosticPathname = `${question.metadata.href}${
    mode === 'solution' ? '/solution' : ''
  }`;
  const frameworkAgnosticUrl = `https://www.greatfrontend.com${frameworkAgnosticPathname}`;

  return {
    pathname: frameworkAgnosticPathname,
    url: frameworkAgnosticUrl,
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug: rawSlug, rest } = params;
  // So that we handle typos like extra characters.
  const slug = decodeURIComponent(rawSlug).replaceAll(/[^a-zA-Z-]/g, '');

  const intl = await getIntlServerOnly(locale);
  const {
    framework: parsedFramework,
    mode,
    codeId,
  } = determineFrameworkAndMode(rest);
  const question = await readQuestionUserInterface(
    slug,
    parsedFramework,
    codeId,
  );

  const { pathname } = frameworkAgnosticLinks(question, mode);

  return defaultMetadata({
    description:
      mode === 'solution'
        ? intl.formatMessage(
            {
              defaultMessage:
                'Read how to solve {questionTitle} using {questionFramework}',
              description:
                'Description of Front End Interview UI Coding Questions solution page',
              id: 'cjgzTz',
            },
            {
              questionFramework: QuestionFrameworkLabels[question.framework],
              questionTitle: question.metadata.title,
            },
          )
        : intl.formatMessage(
            {
              defaultMessage: '{questionExcerpt} using {questionFramework}',
              description:
                'Description of Front End Interview UI Coding Questions practice page',
              id: 'KDDzWX',
            },
            {
              questionExcerpt: question.metadata.excerpt,
              questionFramework: QuestionFrameworkLabels[question.framework],
            },
          ),
    locale,
    pathname,
    title:
      mode === 'solution'
        ? intl.formatMessage(
            {
              defaultMessage:
                'Solution for {questionTitle} in {questionFramework} | Front End Interview UI Coding Questions with Solutions',
              description:
                'Title of Front End Interview UI Coding Questions solution page',
              id: 'I5iXtu',
            },
            {
              questionFramework: QuestionFrameworkLabels[question.framework],
              questionTitle: question.metadata.title,
            },
          )
        : intl.formatMessage(
            {
              defaultMessage:
                '{questionTitle} in {questionFramework} | Front End Interview UI Coding Questions with Solutions',
              description:
                'Title of Front End Interview UI Coding Questions practice page',
              id: 'huof8A',
            },
            {
              questionFramework: QuestionFrameworkLabels[question.framework],
              questionTitle: question.metadata.title,
            },
          ),
  });
}

export default async function Page({ params }: Props) {
  const { slug: rawSlug, rest, locale } = params;
  // So that we handle typos like extra characters.
  const slug = decodeURIComponent(rawSlug).replaceAll(/[^a-zA-Z-]/g, '');
  const {
    mode,
    framework: parsedFramework,
    codeId,
  } = determineFrameworkAndMode(rest);

  const [user, question] = await Promise.all([
    readUserFromToken(),
    readQuestionUserInterface(slug, parsedFramework, codeId),
  ]);

  let canViewPremiumContent = false;
  const supabaseAdmin = createSupabaseAdminClientGFE();

  if (user != null) {
    canViewPremiumContent = await Promise.resolve(
      (async () => {
        const { data: profile } = await supabaseAdmin
          .from('Profile')
          .select('*')
          .eq('id', user.id)
          .single();

        return profile?.premium ?? false;
      })(),
    );
  }

  const isQuestionLockedForUser =
    question.metadata.premium && !canViewPremiumContent;
  const { url } = frameworkAgnosticLinks(question, mode);

  const { questions: codingQuestions } = await fetchQuestionsListCoding(locale);
  const nextQuestions = sortQuestionsMultiple(
    codingQuestions.filter((questionItem) =>
      question.metadata.nextQuestions.includes(questionItem.slug),
    ),
    [
      {
        field: 'difficulty',
        isAscendingOrder: true,
      },
      {
        field: 'premium',
        isAscendingOrder: true,
      },
    ],
  );
  const similarQuestions = sortQuestionsMultiple(
    codingQuestions.filter((questionItem) =>
      question.metadata.similarQuestions.includes(questionItem.slug),
    ),
    [
      {
        field: 'difficulty',
        isAscendingOrder: true,
      },
      {
        field: 'premium',
        isAscendingOrder: true,
      },
    ],
  );

  return (
    <>
      <ArticleJsonLd
        authorName={[
          {
            name: 'GreatFrontEnd',
            url: 'https://twitter.com/greatfrontend',
          },
        ]}
        datePublished="2022-11-01T08:00:00+08:00"
        description={question.metadata.excerpt!}
        images={[]}
        isAccessibleForFree={!question.metadata.premium}
        title={`Front End Coding Interview Question: ${
          mode === 'solution' ? 'Solution ' : ''
        }${question.metadata.title}`}
        url={url}
        useAppDir={true}
      />
      {isQuestionLockedForUser ? (
        <CodingWorkspacePaywallPage metadata={question.metadata} />
      ) : (
        <UserInterfaceCodingWorkspacePage
          canViewPremiumContent={canViewPremiumContent}
          mode={mode}
          nextQuestions={nextQuestions}
          question={question}
          similarQuestions={similarQuestions}
        />
      )}
    </>
  );
}