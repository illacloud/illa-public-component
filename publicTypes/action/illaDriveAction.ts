import { EXPIRATION_TYPE, UPLOAD_FILE_STATUS } from "../drive"

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

export interface IllaDriveListAllContent {
  filterType: ILLA_DRIVE_FILTER_TYPE
  search: string
  fileID: string
  path: string
  expirationType: EXPIRATION_TYPE
  expiry: string
  hotlinkProtection: boolean
  limit: string
  page: string
}

export interface IllaDriveUploadOneContent {
  overwriteDuplicate: boolean
  fileData: string
  fileName: string
  fileType: ILLA_DRIVE_UPLOAD_FILE_TYPE
  path: string
}

export interface IllaDriveUploadMultipleContent {
  overwriteDuplicate: boolean
  fileNameArray: string
  fileDataArray: string
  fileTypeArray: string
  path: string
}

export interface IllaDriveDownloadOneContent {
  fileID: string
}

export interface IllaDriveDownloadMultipleContent {
  fileIDs: string
}

export interface IllaDriveDeleteOneContent {
  fileID: string
}

export interface IllaDriveDeleteMultipleContent {
  fileIDs: string
}

export interface IllaDriveUpdateContent {
  fileID: string
  fileName: string
}

export type ILLADriveActionTypeContent =
  | IllaDriveListAllContent
  | IllaDriveDownloadOneContent
  | IllaDriveDownloadMultipleContent
  | IllaDriveDeleteOneContent
  | IllaDriveDeleteMultipleContent
  | IllaDriveUploadOneContent
  | IllaDriveUploadMultipleContent
  | IllaDriveUpdateContent

export interface ILLADriveAction<T> {
  operation: ILLA_DRIVE_ACTION_REQUEST_TYPE
  commandArgs: T
}

export interface ILLADriveUpdateStatusAction {
  operation: ILLA_DRIVE_ACTION_REQUEST_TYPE.UPDATE_FILE_STATUS
  fileID: string
  status: UPLOAD_FILE_STATUS
}
