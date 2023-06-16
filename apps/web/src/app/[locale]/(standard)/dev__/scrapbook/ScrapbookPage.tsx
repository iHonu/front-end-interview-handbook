'use client';

import { RiCodeSSlashLine } from 'react-icons/ri';

import QuestionCountLabel from '~/components/questions/common/QuestionCountLabel';
import QuestionDifficultyLabel from '~/components/questions/common/QuestionDifficultyLabel';
import QuestionStudyAllocationLabel from '~/components/questions/common/QuestionStudyAllocationLabel';
import QuestionListingDifficultySummary from '~/components/questions/listings/QuestionListingDifficultySummary';
import QuestionsProgressPanelSection from '~/components/questions/listings/QuestionProgressPanelSection';
import QuestionsProgressPanel from '~/components/questions/listings/QuestionsProgressPanel';
import Container from '~/components/ui/Container';
import Divider from '~/components/ui/Divider';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import UIExamplesGroup from '~/components/ui/misc/UIExamplesGroup';
import {
  themeGradient1,
  themeGradient2,
  themeGradient3,
} from '~/components/ui/theme';

export default function ScrapbookPage() {
  return (
    <div className="grid gap-y-16">
      <Container className="grid gap-y-6">
        <Heading level="heading2">Scrapbook</Heading>
        <Divider />
      </Container>
      <Section>
        <Container>
          <Heading level="heading3">Questions</Heading>
        </Container>
        <Section>
          <div>
            <UIExamplesGroup darkMode="horizontal">
              <div className="inline-flex gap-x-6">
                <QuestionDifficultyLabel showIcon={true} value="easy" />
                <QuestionDifficultyLabel showIcon={true} value="medium" />
                <QuestionDifficultyLabel showIcon={true} value="hard" />
              </div>
            </UIExamplesGroup>
            <UIExamplesGroup darkMode="horizontal">
              <div className="inline-flex gap-x-6">
                <QuestionStudyAllocationLabel
                  frequency="daily"
                  hours={2}
                  showIcon={true}
                />
                <QuestionStudyAllocationLabel
                  frequency="weekly"
                  hours={12}
                  showIcon={true}
                />
              </div>
            </UIExamplesGroup>
            <UIExamplesGroup darkMode="horizontal">
              <div className="inline-flex gap-x-6">
                <QuestionCountLabel count={47} showIcon={true} />
                <QuestionCountLabel count={123} showIcon={true} />
              </div>
            </UIExamplesGroup>
          </div>
        </Section>
        <Container>
          <Heading level="heading3">Dashboard</Heading>
        </Container>
        <Section>
          <div>
            <UIExamplesGroup darkMode="horizontal">
              <div className="inline-grid grid-cols-3 gap-x-6">
                <QuestionsProgressPanel
                  completedQuestions={58}
                  icon={RiCodeSSlashLine}
                  progressBarClassName={themeGradient1}
                  title="Coding"
                  totalQuestions={116}
                  variant="default"
                />
                <QuestionsProgressPanel
                  completedQuestions={80}
                  icon={RiCodeSSlashLine}
                  progressBarClassName={themeGradient3}
                  title="Quizzes"
                  totalQuestions={100}
                  variant="default"
                />
                <QuestionsProgressPanel
                  completedQuestions={4}
                  icon={RiCodeSSlashLine}
                  progressBarClassName={themeGradient2}
                  title="System design"
                  totalQuestions={39}
                  variant="default"
                />
              </div>
              <QuestionsProgressPanel
                completedQuestions={58}
                icon={RiCodeSSlashLine}
                progressBarClassName={themeGradient1}
                title="Coding"
                totalQuestions={116}
                variant="compact"
              />
              <QuestionsProgressPanel
                completedQuestions={80}
                icon={RiCodeSSlashLine}
                progressBarClassName={themeGradient3}
                title="Quizzes"
                totalQuestions={100}
                variant="compact"
              />
              <QuestionsProgressPanel
                completedQuestions={4}
                icon={RiCodeSSlashLine}
                progressBarClassName={themeGradient2}
                title="System design"
                totalQuestions={39}
                variant="compact"
              />
            </UIExamplesGroup>
            <UIExamplesGroup darkMode="horizontal">
              <QuestionsProgressPanelSection
                layout="horizontal"
                progressSummary={{
                  coding: {
                    completed: 58,
                    total: 116,
                  },
                  quiz: {
                    completed: 80,
                    total: 100,
                  },
                  'system-design': {
                    completed: 4,
                    total: 39,
                  },
                }}
              />
            </UIExamplesGroup>
            <UIExamplesGroup darkMode="horizontal">
              <div className="inline-flex flex-col items-start gap-y-6">
                <QuestionListingDifficultySummary
                  easy={67}
                  hard={78}
                  medium={36}
                />
                <QuestionListingDifficultySummary
                  easy={1}
                  hard={5678}
                  medium={234}
                />
              </div>
            </UIExamplesGroup>
          </div>
        </Section>
      </Section>
    </div>
  );
}
