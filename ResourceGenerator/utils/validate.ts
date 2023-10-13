import { isBlobURLOrUrl } from "@illa-public/utils"
import i18n from "i18next"

export const validate = (value?: string) =>
  value != undefined && value.trim() != ""

export const isContainLocalPath = (value: string) => {
  return /(^(127\.|0\.0\.0\.0)(\.*\d*)+$)|(^localhost)/.test(value)
}

export const urlValidate = (value: string) => {
  return isBlobURLOrUrl((value ?? "").trim())
    ? true
    : i18n.t("editor.action.resource.error.invalid_url")
}
