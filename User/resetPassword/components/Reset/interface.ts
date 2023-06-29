import { SubmitHandler } from "react-hook-form"
import {
  ResetPwdErrorMsg,
  ResetPwdFields,
} from "@/illa-public-component/User/resetPassword/interface"

export interface ResetProps {
  loading: boolean
  errorMsg: ResetPwdErrorMsg
  onSubmit: SubmitHandler<ResetPwdFields>
  lockedEmail?: string | null
  hideNav?: boolean
  showCountDown: boolean
  onCountDownChange: (showCountDown: boolean) => void
  sendEmail: (email: string, usage: "signup" | "forgetpwd") => Promise<string>
  validEventReport?: () => void
}
