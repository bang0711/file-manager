import { File } from "@prisma/client";
import Link from "next/link";
import React from "react";
import Thumbnail from "./thumbnail";
import { formatDateTime } from "@/lib/utils";

type Props = {
  file: File;
};

function FileCard({ file }: Props) {
  return (
    <Link
      href={`${file.url}`}
      target="_blank"
      className="hover:shadow-drop-3 flex cursor-pointer flex-col gap-6 rounded-[18px] bg-primary-foreground p-5 shadow-sm transition-all"
    >
      <div className="flex justify-between">
        <Thumbnail
          type={file.type}
          extension={file.extension}
          url={file.url}
          className="!size-20"
          imageClassName="!size-11"
        />

        {/* <div className="flex flex-col items-end justify-between">
      <ActionDropdown file={file} />
      <p className="body-1">{convertFileSize(file.size)}</p>
    </div> */}
      </div>

      <div className="flex flex-col gap-2">
        <p className="line-clamp-1 font-semibold leading-[20px]">{file.name}</p>

        <p className={"text-sm font-normal leading-[24px] text-foreground"}>
          {formatDateTime(file.createdAt.toISOString())}
        </p>
        <p className="line-clamp-1 text-xs font-normal leading-[16px]">
          By: Bang
        </p>
      </div>
    </Link>
  );
}

export default FileCard;
