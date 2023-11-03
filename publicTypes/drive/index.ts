export enum UPLOAD_FILE_DUPLICATION_HANDLER {
  COVER = "cover",
  RENAME = "rename",
  MANUAL = "manual",
}

export enum GCS_OBJECT_TYPE {
  FOLDER = "folder",
  FILE = "file",
  ANONYMOUS_FOLDER = "anonymousFolder",
}

export enum FILE_CATEGORY {
  IMAGE = "image",
  VIDEO = "video",
  AUDIO = "audio",
  PDF = "pdf",
}

export enum UPLOAD_FILE_STATUS {
  COMPLETE = "complete",
  FAILED = "failed",
  PAUSED = "paused",
  CANCELED = "canceled",
}

export enum DRIVE_FILE_TYPE {
  MIX = 1,
  FOLDER = 2,
  FILE = 3,
}

export enum SORTED_TYPE {
  ascend = "asc",
  descend = "desc",
}

export interface IILLAFileInfo {
  id: string
  name: string
  type: GCS_OBJECT_TYPE
  contentType: string
  size: number
  createdAt: string
  lastModifiedAt: string
  lastModifiedBy: string
  owner: string
}

export enum EXPIRATION_TYPE {
  "PERSISTENT" = "persistent",
  "CUSTOM" = "custom",
}

export enum DUPLICATION_HANDLER {
  COVER = "cover",
  RENAME = "rename",
  MANUAL = "manual",
  SKIP = "SKIP",
}
