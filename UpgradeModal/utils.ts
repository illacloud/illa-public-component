import { ERROR_FLAG, ILLAApiError, isILLAAPiError } from "@illa-public/illa-net"
import { createCollarModal, createPayErrorModal } from "./hook"
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
  const collarModal = createCollarModal()
  const payErrorModal = createPayErrorModal()
  if (
    isILLAAPiError(e) &&
    e.data.errorFlag === ERROR_FLAG.ERROR_COLLA_UNSUBSCRIBE
  ) {
    collarModal?.({
      modalType,
    })
    return true
  } else if (
    isILLAAPiError(e) &&
    e.data.errorFlag === ERROR_FLAG.ERROR_COLLA_PAY_FAILED
  ) {
    payErrorModal?.({
      modalType,
    })
    return true
  }
  return false
}
