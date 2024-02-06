import { authCloudRequest } from "@illa-public/illa-net"
import { USER_ROLE } from "@illa-public/public-types"

export interface InviteLinkResp {
  inviteLink: string
}

export const getInviteLink = (
  teamID: string,
  userRole: USER_ROLE,
  redirectURL: string,
  customDomain?: string,
  signal?: AbortSignal,
) => {
  let requestURL = `/inviteLink/userRole/${userRole}`
  if (redirectURL) {
    requestURL += `?redirectURL=${encodeURIComponent(redirectURL)}`
  }
  if (customDomain) {
    if (redirectURL) {
      requestURL += `&customDomain=${customDomain}`
    } else {
      requestURL += `?customDomain=${customDomain}`
    }
  }

  return authCloudRequest<InviteLinkResp>(
    {
      url: requestURL,
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
  redirectURL: string,
  userRole: USER_ROLE,
  customDomain?: string,
) => {
  let requestURL = `/inviteLink/userRole/${userRole}`
  if (redirectURL) {
    requestURL += `?redirectURL=${encodeURIComponent(redirectURL)}`
  }
  if (customDomain) {
    if (redirectURL) {
      requestURL += `&customDomain=${customDomain}`
    } else {
      requestURL += `?customDomain=${customDomain}`
    }
  }
  return authCloudRequest<InviteLinkResp>(
    {
      url: requestURL,
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
