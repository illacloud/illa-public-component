import { SubmitHandler } from "react-hook-form"

export interface ResetPwdFields {
  email: string
  verificationCode: string
  newPassword: string
}

export type ResetPwdErrorMsg = Partial<Record<keyof ResetPwdFields, string>>

export interface ResetPasswordPageProps {
  loading: boolean
  errorMsg: ResetPwdErrorMsg
  onSubmit: SubmitHandler<ResetPwdFields>
  sendEmail: (email: string) => Promise<string>
}

export interface ResetProps extends ResetPasswordPageProps {
  resetLabel?: string
  lockedEmail?: string | null
  hideNav?: boolean
  showCountDown: boolean
  onCountDownChange: (showCountDown: boolean) => void
  validEventReport?: () => void
}
