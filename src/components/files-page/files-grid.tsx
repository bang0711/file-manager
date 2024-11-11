import { File } from "@prisma/client";

import FileCard from "./file-card";

type Props = {
  files: File[];
};

function FilesGrid({ files }: Props) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6">
      {files.map((file) => (
        <FileCard file={file} key={file.id} />
      ))}
    </div>
  );
}

export default FilesGrid;
