import { SubmitHandler } from "react-hook-form"
import { LoginErrorMsg, LoginFields, OAuthURI } from "../../interface"

export interface MobileLoginProps {
  loading: boolean
  errorMsg: LoginErrorMsg
  oAuthURI?: OAuthURI
  hideOAuth?: boolean
  hideRegister?: boolean
  lockedEmail?: string | null
  onSubmit: SubmitHandler<LoginFields>
  validEventReport?: () => void
}
