import { authCloudRequest } from "@illa-public/illa-net"
import { USER_ROLE } from "@illa-public/user-data"

export const fetchRemoveTeamMember = (
  currentTeamID: string,
  teamMemberID: string,
) => {
  return authCloudRequest(
    {
      method: "DELETE",
      url: `/teamMembers/${teamMemberID}`,
    },
    {
      teamID: currentTeamID,
    },
  )
}

export const fetchChangeTeamMemberRole = (
  currentTeamID: string,
  teamMemberID: string,
  userRole: USER_ROLE,
) => {
  return authCloudRequest(
    {
      method: "PATCH",
      url: `/teamMembers/${teamMemberID}/role`,
      data: {
        userRole,
      },
    },
    {
      teamID: currentTeamID,
    },
  )
}
