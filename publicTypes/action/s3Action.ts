export enum S3ActionType {
  LIST_ALL = "List all objects in bucket",
  READ_ONE = "Read an object",
  DOWNLOAD_ONE = "Download an object",
  DELETE_ONE = "Delete an object",
  DELETE_MULTIPLE = "Delete multiple objects",
  UPLOAD = "Upload data",
  UPLOAD_MULTIPLE = "Upload multiple data",
}

export enum S3ActionRequestType {
  LIST_ALL = "list",
  READ_ONE = "read",
  DOWNLOAD_ONE = "download",
  DELETE_ONE = "delete",
  DELETE_MULTIPLE = "batchDelete",
  UPLOAD = "upload",
  UPLOAD_MULTIPLE = "batchUpload",
}

export interface S3ListAllContent {
  bucketName: string
  prefix: string
  delimiter: string
  signedURL: boolean
  expiry: string
  maxKeys: string
}

export interface S3ReadOneContent {
  bucketName: string
  objectKey: string
  signedURL: boolean
  expiry: string
}

export interface S3DownloadOneContent {
  bucketName: string
  objectKey: string
  signedURL: boolean
  expiry: string
}

export interface S3DeleteOneContent {
  bucketName: string
  objectKey: string
}

export interface S3DeleteMultipleContent {
  bucketName: string
  objectKeyList: string
}

export const enum S3_CONTENT_TYPE {
  STRING = "text/plain",
  JSON = "application/json",
  CSV = "text/csv",
  BINARY = "binary",
}

export interface S3UploadContent {
  bucketName: string
  contentType: S3_CONTENT_TYPE
  objectKey: string
  objectData: string
  expiry: string
  fx: boolean
}

export interface S3UploadMultipleContent {
  bucketName: string
  contentType: S3_CONTENT_TYPE
  objectKeyList: string
  objectDataList: string
  expiry: string
  fx: boolean
}

export type S3ActionTypeContent =
  | S3ListAllContent
  | S3ReadOneContent
  | S3DownloadOneContent
  | S3DeleteOneContent
  | S3DeleteMultipleContent
  | S3UploadContent
  | S3UploadMultipleContent

export interface S3Action<T extends S3ActionTypeContent> {
  commands: S3ActionRequestType
  commandArgs: T
}
