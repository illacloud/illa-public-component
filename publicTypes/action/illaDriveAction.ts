import { EXPIRATION_TYPE, SORTED_TYPE, UPLOAD_FILE_STATUS } from "../drive"

export enum ILLA_DRIVE_ACTION_REQUEST_TYPE {
  LIST = "ListFiles",
  DOWNLOAD_ONE = "GetDownloadAddress",
  DOWNLOAD_MULTIPLE = "GetMultipleDownloadAddress",
  DELETE_ONE = "DeleteFile",
  DELETE_MULTIPLE = "DeleteMultipleFile",
  UPLOAD = "GetUploadAddress",
  UPLOAD_MULTIPLE = "GetMultipleUploadAddress",
  UPDATE = "RenameFile",
  UPDATE_FILE_STATUS = "UpdateFileStatus",
  LIST_FOLDERS = "ListFolders",
}

export enum ILLA_DRIVE_FILTER_TYPE {
  NONE = "none",
  BY_ID = "byID",
  BY_NAME = "byName",
}

export enum ILLA_DRIVE_UPLOAD_FILE_TYPE {
  AUTO = "auto",
  TXT = "txt",
  JPEG = "jpeg",
  PNG = "png",
  SVG = "svg",
  JSON = "json",
  CSV = "csv",
  TSV = "tsv",
  XLSX = "xlsx",
}

export interface ILLADriveListAllContent {
  filterType: ILLA_DRIVE_FILTER_TYPE
  search: string
  fileID: string
  path: string
  expirationType: EXPIRATION_TYPE
  expiry: string
  hotlinkProtection: boolean
  limit: string
  page: string
  sortedBy: string
  sortedByFx: boolean
  sortedType: SORTED_TYPE
  sortedTypeFx: boolean
}

export interface ILLADriveListFoldersContent {
  filterType: ILLA_DRIVE_FILTER_TYPE
  search: string
  folderID: string
  path: string
  limit: string
  page: string
  sortedBy: string
  sortedByFx: boolean
  sortedType: SORTED_TYPE
  sortedTypeFx: boolean
}

export interface ILLADriveUploadOneContent {
  overwriteDuplicate: boolean
  fileData: string
  fileName: string
  fileType: ILLA_DRIVE_UPLOAD_FILE_TYPE
  path: string
}

export interface ILLADriveUploadMultipleContent {
  overwriteDuplicate: boolean
  fileNameArray: string
  fileDataArray: string
  fileTypeArray: string
  path: string
}

export interface ILLADriveDownloadOneContent {
  fileID: string
}

export interface ILLADriveDownloadMultipleContent {
  fileIDs: string
}

export interface ILLADriveDeleteOneContent {
  fileID: string
}

export interface ILLADriveDeleteMultipleContent {
  fileIDs: string
}

export interface ILLADriveUpdateContent {
  fileID: string
  fileName: string
}

export type ILLADriveActionTypeContent =
  | ILLADriveListAllContent
  | ILLADriveListFoldersContent
  | ILLADriveDownloadOneContent
  | ILLADriveDownloadMultipleContent
  | ILLADriveDeleteOneContent
  | ILLADriveDeleteMultipleContent
  | ILLADriveUploadOneContent
  | ILLADriveUploadMultipleContent
  | ILLADriveUpdateContent

export interface ILLADriveAction<T> {
  operation: ILLA_DRIVE_ACTION_REQUEST_TYPE
  commandArgs: T
}

export interface ILLADriveUpdateStatusAction {
  operation: ILLA_DRIVE_ACTION_REQUEST_TYPE.UPDATE_FILE_STATUS
  fileID: string
  status: UPLOAD_FILE_STATUS
}
