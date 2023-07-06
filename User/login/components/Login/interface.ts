import { SubmitHandler } from "react-hook-form"
import {
  LoginErrorMsg,
  LoginFields,
  OAuthURI,
} from "@/illa-public-component/User/login/interface"

export interface LoginProps {
  loading: boolean
  hideOAuth?: boolean
  hideRegister?: boolean
  errorMsg: LoginErrorMsg
  lockedEmail?: string | null
  oAuthURI?: OAuthURI
  onSubmit: SubmitHandler<LoginFields>
  validEventReport?: () => void
}
