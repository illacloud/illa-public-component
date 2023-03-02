import { SubmitHandler } from "react-hook-form"

export interface LoginFields {
  email: string
  password: string
}

export type LoginErrorMsg = Record<keyof LoginFields, string>

export interface LoginPageProps {
  loading: boolean
  errorMsg: LoginErrorMsg
  onSubmit: SubmitHandler<LoginFields>
}
