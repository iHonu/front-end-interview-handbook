import clsx from 'clsx';
import { useIntl } from 'react-intl';

import InterviewsPremiumBadge from '~/components/interviews/common/InterviewsPremiumBadge';
import type { QuestionMetadata } from '~/components/interviews/questions/common/QuestionsTypes';
import QuestionCompanies from '~/components/interviews/questions/content/QuestionCompanies';
import QuestionContentProse from '~/components/interviews/questions/content/QuestionContentProse';
import QuestionNextQuestions from '~/components/interviews/questions/content/QuestionNextQuestions';
import QuestionSimilarQuestions from '~/components/interviews/questions/content/QuestionSimilarQuestions';
import QuestionMetadataSection from '~/components/interviews/questions/metadata/QuestionMetadataSection';
import Badge from '~/components/ui/Badge';
import Heading from '~/components/ui/Heading';

import { useQueryQuestionProgress } from '~/db/QuestionsProgressClient';

type Props = Readonly<{
  canViewPremiumContent: boolean;
  description: string | null;
  metadata: QuestionMetadata;
  nextQuestions: ReadonlyArray<QuestionMetadata>;
  similarQuestions: ReadonlyArray<QuestionMetadata>;
}>;

export default function JavaScriptCodingWorkspaceDescription({
  canViewPremiumContent,
  description,
  metadata,
  nextQuestions,
  similarQuestions,
}: Props) {
  const { data: questionProgress } = useQueryQuestionProgress(metadata);
  const intl = useIntl();

  return (
    <div className="w-full">
      <div className="mx-auto flex max-w-3xl flex-col gap-y-6 p-4">
        <div className="flex flex-col gap-y-6">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <Heading level="heading5">{metadata.title}</Heading>
            {metadata.premium && <InterviewsPremiumBadge />}
            {questionProgress?.status === 'complete' && (
              <Badge
                label={intl.formatMessage({
                  defaultMessage: 'Completed',
                  description:
                    'Label indicating that the question has been completed',
                  id: 'iIQL6V',
                })}
                size="sm"
                variant="success"
              />
            )}
          </div>
          <QuestionMetadataSection metadata={metadata} />
        </div>
        <div className="flex flex-col gap-y-8">
          <QuestionContentProse contents={description} />
          <div className={clsx('flex flex-col gap-y-8')}>
            <QuestionCompanies
              canViewPremiumContent={canViewPremiumContent}
              companies={metadata.companies}
            />
            <QuestionNextQuestions questions={nextQuestions} />
            <QuestionSimilarQuestions questions={similarQuestions} />
          </div>
        </div>
      </div>
    </div>
  );
}
