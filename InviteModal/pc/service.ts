import { authCloudRequest } from "@illa-public/illa-net"
import { USER_ROLE } from "@illa-public/user-data"


export interface InviteLinkResp {
  inviteLink: string
}

export const getInviteLink = (teamID: string, userRole: USER_ROLE) => {
  return authCloudRequest<InviteLinkResp>({
    url: `/inviteLink/userRole/${userRole}`,
    method: "GET",
  })
}

export const renewInviteLink = (signal?: AbortSignal) => {}