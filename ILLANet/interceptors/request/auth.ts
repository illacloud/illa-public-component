import { getAuthToken } from "@illa-public/utils"
import { InternalAxiosRequestConfig } from "axios"

export const authInterceptor = (config: InternalAxiosRequestConfig) => {
  const token = getAuthToken()
  if (typeof token === "string") {
    config.headers.Authorization = token
  }
  return config
}
