import { GCS_OBJECT_TYPE } from "@illa-public/public-types"

export const IMAGE_FILE_TYPE_RULES = ["image/"]
export const EXCEL_FILE_TYPE_RULES = [
  "application/vnd.sealed.xls",
  "application/vnd.sealed.csv",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
]
export const WORD_FILE_TYPE_RULES = [
  "application/vnd.sealed.doc",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]

export const AUDIO_FILE_TYPE_RULES = ["audio/"]

export const VIDEO_FILE_TYPE_RULES = ["video/", "application/ogg"]

export const PDF_FILE_TYPE_RULES = ["application/pdf"]

export const PPT_FILE_TYPE_RULES = [
  "application/vnd.sealed.ppt",
  "application/vnd.ms-powerpoint",
  "pplication/vnd.openxmlformats-officedocument.presentationml.presentation",
]

export const ZIP_FILE_TYPE_RULES = [
  "application/zip",
  "application/x-rar-compressed",
  "application/x-7z-compressed",
  "application/x-tar",
  "application/x-gzip",
  "application/x-bzip2",
  "application/x-bzip",
  "application/x-lzip",
  "application/x-lzma",
  "application/x-lzop",
  "application/x-xz",
  "application/x-compress",
  "application/x-compressed",
]

export const matchRules = (rules: string[], contentType: string) => {
  return rules.some((rule) => contentType.startsWith(rule))
}

export const isFile = (contentType: string) => {
  let mimes = [
    IMAGE_FILE_TYPE_RULES,
    EXCEL_FILE_TYPE_RULES,
    WORD_FILE_TYPE_RULES,
    AUDIO_FILE_TYPE_RULES,
    VIDEO_FILE_TYPE_RULES,
    PDF_FILE_TYPE_RULES,
    PPT_FILE_TYPE_RULES,
    ZIP_FILE_TYPE_RULES,
  ]
  for (let rules of mimes) {
    if (rules.some((rule) => contentType.startsWith(rule))) {
      return true
    }
  }
  return false
}

export enum ILLA_DRIVE_OBJECT_TYPE {
  IMAGE = "image",
  VIDEO = "video",
  AUDIO = "audio",
  PDF = "pdf",
  WORD = "word",
  EXCEL = "excel",
  PPT = "ppt",
  FOLDER = "folder",
  ZIP = "zip",
  ANONYMOUS_FOLDER = "anonymousFolder",
  DEFAULT = "default",
}

export const getFileTypeByContentType = (
  type: GCS_OBJECT_TYPE,
  contentType?: string,
) => {
  if (type === GCS_OBJECT_TYPE.FOLDER) {
    return ILLA_DRIVE_OBJECT_TYPE.FOLDER
  } else if (type === GCS_OBJECT_TYPE.ANONYMOUS_FOLDER) {
    return ILLA_DRIVE_OBJECT_TYPE.ANONYMOUS_FOLDER
  }
  if (!contentType) {
    return ILLA_DRIVE_OBJECT_TYPE.DEFAULT
  }
  if (matchRules(IMAGE_FILE_TYPE_RULES, contentType)) {
    return ILLA_DRIVE_OBJECT_TYPE.IMAGE
  }
  if (matchRules(VIDEO_FILE_TYPE_RULES, contentType)) {
    return ILLA_DRIVE_OBJECT_TYPE.VIDEO
  }
  if (matchRules(AUDIO_FILE_TYPE_RULES, contentType)) {
    return ILLA_DRIVE_OBJECT_TYPE.AUDIO
  }
  if (matchRules(PDF_FILE_TYPE_RULES, contentType)) {
    return ILLA_DRIVE_OBJECT_TYPE.PDF
  }
  if (matchRules(WORD_FILE_TYPE_RULES, contentType)) {
    return ILLA_DRIVE_OBJECT_TYPE.WORD
  }
  if (matchRules(EXCEL_FILE_TYPE_RULES, contentType)) {
    return ILLA_DRIVE_OBJECT_TYPE.EXCEL
  }
  if (matchRules(PPT_FILE_TYPE_RULES, contentType)) {
    return ILLA_DRIVE_OBJECT_TYPE.PPT
  }
  if (matchRules(ZIP_FILE_TYPE_RULES, contentType)) {
    return ILLA_DRIVE_OBJECT_TYPE.ZIP
  }
  return ILLA_DRIVE_OBJECT_TYPE.DEFAULT
}

export const CAN_PREVIEW_FILE_TYPE = [
  ILLA_DRIVE_OBJECT_TYPE.IMAGE,
  ILLA_DRIVE_OBJECT_TYPE.VIDEO,
  ILLA_DRIVE_OBJECT_TYPE.AUDIO,
]
