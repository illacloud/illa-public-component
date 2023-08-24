import { authCloudRequest } from "@illa-public/illa-net"
import { USER_ROLE } from "@illa-public/user-data"
import { InvitedUser } from "./interface"

export const inviteByEmail = (
  teamID: string,
  email: string,
  userRole: USER_ROLE,
  redirectUrl: string,
) => {
  return authCloudRequest<InvitedUser>(
    {
      method: "POST",
      url: `/inviteByEmail`,
      data: {
        email: email,
        userRole: userRole,
        redirectUrl: encodeURIComponent(redirectUrl),
      },
    },
    {
      teamID: teamID,
    },
  )
}

export const changeUserRoleByTeamMemberID = (
  teamID: string,
  teamMemberID: string,
  userRole: USER_ROLE,
) => {
  return authCloudRequest<InvitedUser>(
    {
      method: "PATCH",
      url: `/teamMembers/${teamMemberID}/role`,
      data: {
        userRole: userRole,
      },
    },
    {
      teamID: teamID,
    },
  )
}
