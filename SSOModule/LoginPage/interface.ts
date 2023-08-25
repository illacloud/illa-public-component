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
  onSubmit: SubmitHandler<LoginFields>
}

// onSubmit,
//   errorMsg,
//   loading,
//   oAuthURI,
//   lockedEmail,
//   hideOAuth,
//   hideRegister,
export interface loginProps extends LoginPageProps {
  lockedEmail?: string | null
}
