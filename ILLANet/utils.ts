import { isIllaErrorInterface } from "@illa-public/utils"
import { AxiosResponse } from "axios"
import { ILLAApiError } from "./interface"

export const isILLAAPiError = (
  error: unknown,
): error is AxiosResponse<ILLAApiError> => {
  return (
    typeof error === "object" &&
    error !== null &&
    "data" in error &&
    isIllaErrorInterface(error.data)
  )
}
