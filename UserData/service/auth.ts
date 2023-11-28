import { HTTP_REQUEST_PUBLIC_BASE_URL } from "@illa-public/illa-net"
import { CurrentUserInfo, TeamInfo } from "@illa-public/public-types"
import { getAuthToken } from "@illa-public/utils"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const authAPI = createApi({
  reducerPath: "authAPI",
  refetchOnFocus: true,
  refetchOnReconnect: true,
  baseQuery: fetchBaseQuery({
    baseUrl: `${HTTP_REQUEST_PUBLIC_BASE_URL}/supervisor/api/v1/`,
    prepareHeaders: (headers) => {
      const urlParams = new URLSearchParams(location.search)
      const token = urlParams.get("token") || getAuthToken()
      if (token) {
        headers.set("Authorization", token)
      }
      return headers
    },
  }),
  endpoints: (builder) => ({
    getUserInfoAndTeamsInfoByToken: builder.query<
      {
        user: CurrentUserInfo
        teams: TeamInfo[]
        currentTeamID: string | undefined
      },
      string | undefined
    >({
      async queryFn(teamIdentifier, _queryAPI, _extraOptions, fetchWithBQ) {
        const userInfoResult = await fetchWithBQ("users")
        if (userInfoResult.error) {
          return {
            error: userInfoResult.error,
          }
        }
        const userInfo = userInfoResult.data as CurrentUserInfo
        const teamInfoResult = await fetchWithBQ("teams/my")
        if (teamInfoResult.error) {
          return {
            error: teamInfoResult.error,
          }
        }
        const teamInfos = teamInfoResult.data as TeamInfo[]
        const currentTeamID = teamInfos.find(
          (info) => info.identifier === teamIdentifier,
        )?.id
        return {
          data: {
            user: userInfo,
            teams: teamInfos,
            currentTeamID,
          },
        }
      },
    }),
  }),
})

export const { useGetUserInfoAndTeamsInfoByTokenQuery } = authAPI
