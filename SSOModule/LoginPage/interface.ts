import { SubmitHandler } from "react-hook-form"
import { OAuthURI } from "../interface"

export interface LoginFields {
  email: string
  password: string
}

export type LoginErrorMsg = Record<keyof LoginFields, string>

export interface LoginPageProps {
  loading: boolean
  errorMsg: LoginErrorMsg
  oAuthURI?: OAuthURI
  hideOAuth?: boolean
  hideRegister?: boolean
  lockedEmail?: string | null
  onSubmit: SubmitHandler<LoginFields>
}
