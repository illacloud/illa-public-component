import {
  S3ActionRequestType,
  S3ActionTypeContent,
  S3DeleteMultipleContent,
  S3DeleteOneContent,
  S3DownloadOneContent,
  S3ListAllContent,
  S3ReadOneContent,
  S3UploadContent,
  S3UploadMultipleContent,
} from "@illa-public/public-types"

export const S3ListAllContentInitial: S3ListAllContent = {
  bucketName: "",
  prefix: "",
  delimiter: "",
  signedURL: false,
  expiry: "{{5}}",
  maxKeys: "{{100}}",
}

export const S3ReadOneContentInitial: S3ReadOneContent = {
  bucketName: "",
  objectKey: "",
  signedURL: false,
  expiry: "{{5}}",
}

export const S3DownloadOneContentInitial: S3DownloadOneContent = {
  bucketName: "",
  objectKey: "",
  signedURL: false,
  expiry: "{{5}}",
}

export const S3DeleteOneContentInitial: S3DeleteOneContent = {
  bucketName: "",
  objectKey: "",
}

export const S3DeleteMultipleContentInitial: S3DeleteMultipleContent = {
  bucketName: "",
  objectKeyList: "",
}

export const S3UploadContentInitial: S3UploadContent = {
  bucketName: "",
  contentType: "",
  objectKey: "",
  objectData: "",
  expiry: "{{1}}",
}

export const S3UploadMultipleContentInitial: S3UploadMultipleContent = {
  bucketName: "",
  contentType: "",
  objectKeyList: "",
  objectDataList: "",
  expiry: "{{1}}",
}

export interface S3Action<T extends S3ActionTypeContent> {
  commands: S3ActionRequestType
  commandArgs: T
}

export const S3ActionInitial: S3Action<S3ListAllContent> = {
  commands: S3ActionRequestType.LIST_ALL,
  commandArgs: {
    bucketName: "",
    prefix: "",
    delimiter: "",
    signedURL: false,
    expiry: "{{5}}",
    maxKeys: "{{100}}",
  },
}
