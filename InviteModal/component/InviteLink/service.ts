import { authCloudRequest } from "@illa-public/illa-net"
import { USER_ROLE } from "@illa-public/user-data"


export interface InviteLinkResp {
  inviteLink: string
}

export const getInviteLink = (
  teamID: string,
  userRole: USER_ROLE,
  redirectUrl: string,
  signal?: AbortSignal,
) => {
  return authCloudRequest<InviteLinkResp>(
    {
      url: `/inviteLink/userRole/${userRole}?redirectUrl=${encodeURIComponent(
        redirectUrl,
      )}`,
      method: "GET",
      signal: signal,
    },
    {
      teamID: teamID,
    },
  )
}

export const renewInviteLink = (
  teamID: string,
  redirectUrl: string,
  userRole: USER_ROLE,
) => {
  return authCloudRequest<InviteLinkResp>(
    {
      url: `/newInviteLink/userRole/${userRole}?redirectUrl=${encodeURIComponent(
        redirectUrl,
      )}`,
      method: "GET",
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
      },
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
      },
    },
    {
      teamID: teamID,
    },
  )
}