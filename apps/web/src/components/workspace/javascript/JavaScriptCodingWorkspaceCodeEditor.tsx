import clsx from 'clsx';
import type { editor } from 'monaco-editor';
import { useIntl } from 'react-intl';
import { useIsMounted } from 'usehooks-ts';

import Button from '~/components/ui/Button';
import { themeLineColor } from '~/components/ui/theme';
import CodingWorkspaceEditorShortcutsButton from '~/components/workspace/common/editor/CodingWorkspaceEditorShortcutsButton';
import CodingWorkspaceResetButton from '~/components/workspace/common/editor/CodingWorkspaceResetButton';
import CodingWorkspaceThemeSelect from '~/components/workspace/common/editor/CodingWorkspaceThemeSelect';
import JavaScriptCodingWorkspaceWorkingLanguageSelect from '~/components/workspace/javascript/JavaScriptCodingWorkspaceWorkingLanguageSelect';

import { useJavaScriptCodingWorkspaceContext } from './JavaScriptCodingWorkspaceContext';
import JavaScriptCodingWorkspaceCustomTestCasesBanner from './JavaScriptCodingWorkspaceCustomTestCasesBanner';
import useJavaScriptCodingWorkspaceTilesContext from './useJavaScriptCodingWorkspaceTilesContext';
import { useCodingWorkspaceContext } from '../common/CodingWorkspaceContext';
import CodingWorkspaceLoadedFilesBanner from '../common/editor/CodingWorkspaceLoadedFilesBanner';
import MonacoCodeEditor from '../common/editor/MonacoCodeEditor';

import { useSandpack } from '@codesandbox/sandpack-react';

export default function JavaScriptCodingWorkspaceCodeEditor({
  filePath,
  onMount,
}: Readonly<{
  filePath: string;
  onMount?: (codeEditor: editor.IStandaloneCodeEditor) => void;
}>) {
  const { dispatch } = useJavaScriptCodingWorkspaceTilesContext();
  const {
    showLoadedFilesFromLocalStorageMessage,
    setShowLoadedFilesFromLocalStorageMessage,
  } = useCodingWorkspaceContext();
  const { resetFile, language, setLanguage, workspace } =
    useJavaScriptCodingWorkspaceContext();
  const { sandpack } = useSandpack();
  const intl = useIntl();
  const isMounted = useIsMounted();

  const { files, updateFile } = sandpack;
  const isMainFile = filePath === workspace.main;
  const isRunFile = filePath === workspace.run;

  function resetCode() {
    const shouldDiscard = window.confirm(
      intl.formatMessage({
        defaultMessage: 'Your existing code will be discarded, are you sure?',
        description:
          'Text on browser confirmation pop-up when user attempts to use the reset button to reset their code',
        id: '8aQEL8',
      }),
    );

    if (!shouldDiscard) {
      return;
    }

    setShowLoadedFilesFromLocalStorageMessage(false);
    resetFile(filePath);
  }

  return (
    <div className={clsx('flex w-full flex-col')}>
      <div
        className={clsx(
          'flex items-center justify-between gap-x-2 px-3 py-1.5',
          ['border-b', themeLineColor],
        )}>
        <div>
          {isMainFile && (
            <JavaScriptCodingWorkspaceWorkingLanguageSelect
              value={language}
              onChange={setLanguage}
            />
          )}
          {isRunFile && (
            <Button
              label="View submission tests"
              size="xs"
              variant="secondary"
              onClick={() => {
                dispatch({
                  payload: {
                    tabId: 'test_cases',
                  },
                  type: 'tab-set-active',
                });
              }}
            />
          )}
        </div>
        <div className="-mr-2 flex items-center gap-x-1.5">
          <CodingWorkspaceThemeSelect />
          <CodingWorkspaceEditorShortcutsButton />
          <CodingWorkspaceResetButton onClick={resetCode} />
        </div>
      </div>
      {isMainFile && showLoadedFilesFromLocalStorageMessage && isMounted() && (
        <CodingWorkspaceLoadedFilesBanner
          onHide={() => {
            setShowLoadedFilesFromLocalStorageMessage(false);
          }}
          onResetToDefaultCode={resetCode}
        />
      )}
      {isRunFile && isMounted() && (
        <JavaScriptCodingWorkspaceCustomTestCasesBanner />
      )}
      <MonacoCodeEditor
        filePath={filePath}
        value={files[filePath].code}
        onChange={(val) => {
          updateFile(filePath, val ?? '');
        }}
        onMount={onMount}
      />
    </div>
  );
}
