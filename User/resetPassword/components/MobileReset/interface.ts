import { SubmitHandler } from "react-hook-form"
import {
  ResetPwdErrorMsg,
  ResetPwdFields,
} from "@/illa-public-component/User/resetPassword/interface"

export interface MobileResetProps {
  loading: boolean
  errorMsg: ResetPwdErrorMsg
  onSubmit: SubmitHandler<ResetPwdFields>
  showCountDown: boolean
  onCountDownChange: (showCountDown: boolean) => void
  sendEmail: (email: string, usage: "signup" | "forgetpwd") => Promise<string>
}
