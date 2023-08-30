import { AxiosResponse } from "axios"
import { ILLAApiError } from "./interface"

export const isILLAAPiError = (
  error: unknown,
): error is AxiosResponse<ILLAApiError> => {
  return (
    typeof error === "object" &&
    error !== null &&
    "data" in error &&
    typeof error.data === "object" &&
    error.data !== null &&
    "errorCode" in error.data &&
    "errorMessage" in error.data &&
    typeof error.data.errorMessage === "string"
  )
}
