import { SubmitHandler } from "react-hook-form"
import {
  LoginErrorMsg,
  LoginFields,
  OAuthURI,
} from "@/illa-public-component/User/login/interface"

export interface MobileLoginProps {
  loading: boolean
  errorMsg: LoginErrorMsg
  oAuthURI: OAuthURI
  onSubmit: SubmitHandler<LoginFields>
}
