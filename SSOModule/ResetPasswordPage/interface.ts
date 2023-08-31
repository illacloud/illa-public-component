import { SubmitHandler } from "react-hook-form"

export interface ResetPwdFields {
  email: string
  verificationCode: string
  newPassword: string
}

export type ResetPwdErrorMsg = Partial<Record<keyof ResetPwdFields, string>>

export interface ResetPasswordPageProps {
  resetLabel?: string
  hideNav?: boolean
  loading: boolean
  errorMsg: ResetPwdErrorMsg
  onSubmit: SubmitHandler<ResetPwdFields>
  sendEmail: (email: string) => void
}

export interface ResetProps extends ResetPasswordPageProps {
  showCountDown: boolean
  onCountDownChange: (showCountDown: boolean) => void
  validEventReport?: () => void
  lockedEmail?: string | null
}
