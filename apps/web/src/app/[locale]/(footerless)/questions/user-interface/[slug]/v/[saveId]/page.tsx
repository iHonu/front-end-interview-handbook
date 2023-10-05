import type { Metadata } from 'next/types';

import { sortQuestionsMultiple } from '~/components/questions/listings/filters/QuestionsProcessor';
import CodingWorkspacePaywallPage from '~/components/workspace/common/CodingWorkspacePaywallPage';
import UserInterfaceCodingWorkspaceSavesPage from '~/components/workspace/user-interface/UserInterfaceCodingWorkspaceSavesPage';

import { readQuestionUserInterface } from '~/db/QuestionsContentsReader';
import { fetchQuestionsListCoding } from '~/db/QuestionsListReader';
import defaultMetadata from '~/seo/defaultMetadata';
import prisma from '~/server/prisma';
import {
  createSupabaseAdminClientGFE,
  fetchUser,
} from '~/supabase/SupabaseServerGFE';
import { staticLowerCase } from '~/utils/typescript/stringTransform';

type Props = Readonly<{
  params: Readonly<{
    locale: string;
    saveId: string;
    slug: string;
  }>;
}>;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug, saveId } = params;

  const [question, save] = await Promise.all([
    readQuestionUserInterface(slug),
    prisma.questionUserInterfaceSave.findFirst({
      where: {
        id: saveId,
      },
    }),
  ]);

  return defaultMetadata({
    locale,
    pathname: question.metadata.href + `/v/${saveId}`,
    title:
      save == null
        ? question.metadata.title
        : `${save?.name} | ${question.metadata.title}`,
  });
}

export default async function Page({ params }: Props) {
  const { slug, saveId } = params;

  const [user, save] = await Promise.all([
    fetchUser(),
    prisma.questionUserInterfaceSave.findFirst({
      where: {
        id: saveId,
      },
    }),
  ]);

  if (save == null) {
    // TODO(submission): show error page for not found save.
    return <div className="p-4 text-center">No such save.</div>;
  }

  const question = await readQuestionUserInterface(
    slug,
    staticLowerCase(save!.framework),
  );

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

  if (isQuestionLockedForUser) {
    return <CodingWorkspacePaywallPage metadata={question.metadata} />;
  }

  const { questions: codingQuestions } = await fetchQuestionsListCoding();
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
    <UserInterfaceCodingWorkspaceSavesPage
      canViewPremiumContent={canViewPremiumContent}
      nextQuestions={nextQuestions}
      question={question}
      save={save!}
      similarQuestions={similarQuestions}
    />
  );
}
