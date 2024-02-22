import { Controller } from 'react-hook-form';
import { useForm } from 'react-hook-form';

import { trpc } from '~/hooks/trpc';

import { useToast } from '~/components/global/toasts/useToast';
import { useUserProfile } from '~/components/global/UserProfileProvider';
import type {
  QuestionFramework,
  QuestionMetadata,
} from '~/components/interviews/questions/common/QuestionsTypes';
import Button from '~/components/ui/Button';
import EmptyState from '~/components/ui/EmptyState';
import TextArea from '~/components/ui/TextArea';
import TextInput from '~/components/ui/TextInput';

import { staticUpperCase } from '~/utils/typescript/stringTransform';

import { useSandpack } from '@codesandbox/sandpack-react';

type Props = {
  framework: QuestionFramework;
  metadata: QuestionMetadata;
};

type CommunitySolutionDraft = {
  title: string;
  writeup: string;
};

function UserInterfaceCodingWorkspaceCommunitySolutionCreateTabImpl({
  metadata: { slug },
  framework,
}: Props) {
  const { showToast } = useToast();

  const {
    sandpack: { files },
  } = useSandpack();

  const {
    control,
    formState: { errors, isDirty },
    handleSubmit,
    reset,
  } = useForm<CommunitySolutionDraft>({
    defaultValues: {
      title: '',
      writeup: '',
    },
  });

  const { isLoading, mutateAsync: addSolution } =
    trpc.questionCommunitySolution.userInterfaceAdd.useMutation({
      onSuccess: (data) => {
        if (data === null) {
          return;
        }

        showToast({
          description: 'Your solution has been posted',
          title: `Solution posted: ${data.title}`,
          variant: 'success',
        });
        reset();
      },
    });

  return (
    <form
      className="flex w-full flex-col gap-y-2 p-4"
      onSubmit={handleSubmit(({ title, writeup }) => {
        addSolution({
          files: JSON.stringify(files),
          framework: staticUpperCase(framework),
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
    </form>
  );
}

export default function UserInterfaceCodingWorkspaceCommunitySolutionCreateTab({
  metadata,
  framework,
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
    <UserInterfaceCodingWorkspaceCommunitySolutionCreateTabImpl
      framework={framework}
      metadata={metadata}
    />
  );
}
