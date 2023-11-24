import {
  EXPIRATION_TYPE,
  ILLADriveAction,
  ILLA_DRIVE_ACTION_REQUEST_TYPE,
  ILLA_DRIVE_FILTER_TYPE,
  ILLA_DRIVE_UPLOAD_FILE_TYPE,
  IllaDriveDeleteMultipleContent,
  IllaDriveDeleteOneContent,
  IllaDriveDownloadMultipleContent,
  IllaDriveDownloadOneContent,
  IllaDriveListAllContent,
  IllaDriveUpdateContent,
  IllaDriveUploadMultipleContent,
  IllaDriveUploadOneContent,
} from "@illa-public/public-types"

export const ILLADriveListAllContentInitial: IllaDriveListAllContent = {
  filterType: ILLA_DRIVE_FILTER_TYPE.NONE,
  search: "",
  fileID: "",
  path: "",
  expirationType: EXPIRATION_TYPE.PERSISTENT,
  hotlinkProtection: true,
  expiry: "",
  limit: "{{20}}",
  page: "{{1}}",
}

export const ILLADriveUploadOneContentInitial: IllaDriveUploadOneContent = {
  overwriteDuplicate: false,
  fileData: "",
  fileName: "",
  fileType: ILLA_DRIVE_UPLOAD_FILE_TYPE.AUTO,
  path: "",
}

export const ILLADriveUploadMultipleContentInitial: IllaDriveUploadMultipleContent =
  {
    overwriteDuplicate: false,
    fileNameArray: "",
    fileDataArray: "",
    fileTypeArray: "",
    path: "",
  }

export const ILLADriveDownloadOneContentInitial: IllaDriveDownloadOneContent = {
  fileID: "",
}

export const ILLADriveDownloadMultipleContentInitial: IllaDriveDownloadMultipleContent =
  {
    fileIDs: "",
  }

export const ILLADriveDeleteOneContentInitial: IllaDriveDeleteOneContent = {
  fileID: "",
}

export const ILLADriveDeleteMultipleContentInitial: IllaDriveDeleteMultipleContent =
  {
    fileIDs: "",
  }

export const ILLADriveUpdateContentInitial: IllaDriveUpdateContent = {
  fileID: "",
  fileName: "",
}

export const ILLADriveActionInitial: ILLADriveAction<IllaDriveListAllContent> =
  {
    operation: ILLA_DRIVE_ACTION_REQUEST_TYPE.LIST,
    commandArgs: ILLADriveListAllContentInitial,
  }

export const ILLA_DRIVE_ROOT_PATH = "root"
