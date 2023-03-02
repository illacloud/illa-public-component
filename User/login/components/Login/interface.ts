import { SubmitHandler } from "react-hook-form"
import {
  LoginErrorMsg,
  LoginFields,
} from "@/illa-public-component/User/login/interface"

export interface LoginProps {
  loading: boolean
  errorMsg: LoginErrorMsg
  onSubmit: SubmitHandler<LoginFields>
}
