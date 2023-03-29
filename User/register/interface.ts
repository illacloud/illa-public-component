import { SubmitHandler } from "react-hook-form"
import { OAuthURI } from "@/illa-public-component/User/login/interface"

export interface RegisterFields {
  nickname: string
  email: string
  verificationCode: string
  password: string
  isSubscribed: boolean
}

export type RegisterErrorMsg = Partial<Record<keyof RegisterFields, string>>

export interface RegisterPageProps {
  loading: boolean
  oAuthURI: OAuthURI
  errorMsg: RegisterErrorMsg
  onSubmit: SubmitHandler<RegisterFields>
  sendEmail: (email: string, usage: "signup" | "forgetpwd") => Promise<string>
}
