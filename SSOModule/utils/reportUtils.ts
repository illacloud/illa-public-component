import {
  ILLAMixpanel,
  ILLA_MIXPANEL_EVENT_TYPE,
  ILLA_MIXPANEL_PUBLIC_PAGE_NAME,
  ILLA_PAGE_NAME,
} from "@illa-public/mixpanel-utils"
import { FieldErrors } from "react-hook-form"
import { LoginFields } from "../LoginPage/interface"
import { RegisterFields } from "../RegisterPage/interface"
import { ResetPwdFields } from "../ResetPasswordPage/interface"

export const validateReport = (
  page: ILLA_PAGE_NAME,
  element: string,
  isValid: boolean,
  errors: FieldErrors<RegisterFields & LoginFields & ResetPwdFields>,
) => {
  if (isValid) {
    ILLAMixpanel.track(ILLA_MIXPANEL_EVENT_TYPE.VALIDATE, {
      page,
      element,
      parameter2: "suc",
    })
    return
  }
  const { email, password, nickname, verificationCode, newPassword } = errors
  const errorList = []
  if (page === ILLA_MIXPANEL_PUBLIC_PAGE_NAME.SIGNUP) {
    if (nickname) {
      if (nickname.type === "required") {
        errorList.push("username_blank")
      } else if (nickname.type === "minLength") {
        errorList.push("username_short")
      } else if (nickname.type === "maxLength") {
        errorList.push("username_long")
      }
    }
  }

  if (
    page === ILLA_MIXPANEL_PUBLIC_PAGE_NAME.SIGNUP ||
    page === ILLA_MIXPANEL_PUBLIC_PAGE_NAME.FORGET_PASSWORD
  ) {
    if (verificationCode && verificationCode.type === "required") {
      errorList.push("verification_code_blank")
    }
  }
  if (email && email.type === "required") {
    errorList.push("email_blank")
  } else if (email && (email.type === "validate" || email.type === "pattern")) {
    errorList.push("invalid_email")
  }

  if (
    (password && password.type === "required") ||
    (newPassword && newPassword.type === "required")
  ) {
    errorList.push("password_blank")
  } else if (
    (password && password.type === "minLength") ||
    (newPassword && newPassword.type === "minLength")
  ) {
    errorList.push("password_short")
  }

  if (!isValid) {
    ILLAMixpanel.track(ILLA_MIXPANEL_EVENT_TYPE.VALIDATE, {
      page,
      element,
      parameter2: "failed",
      parameter3: errorList,
    })
  }
}
