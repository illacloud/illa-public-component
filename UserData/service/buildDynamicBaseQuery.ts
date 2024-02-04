import { HTTP_REQUEST_PUBLIC_BASE_URL } from "@illa-public/illa-net"
import { getAuthToken } from "@illa-public/utils"
import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query"
import { RootState } from "../store"
import { getCurrentId } from "../team"

export const buildDynamicBaseQuery = (
  prefix: string,
): BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> => {
  return async (args, api, extraOptions) => {
    const state = api.getState() as RootState
    const currentTeamID = getCurrentId(state)!

    if (!currentTeamID) {
      return {
        error: {
          status: 400,
          statusText: "Bad Request",
          data: "No Team ID received",
        },
      }
    }

    const urlEnd = typeof args === "string" ? args : args.url
    const adjustedUrl = `/${currentTeamID}${urlEnd}`

    const adjustedArgs =
      typeof args === "string" ? adjustedUrl : { ...args, url: adjustedUrl }

    return fetchBaseQuery({
      baseUrl: `${HTTP_REQUEST_PUBLIC_BASE_URL}${prefix}/teams`,
      prepareHeaders: (headers) => {
        const token = getAuthToken()
        if (token) {
          headers.set("Authorization", token)
        }
        return headers
      },
    })(adjustedArgs, api, extraOptions)
  }
}
