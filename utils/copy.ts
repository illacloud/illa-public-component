import copy from "copy-to-clipboard"

export enum COPY_STATUS {
  SUCCESS = "success",
  EMPTY = "empty",
}
export const copyToClipboard = (copiedValue: unknown) => {
    if (copiedValue === undefined || copiedValue === null || copiedValue === "") {
      return COPY_STATUS.EMPTY
    }
    if (typeof copiedValue === "string" || typeof copiedValue === "number") {
      copy(String(copiedValue))
      return COPY_STATUS.SUCCESS
    }
    copy(JSON.stringify(copiedValue))
    return COPY_STATUS.SUCCESS
}
