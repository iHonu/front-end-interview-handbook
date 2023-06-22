import { useState } from 'react';
import { FormattedMessage } from 'react-intl';

import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';

import type { QuestionsCategorizedProgress } from '~/db/QuestionsUtils';

import QuestionsCodingListWithFilters from './QuestionsCodingListWithFilters';
import QuestionsList from './QuestionsList';
import QuestionsQuizListWithFilters from './QuestionsQuizListWithFilters';
import QuestionsFormatTabs from '../filters/QuestionsFormatsTabs';
import { sortQuestionsMultiple } from '../../common/QuestionsProcessor';
import type {
  QuestionMetadata,
  QuestionQuizMetadata,
  QuestionUserFacingFormat,
} from '../../common/QuestionsTypes';

export default function QuestionsPlansList({
  progress,
  quizQuestions,
  codingQuestions,
  systemDesignQuestions,
}: Readonly<{
  codingQuestions: ReadonlyArray<QuestionMetadata>;
  progress: QuestionsCategorizedProgress;
  quizQuestions: ReadonlyArray<QuestionQuizMetadata>;
  systemDesignQuestions: ReadonlyArray<QuestionMetadata>;
}>) {
  const [selectedQuestionFormat, setSelectedQuestionFormat] =
    useState<QuestionUserFacingFormat>('coding');

  return (
    <div className="flex flex-col gap-y-6">
      <Heading className="sr-only" level="custom">
        <FormattedMessage
          defaultMessage="All Practice Questions"
          description="Header for all practice questions section in study plans"
          id="zo65Ck"
        />
      </Heading>
      <Section>
        <div className="w-full overflow-x-auto">
          <QuestionsFormatTabs
            progressSummary={{
              coding: {
                completed:
                  progress.javascript.size + progress['user-interface'].size,
                total: codingQuestions.length,
              },
              quiz: {
                completed: progress.quiz.size,
                total: quizQuestions.length,
              },
              'system-design': {
                completed: progress['system-design'].size,
                total: systemDesignQuestions.length,
              },
            }}
            value={selectedQuestionFormat}
            onSelect={(value) => setSelectedQuestionFormat(value)}
          />
        </div>
        {selectedQuestionFormat === 'quiz' && (
          <QuestionsQuizListWithFilters questions={quizQuestions} />
        )}
        {selectedQuestionFormat === 'coding' &&
          (() => {
            const sortedQuestions = sortQuestionsMultiple(codingQuestions, [
              { field: 'difficulty', isAscendingOrder: true },
              { field: 'premium', isAscendingOrder: true },
            ]);

            return (
              <QuestionsCodingListWithFilters questions={sortedQuestions} />
            );
          })()}
        {selectedQuestionFormat === 'system-design' &&
          (() => {
            const sortedQuestions = sortQuestionsMultiple(
              systemDesignQuestions,
              [{ field: 'ranking', isAscendingOrder: true }],
            );

            return (
              <QuestionsList
                checkIfCompletedQuestion={() => false}
                questions={sortedQuestions}
              />
            );
          })()}
      </Section>
    </div>
  );
}
