import { ERROR_FLAG, isILLAAPiError } from "@illa-public/illa-net"
import { createPayErrorModal } from "./hook"
import { CollarModalType } from "./interface"

export function getSuccessRedirectWithParams(
  params: Record<string, string>,
): string {
  const redirectPath = "/landing/subscribed"
  const paramString = Object.entries(params)
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(value)}`,
    )
    .join("&")

  return `${process.env.ILLA_CLOUD_URL}${redirectPath}?${paramString}`
}

export const handleCollaPurchaseError = (
  e: unknown,
  modalType: CollarModalType,
) => {
  const payErrorModal = createPayErrorModal()
  if (
    isILLAAPiError(e) &&
    (e.data.errorFlag === ERROR_FLAG.ERROR_FLAG_INSUFFICIENT_COLLA ||
      e.data.errorFlag === ERROR_FLAG.ERROR_FLAG_INSUFFICIENT_DRIVE_VOLUME ||
      e.data.errorFlag ===
        ERROR_FLAG.ERROR_FLAG_INSUFFICIENT_AI_TOKEN_GENERAL ||
      e.data.errorFlag === ERROR_FLAG.ERROR_FLAG_AUTO_CHARGE_COLLA_FAILED ||
      e.data.errorFlag === ERROR_FLAG.ERROR_FLAG_INSUFFICIENT_DRIVE_TRAFFIC)
  ) {
    payErrorModal?.({
      modalType,
    })
    return true
  }
  return false
}
