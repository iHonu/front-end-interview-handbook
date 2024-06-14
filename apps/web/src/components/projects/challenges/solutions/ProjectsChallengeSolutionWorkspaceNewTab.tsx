import { RiCodeLine } from 'react-icons/ri';

import Button from '~/components/ui/Button';
import Text from '~/components/ui/Text';
import { codingWorkspaceExtractFileNameFromPath } from '~/components/workspace/common/codingWorkspaceExtractFileNameFromPath';
import { codingWorkspaceExplorerFilePathToIcon } from '~/components/workspace/common/explorer/codingWorkspaceExplorerFilePathToIcon';
import {
  codingWorkspaceTabFileId,
  codingWorkspaceTabFilePattern,
} from '~/components/workspace/common/tabs/codingWorkspaceTabId';
import useUserInterfaceCodingWorkspaceTilesContext from '~/components/workspace/user-interface/useUserInterfaceCodingWorkspaceTilesContext';

import type {
  ProjectsChallengeSolutionWorkspacePredefinedTabsContents,
  ProjectsChallengeSolutionWorkspacePredefinedTabsType,
} from './ProjectsChallengeSolutionWorkspaceTypes';

import { useSandpack } from '@codesandbox/sandpack-react';

type NewTabTypeData =
  | {
      payload: { code: string; file: string };
      type: 'code';
    }
  | {
      type: ProjectsChallengeSolutionWorkspacePredefinedTabsType;
    };

export default function ProjectsChallengeSolutionWorkspaceNewTab({
  onSelectTabType,
  predefinedTabs,
}: Readonly<{
  onSelectTabType: (data: NewTabTypeData) => void;
  predefinedTabs: ProjectsChallengeSolutionWorkspacePredefinedTabsContents;
}>) {
  const { sandpack } = useSandpack();
  const { files } = sandpack;
  const { queryTabByPattern } = useUserInterfaceCodingWorkspaceTilesContext();
  const openedFiles = new Set(
    queryTabByPattern(codingWorkspaceTabFilePattern).map(({ tabId }) => tabId),
  );
  const unopenedFiles = Object.entries(files).filter(
    ([file]) => !openedFiles.has(codingWorkspaceTabFileId(file)),
  );

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex flex-col gap-2">
        <Text className="block" size="body2" weight="medium">
          Tabs
        </Text>
        <div className="flex flex-wrap gap-2">
          {Object.entries(predefinedTabs).map(([tabType, tabDetails]) => (
            <Button
              key={tabType}
              addonPosition="start"
              icon={tabDetails.icon}
              label={tabDetails.label}
              variant="secondary"
              onClick={() => {
                onSelectTabType({
                  type: tabType as ProjectsChallengeSolutionWorkspacePredefinedTabsType,
                });
              }}
            />
          ))}
        </div>
      </div>
      {unopenedFiles.length > 0 && (
        <div className="flex flex-col gap-2">
          <Text className="block" size="body2" weight="medium">
            Files
          </Text>
          <div className="flex flex-wrap gap-2">
            {unopenedFiles
              .filter((filePath) => filePath != null)
              .map(([filePath, { code }]) => {
                const Icon =
                  codingWorkspaceExplorerFilePathToIcon(filePath)?.icon ??
                  RiCodeLine;

                return (
                  <Button
                    key={filePath}
                    addonPosition="start"
                    className="font-mono"
                    icon={Icon}
                    label={codingWorkspaceExtractFileNameFromPath(filePath)}
                    variant="secondary"
                    onClick={() => {
                      onSelectTabType({
                        payload: { code, file: filePath },
                        type: 'code',
                      });
                    }}
                  />
                );
              })}
          </div>
        </div>
      )}
    </div>
  );
}