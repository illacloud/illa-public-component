import {
  EXPIRATION_TYPE,
  ILLADriveAction,
  ILLADriveDeleteMultipleContent,
  ILLADriveDeleteOneContent,
  ILLADriveDownloadMultipleContent,
  ILLADriveDownloadOneContent,
  ILLADriveListAllContent,
  ILLADriveListFoldersContent,
  ILLADriveUpdateContent,
  ILLADriveUploadMultipleContent,
  ILLADriveUploadOneContent,
  ILLA_DRIVE_ACTION_REQUEST_TYPE,
  ILLA_DRIVE_FILTER_TYPE,
  ILLA_DRIVE_UPLOAD_FILE_TYPE,
  SORTED_TYPE,
} from "@illa-public/public-types"

export const ILLADriveListAllContentInitial: ILLADriveListAllContent = {
  filterType: ILLA_DRIVE_FILTER_TYPE.NONE,
  search: "",
  fileID: "",
  path: "",
  expirationType: EXPIRATION_TYPE.PERSISTENT,
  hotlinkProtection: true,
  expiry: "",
  limit: "{{20}}",
  page: "{{1}}",
  sortedBy: "lastModifiedAt",
  sortedByFx: false,
  sortedType: SORTED_TYPE.ascend,
  sortedTypeFx: false,
}

export const ILLADriveListFoldersContentInitial: ILLADriveListFoldersContent = {
  filterType: ILLA_DRIVE_FILTER_TYPE.NONE,
  search: "",
  folderID: "",
  path: "",
  limit: "{{20}}",
  page: "{{1}}",
  sortedBy: "lastModifiedAt",
  sortedByFx: false,
  sortedType: SORTED_TYPE.ascend,
  sortedTypeFx: false,
}

export const ILLADriveUploadOneContentInitial: ILLADriveUploadOneContent = {
  overwriteDuplicate: false,
  fileData: "",
  fileName: "",
  fileType: ILLA_DRIVE_UPLOAD_FILE_TYPE.AUTO,
  path: "",
}

export const ILLADriveUploadMultipleContentInitial: ILLADriveUploadMultipleContent =
  {
    overwriteDuplicate: false,
    fileNameArray: "",
    fileDataArray: "",
    fileTypeArray: "",
    path: "",
  }

export const ILLADriveDownloadOneContentInitial: ILLADriveDownloadOneContent = {
  fileID: "",
}

export const ILLADriveDownloadMultipleContentInitial: ILLADriveDownloadMultipleContent =
  {
    fileIDs: "",
  }

export const ILLADriveDeleteOneContentInitial: ILLADriveDeleteOneContent = {
  fileID: "",
}

export const ILLADriveDeleteMultipleContentInitial: ILLADriveDeleteMultipleContent =
  {
    fileIDs: "",
  }

export const ILLADriveUpdateContentInitial: ILLADriveUpdateContent = {
  fileID: "",
  fileName: "",
}

export const ILLADriveActionInitial: ILLADriveAction<ILLADriveListAllContent> =
  {
    operation: ILLA_DRIVE_ACTION_REQUEST_TYPE.LIST,
    commandArgs: ILLADriveListAllContentInitial,
  }

export const ILLA_DRIVE_ROOT_PATH = "root"
