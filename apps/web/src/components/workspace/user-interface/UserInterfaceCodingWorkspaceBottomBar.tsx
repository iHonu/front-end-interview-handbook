import { useState } from 'react';
import { RiArrowGoBackLine, RiSettings2Line } from 'react-icons/ri';
import { VscLayout } from 'react-icons/vsc';

import QuestionReportIssueButton from '~/components/interviews/questions/common/QuestionReportIssueButton';
import type {
  QuestionMetadata,
  QuestionUserInterface,
} from '~/components/interviews/questions/common/QuestionsTypes';
import type { QuestionUserInterfaceMode } from '~/components/interviews/questions/common/QuestionUserInterfacePath';
import DropdownMenu from '~/components/ui/DropdownMenu';

import UserInterfaceCodingWorkspaceLayoutDialog from './UserInterfaceCodingWorkspaceLayoutDialog';
import UserInterfaceCodingWorkspaceSaveButton from './UserInterfaceCodingWorkspaceSaveButton';
import CodingWorkspaceBottomBar from '../common/CodingWorkspaceBottomBar';

type Props = Readonly<{
  frameworkSolutionPath: string;
  metadata: QuestionMetadata;
  mode: QuestionUserInterfaceMode;
  nextQuestions: ReadonlyArray<QuestionMetadata>;
  question: QuestionUserInterface;
  resetToDefaultCode: () => void;
}>;

export default function UserInterfaceCodingWorkspaceBottomBar({
  frameworkSolutionPath,
  metadata,
  question,
  mode,
  nextQuestions,
  resetToDefaultCode,
}: Props) {
  const [isLayoutDialogOpen, setIsLayoutDialogOpen] = useState(false);

  return (
    <CodingWorkspaceBottomBar
      leftElements={
        <div className="hidden items-center gap-x-2 md:inline-flex">
          <DropdownMenu
            icon={RiSettings2Line}
            isLabelHidden={true}
            label="Settings"
            position="above"
            showChevron={false}
            size="xs">
            {[
              {
                icon: VscLayout,
                label: 'Layout',
                onClick: () => {
                  setIsLayoutDialogOpen(true);
                },
                value: 'layout',
              },
              {
                icon: RiArrowGoBackLine,
                label: 'Reset question',
                onClick: () => {
                  if (confirm('Reset all changes made to this question?')) {
                    resetToDefaultCode();
                  }
                },
                value: 'reset',
              },
            ].map(({ onClick, icon, label, value }) => (
              <DropdownMenu.Item
                key={value}
                icon={icon}
                label={label}
                onClick={onClick}
              />
            ))}
          </DropdownMenu>
          <QuestionReportIssueButton
            format="user-interface"
            title={metadata.title}
          />
          <UserInterfaceCodingWorkspaceLayoutDialog
            frameworkSolutionPath={frameworkSolutionPath}
            isOpen={isLayoutDialogOpen}
            mode={mode}
            onClose={() => {
              setIsLayoutDialogOpen(false);
            }}
          />
        </div>
      }
      metadata={metadata}
      nextQuestions={nextQuestions}
      rightElements={
        mode === 'practice' ? (
          <UserInterfaceCodingWorkspaceSaveButton question={question} />
        ) : undefined
      }
    />
  );
}