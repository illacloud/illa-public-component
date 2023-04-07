import { SubmitHandler } from "react-hook-form"
import { OAuthURI } from "@/illa-public-component/User/login/interface"
import {
  RegisterErrorMsg,
  RegisterFields,
} from "@/illa-public-component/User/register/interface"

export interface RegisterProps {
  lockedEmail?: string | null
  loading: boolean
  errorMsg: RegisterErrorMsg
  oAuthURI?: OAuthURI
  onSubmit: SubmitHandler<RegisterFields>
  showCountDown: boolean
  onCountDownChange: (showCountDown: boolean) => void
  sendEmail: (email: string, usage: "signup" | "forgetpwd") => Promise<string>
}
