import { SubmitHandler } from "react-hook-form"

export interface LoginFields {
  email: string
  password: string
}

export type LoginErrorMsg = Record<keyof LoginFields, string>

export interface LoginPageProps {
  loading: boolean
  errorMsg: LoginErrorMsg
  hideOAuth?: boolean
  hideRegister?: boolean
  onSubmit: SubmitHandler<LoginFields>
}

export interface loginProps extends LoginPageProps {
  lockedEmail?: string | null
}
