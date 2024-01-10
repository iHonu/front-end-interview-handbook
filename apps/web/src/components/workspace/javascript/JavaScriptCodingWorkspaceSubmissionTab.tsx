import { trpc } from '~/hooks/trpc';

import Timestamp from '~/components/common/Timestamp';
import type { QuestionMetadata } from '~/components/interviews/questions/common/QuestionsTypes';
import QuestionLanguages from '~/components/interviews/questions/metadata/QuestionLanguages';
import MDXCodeBlock from '~/components/mdx/MDXCodeBlock';
import Badge from '~/components/ui/Badge';
import Heading from '~/components/ui/Heading';
import Prose from '~/components/ui/Prose';
import Spinner from '~/components/ui/Spinner';
import Text from '~/components/ui/Text';

import { staticLowerCase } from '~/utils/typescript/stringTransform';

import JavaScriptCodingWorkspacePushCodeToEditorButton from './JavaScriptCodingWorkspacePushCodeToEditorButton';

type Props = Readonly<{
  metadata: QuestionMetadata;
  submissionId: string;
}>;

export default function JavaScriptCodingWorkspaceSubmissionTab({
  metadata,
  submissionId,
}: Props) {
  const { data: submission, isLoading } =
    trpc.questionSubmission.javaScriptGet.useQuery({
      submissionId,
    });

  return (
    <div className="w-full">
      {isLoading && (
        <div className="flex items-center justify-center p-4">
          <Spinner label="Loading submission" size="md" />
        </div>
      )}
      {submission && (
        <div className="flex flex-col gap-y-4 p-4">
          <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
            <div className="flex items-center gap-x-4">
              <Heading level="heading5">
                Submission for "{metadata.title}"
              </Heading>
              <QuestionLanguages
                languages={[staticLowerCase(submission.language)]}
              />
            </div>
            {submission.result === 'CORRECT' && (
              <Badge label="Correct" variant="success" />
            )}
            {submission.result === 'WRONG' && (
              <Badge label="Wrong" variant="danger" />
            )}
          </div>
          <div className="flex items-center gap-x-4">
            <Text
              className="whitespace-nowrap"
              color="secondary"
              size="body2"
              weight="medium">
              Submitted at <Timestamp date={submission.createdAt} />
            </Text>
          </div>
          <Prose textSize="sm">
            <MDXCodeBlock
              renderExtraButtons={() => (
                <JavaScriptCodingWorkspacePushCodeToEditorButton
                  contents={submission.code}
                />
              )}>
              {submission.code}
            </MDXCodeBlock>
          </Prose>
        </div>
      )}
    </div>
  );
}