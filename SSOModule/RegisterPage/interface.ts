import { SubmitHandler } from "react-hook-form"

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
  errorMsg: RegisterErrorMsg
  hideOAuth?: boolean
  onSubmit: SubmitHandler<RegisterFields>
  sendEmail: (email: string) => void
}

export interface RegisterProps extends RegisterPageProps {
  showCountDown: boolean
  lockedEmail?: string | null
  onCountDownChange: (showCountDown: boolean) => void
}
