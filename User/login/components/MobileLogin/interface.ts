import { SubmitHandler } from "react-hook-form"
import { LoginErrorMsg } from "@/illa-public-component/User/login"
import { LoginFields } from "@/illa-public-component/User/login/interface"

export interface MobileLoginProps {
  loading: boolean
  errorMsg: LoginErrorMsg
  onSubmit: SubmitHandler<LoginFields>
}
