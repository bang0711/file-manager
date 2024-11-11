import { clsx, type ClassValue } from "clsx";

import { extname, basename } from "path";

import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getFileType = (fileName: string) => {
  const extension = extname(fileName);

  if (!extension) return { type: "other", extension: "" };

  const documentExtensions = [
    "pdf",
    "doc",
    "docx",
    "txt",
    "xls",
    "xlsx",
    "csv",
    "rtf",
    "ods",
    "ppt",
    "odp",
    "md",
    "html",
    "htm",
    "epub",
    "pages",
    "fig",
    "psd",
    "ai",
    "indd",
    "xd",
    "sketch",
    "afdesign",
    "afphoto",
    "afphoto",
  ];
  const imageExtensions = ["jpg", "jpeg", "png", "gif", "bmp", "svg", "webp"];
  const videoExtensions = ["mp4", "avi", "mov", "mkv", "webm"];
  const audioExtensions = ["mp3", "wav", "ogg", "flac"];

  if (documentExtensions.includes(extension))
    return { type: "document", extension };
  if (imageExtensions.includes(extension)) return { type: "image", extension };
  if (videoExtensions.includes(extension)) return { type: "video", extension };
  if (audioExtensions.includes(extension)) return { type: "audio", extension };

  return { type: "other", extension };
};

export const extractNameFromFile = (fileName: string): string => {
  // Get the main extension
  const extension = extname(fileName);

  // Remove the main extension from the filename to get the base name
  let baseName = basename(fileName, extension);

  // Check if the baseName ends with the same extension
  if (baseName.endsWith(extension)) {
    // Remove the redundant extension if it exists
    baseName = baseName.slice(0, -extension.length);
  }

  return baseName;
};

export const getFileIcon = (extension: string | undefined, type: string) => {
  // Check by MIME type
  if (type.startsWith("application/pdf")) return "/assets/icons/file-pdf.svg";
  if (
    type.startsWith("application/msword") ||
    type ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  ) {
    return "/assets/icons/file-doc.svg";
  }
  if (
    type.startsWith("application/vnd.ms-excel") ||
    type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  ) {
    return "/assets/icons/file-document.svg";
  }
  if (type.startsWith("text/csv")) return "/assets/icons/file-csv.svg";
  if (type.startsWith("text/plain")) return "/assets/icons/file-txt.svg";
  if (type.startsWith("image/")) return "/assets/icons/file-image.svg";
  if (type.startsWith("video/")) return "/assets/icons/file-video.svg";
  if (type.startsWith("audio/")) return "/assets/icons/file-audio.svg";

  // If MIME type doesn't match, check by extension
  switch (extension) {
    case "pdf":
      return "/assets/icons/file-pdf.svg";
    case "doc":
    case "docx":
      return "/assets/icons/file-doc.svg";
    case "csv":
      return "/assets/icons/file-csv.svg";
    case "txt":
      return "/assets/icons/file-txt.svg";
    case "xls":
    case "xlsx":
      return "/assets/icons/file-document.svg";
    case "mkv":
    case "mov":
    case "avi":
    case "wmv":
    case "mp4":
    case "flv":
    case "webm":
    case "m4v":
    case "3gp":
      return "/assets/icons/file-video.svg";
    case "mp3":
    case "mpeg":
    case "wav":
    case "aac":
    case "flac":
    case "ogg":
    case "wma":
    case "m4a":
    case "aiff":
    case "alac":
      return "/assets/icons/file-audio.svg";
    default:
      return "/assets/icons/file-other.svg";
  }
};

export const formatDateTime = (isoString: string | null | undefined) => {
  if (!isoString) return "—";

  const date = new Date(isoString);

  // Get hours and adjust for 12-hour format
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const period = hours >= 12 ? "pm" : "am";

  // Convert hours to 12-hour format
  hours = hours % 12 || 12;

  // Format the time and date parts
  const time = `${hours}:${minutes.toString().padStart(2, "0")} ${period.toUpperCase()}`;
  const day = date.getDate();
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const month = monthNames[date.getMonth()];

  return `${time}, ${day} ${month}`;
};
