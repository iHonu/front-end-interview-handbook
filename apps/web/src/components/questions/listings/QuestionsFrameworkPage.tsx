'use client';

import type { ReactNode } from 'react';

import PromoBanner from '~/components/global/banners/PromoBanner';
import type {
  QuestionFramework,
  QuestionMetadata,
} from '~/components/questions/common/QuestionsTypes';
import QuestionsCodingListWithFilters from '~/components/questions/listings/QuestionsCodingListWithFilters';
import Container from '~/components/ui/Container';
import Section from '~/components/ui/Heading/HeadingContext';

import type { QuestionCompletionCount } from '~/db/QuestionsCount';

import QuestionCategoryTitleSection from './QuestionCategoryTitleSection';

type Props = Readonly<{
  description: string;
  framework: QuestionFramework;
  logo?: ReactNode;
  questionCompletionCount?: QuestionCompletionCount;
  questionList: ReadonlyArray<QuestionMetadata>;
  title: string;
}>;

export default function QuestionsFrameworkPage({
  description,
  framework,
  logo,
  questionCompletionCount,
  questionList,
  title,
}: Props) {
  return (
    <>
      <PromoBanner />
      <Container className="grid gap-y-12 pb-12 pt-6" variant="normal">
        <QuestionCategoryTitleSection
          category="react"
          count={questionList.length}
          description={description}
          logo={logo}
          title={title}
        />
        <Section>
          <QuestionsCodingListWithFilters
            framework={framework}
            mode="framework"
            questionCompletionCount={questionCompletionCount}
            questions={questionList}
          />
        </Section>
      </Container>
    </>
  );
}
