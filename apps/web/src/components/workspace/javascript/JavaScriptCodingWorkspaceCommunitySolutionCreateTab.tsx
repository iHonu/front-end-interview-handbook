import { Controller } from 'react-hook-form';
import { useForm } from 'react-hook-form';

import { trpc } from '~/hooks/trpc';

import { useUserProfile } from '~/components/global/UserProfileProvider';
import type {
  QuestionCodingWorkingLanguage,
  QuestionMetadata,
} from '~/components/interviews/questions/common/QuestionsTypes';
import Button from '~/components/ui/Button';
import EmptyState from '~/components/ui/EmptyState';
import Text from '~/components/ui/Text';
import TextArea from '~/components/ui/TextArea';
import TextInput from '~/components/ui/TextInput';

import JavaScriptCodingWorkspaceWorkingLanguageSelect from './JavaScriptCodingWorkspaceWorkingLanguageSelect';
import MonacoCodeEditor from '../common/editor/MonacoCodeEditor';

type Props = {
  metadata: QuestionMetadata;
};

type CommunitySolutionDraft = {
  code: string;
  language: QuestionCodingWorkingLanguage;
  title: string;
  writeup: string;
};

function JavaScriptCodingWorkspaceCommunitySolutionCreateTabImpl({
  metadata: { slug },
}: Props) {
  const { isLoading, mutateAsync: addSolution } =
    trpc.questionCommunitySolution.javaScriptAdd.useMutation();

  const {
    control,
    formState: { errors, isDirty },
    handleSubmit,
  } = useForm<CommunitySolutionDraft>({
    defaultValues: {
      code: '',
      language: 'ts',
      title: '',
      writeup: '',
    },
  });

  return (
    <form
      className="flex w-full flex-col gap-y-2 p-4"
      onSubmit={handleSubmit(({ code, language, title, writeup }) => {
        addSolution({
          code,
          language: language === 'js' ? 'JS' : 'TS',
          slug,
          title,
          writeup,
        });
      })}>
      <div className="flex flex-row-reverse gap-2">
        <Button
          className="mt-0.5 shrink-0"
          isDisabled={!isDirty || isLoading}
          label="Post"
          type="submit"
          variant="primary"
        />
        <Controller
          control={control}
          name="title"
          render={({ field }) => (
            <div className="flex-1">
              <TextInput
                errorMessage={errors.title?.message}
                isLabelHidden={true}
                label="Title"
                placeholder="Title"
                {...field}
              />
            </div>
          )}
          rules={{ required: 'Title cannot be empty' }}
        />
      </div>
      <Controller
        control={control}
        name="writeup"
        render={({ field }) => (
          <TextArea
            errorMessage={errors.writeup?.message}
            isLabelHidden={true}
            label="Writeup"
            placeholder="Writeup"
            {...field}
          />
        )}
        rules={{ required: 'Writeup cannot be empty' }}
      />
      <Controller
        control={control}
        name="language"
        render={({ field }) => (
          <JavaScriptCodingWorkspaceWorkingLanguageSelect {...field} />
        )}
      />
      <Controller
        control={control}
        name="code"
        render={({ field: { ref: _, ...field } }) => (
          <div className="flex flex-1 flex-col">
            <MonacoCodeEditor filePath="community-solution.ts" {...field} />
            {errors.code?.message && (
              <Text color="error" size="body2" weight="medium">
                {errors.code?.message}
              </Text>
            )}
          </div>
        )}
        rules={{ required: 'Code cannot be empty' }}
      />
    </form>
  );
}

export default function JavaScriptCodingWorkspaceCommunitySolutionCreateTab({
  metadata,
}: Props) {
  const { userProfile } = useUserProfile();

  if (userProfile == null) {
    return (
      <div className="w-full">
        <div className="flex h-full flex-col p-4">
          <div className="flex grow items-center justify-center">
            <EmptyState
              title="You must be signed in to post a solution"
              variant="login"
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <JavaScriptCodingWorkspaceCommunitySolutionCreateTabImpl
      metadata={metadata}
    />
  );
}
