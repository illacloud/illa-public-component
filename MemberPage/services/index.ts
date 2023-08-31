import { authCloudRequest } from "@illa-public/illa-net"
import { TeamInfo } from "@illa-public/user-data"

export const fetchCurrentUserTeamsInfo = () => {
  return authCloudRequest<TeamInfo[]>({
    url: "/teams/my",
    method: "GET",
  })
}
