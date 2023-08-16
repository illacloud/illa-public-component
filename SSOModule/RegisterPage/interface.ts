import { SubmitHandler } from "react-hook-form"
import { OAuthURI } from "../interface"

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
  oAuthURI?: OAuthURI
  errorMsg: RegisterErrorMsg
  onSubmit: SubmitHandler<RegisterFields>
  sendEmail: (email: string) => Promise<string>
  lockedEmail?: string | null
}

export interface RegisterProps extends RegisterPageProps {
  showCountDown: boolean
  onCountDownChange: (showCountDown: boolean) => void
}
