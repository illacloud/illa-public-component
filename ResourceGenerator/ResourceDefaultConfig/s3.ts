import { S3Resource } from "@illa-public/public-types"
import i18n from "i18next"

export const S3ResourceInitial: S3Resource = {
  bucketName: "",
  region: "",
  endpoint: false,
  baseURL: "",
  accessKeyID: "",
  secretAccessKey: "",
  acl: i18n.t("editor.action.acl.option.public_read"),
}
