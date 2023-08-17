import { authCloudRequest } from "@illa-public/illa-net"
import { USER_ROLE } from "@illa-public/user-data"


export interface InviteLinkResp {
  inviteLink: string
}

export const getInviteLink = (
  teamID: string,
  userRole: USER_ROLE,
  redirectPage?: string,
  signal?: AbortSignal,
) => {
  return authCloudRequest<InviteLinkResp>(
    {
      url: `/inviteLink/userRole/${userRole}`,
      method: "GET",
      signal: signal,
    },
    {
      teamID: teamID,
    },
  )
}

export const renewInviteLink = (teamID: string, userRole: USER_ROLE, redirectPage?: string) => {
  return authCloudRequest<InviteLinkResp>(
    {
      url: `/newInviteLink/userRole/${userRole}`,
      method: "GET",
      data: {
        redirectPage: redirectPage,
      },
    },
    {
      teamID: teamID,
    },
  )
}

export const enableInviteLink = (teamID: string) => {
  return authCloudRequest(
    {
      method: "PATCH",
      url: `/configInviteLink`,
      data: {
        inviteLinkEnabled: true,
      }
    },
    {
      teamID: teamID,
    },
  )
}

export const disableInviteLink = (teamID: string) => {
  return authCloudRequest(
    {
      method: "PATCH",
      url: `/configInviteLink`,
      data: {
        inviteLinkEnabled: false,
      }
    },
    {
      teamID: teamID,
    },
  )
}