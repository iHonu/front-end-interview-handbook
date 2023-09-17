import clsx from 'clsx';
import { sortBy } from 'lodash-es';
import type { PropsWithChildren, ReactNode } from 'react';
import { useMemo, useState } from 'react';
import {
  RiCloseLine,
  RiCodeLine,
  RiFolderFill,
  RiFolderOpenFill,
  RiPencilFill,
} from 'react-icons/ri';

import { codingExplorerFilePathToIcon } from './CodingExplorerFilePathToIcon';
import { useCodingFileExplorerContext } from './CodingFileExplorer';
import type { FileExplorerDirectory, FileExplorerFile } from './types';

export type ExplorerItemProps = PropsWithChildren<{
  className?: string;
  icon?: ReactNode;
  indent: number;
  isActive?: boolean;
  isRenaming: boolean;
  name: string;
  onClick?: () => void;
  onDelete?: () => void;
  onRename?: (name: string) => boolean;
  onRenameCancel?: () => void;
  onRenameStart?: () => void;
}>;

function ExplorerItem({
  children,
  className,
  name,
  icon,
  indent,
  isActive = false,
  isRenaming,
  onClick,
  onDelete,
  onRename,
  onRenameCancel,
  onRenameStart,
}: ExplorerItemProps) {
  const [renameText, setRenameText] = useState(name);

  return (
    <button
      className={clsx(
        'group flex items-center justify-start gap-2 truncate rounded py-1 pr-4 text-sm ',
        isActive ? 'bg-neutral-900' : 'hover:text-brand text-neutral-500',
        className,
      )}
      style={{ paddingLeft: 8 + indent * 12 }}
      type="button"
      onClick={(e) => {
        if (isRenaming) {
          e.preventDefault();

          return;
        }
        onClick?.();
      }}>
      {icon}
      <span className="flex-auto truncate text-start">
        {isRenaming ? (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              onRename?.(renameText);
              setRenameText(name);
            }}>
            <input
              autoFocus={true}
              className="bg-neutral-800"
              value={renameText}
              onBlur={(e) => {
                if (!onRename?.(renameText)) {
                  e.preventDefault();
                }
                setRenameText(name);
              }}
              onChange={(e) => {
                setRenameText(e.target.value);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Escape') {
                  e.preventDefault();
                  onRenameCancel?.();
                  setRenameText(name);
                }
              }}
            />
          </form>
        ) : (
          children
        )}
      </span>
      {!isRenaming && (
        <div className="-mr-2 hidden gap-1 text-neutral-600 group-hover:flex">
          <RiPencilFill
            className="h-4 w-4 hover:text-neutral-500"
            onClick={(e) => {
              e.stopPropagation();
              onRenameStart?.();
              true;
            }}
          />
          <RiCloseLine
            className="h-4 w-4 hover:text-neutral-500"
            onClick={(e) => {
              e.stopPropagation();
              onDelete?.();
            }}
          />
        </div>
      )}
    </button>
  );
}

export type ExplorerPassdownProps = {
  indent: number;
};

export function ExplorerFile({
  name,
  fullPath,
  isDirectory,
  sandpackFile,
  indent,
}: ExplorerPassdownProps & FileExplorerFile) {
  const file: FileExplorerFile = {
    fullPath,
    isDirectory,
    name,
    sandpackFile,
  };
  const {
    activeFile,
    cancelItemRename,
    deleteItem,
    renameItem,
    renamingItem,
    setActiveFile,
    startItemRename,
  } = useCodingFileExplorerContext();

  const isRenaming = renamingItem === fullPath;
  const isActive = activeFile === fullPath;
  const Icon = codingExplorerFilePathToIcon(fullPath)?.icon ?? RiCodeLine;

  return (
    <ExplorerItem
      icon={<Icon className="h-4 w-4 flex-none" />}
      indent={indent}
      isActive={isActive}
      isRenaming={isRenaming}
      name={name}
      onClick={() => {
        setActiveFile(fullPath);
      }}
      onDelete={() => {
        deleteItem(fullPath);
      }}
      onRename={(newName) => {
        const folderName = fullPath.slice(0, fullPath.lastIndexOf('/'));

        return renameItem(file, folderName + '/' + newName);
      }}
      onRenameCancel={() => {
        cancelItemRename();
      }}
      onRenameStart={() => {
        startItemRename(fullPath);
      }}>
      <span className="truncate">{name}</span>
    </ExplorerItem>
  );
}

export function ExplorerDirectory({
  name,
  fullPath,
  isDirectory,
  contents,
  indent,
}: ExplorerPassdownProps & FileExplorerDirectory) {
  const folder: FileExplorerDirectory = {
    contents,
    fullPath,
    isDirectory,
    name,
  };
  const {
    cancelItemRename,
    deleteItem,
    openDirectories,
    renameItem,
    renamingItem,
    setDirectoryOpen,
    startItemRename,
  } = useCodingFileExplorerContext();

  const isRenaming = renamingItem === fullPath;
  const isDirectoryOpen = openDirectories.has(fullPath);
  const FolderIcon = isDirectoryOpen ? RiFolderOpenFill : RiFolderFill;
  const itemProps = {
    indent: indent + 1,
  };

  const sortedFiles = useMemo(() => {
    return sortBy(
      sortBy(Object.entries(contents), ([key]) => key),
      ([_, file]) => !file.isDirectory,
    );
  }, [contents]);

  return (
    <>
      {fullPath !== '/' && (
        <ExplorerItem
          key={fullPath}
          className="text-neutral-500"
          icon={<FolderIcon className="flex-none" height={16} width={16} />}
          indent={indent}
          isRenaming={isRenaming}
          name={name}
          onClick={() => {
            setDirectoryOpen(fullPath, !isDirectoryOpen);
          }}
          onDelete={() => {
            deleteItem(fullPath);
          }}
          onRename={(newName) => {
            const folderName = fullPath.slice(0, fullPath.lastIndexOf('/'));

            return renameItem(folder, folderName + '/' + newName);
          }}
          onRenameCancel={() => {
            cancelItemRename();
          }}
          onRenameStart={() => {
            startItemRename(fullPath);
          }}>
          {name}
        </ExplorerItem>
      )}
      {isDirectoryOpen &&
        sortedFiles.map(([_, item]) =>
          item.isDirectory ? (
            <ExplorerDirectory key={item.fullPath} {...item} {...itemProps} />
          ) : (
            <ExplorerFile key={item.fullPath} {...item} {...itemProps} />
          ),
        )}
    </>
  );
}
