import { SubmitHandler } from "react-hook-form"
import {
  LoginErrorMsg,
  LoginFields,
} from "@/illa-public-component/User/login/interface"

export interface MobileLoginProps {
  loading: boolean
  errorMsg: LoginErrorMsg
  onSubmit: SubmitHandler<LoginFields>
}
