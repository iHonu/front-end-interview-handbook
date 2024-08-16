import { FileObject, FileData } from './FileExplorer';

export default function FileList({
  fileList,
  level,
}: Readonly<{
  fileList: ReadonlyArray<FileData>;
  level: number;
}>) {
  const directories = fileList.filter(
    (fileItem) => fileItem.children,
  );
  directories.sort((a, b) => a.name.localeCompare(b.name));

  const nonDirectories = fileList.filter(
    (fileItem) => !fileItem.children,
  );
  nonDirectories.sort((a, b) =>
    a.name.localeCompare(b.name),
  );

  const items = [...directories, ...nonDirectories];

  return (
    <ul className="file-list" role="group">
      {items.map((file, index) => (
        <FileObject
          posInSet={index + 1}
          setSize={items.length}
          key={file.id}
          file={file}
          level={level}
        />
      ))}
    </ul>
  );
}
