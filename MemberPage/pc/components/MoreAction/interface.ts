import { USER_ROLE, USER_STATUS } from "@illa-public/user-data"

export interface MoreActionProps {
  currentUserRole: USER_ROLE
  userRole: USER_ROLE
  userStatus: USER_STATUS
  userID: string
  teamMemberID: string
  currentUserID: string
  changeTeamMembersRole: (userID: string, userRole: USER_ROLE) => Promise<void>
  name: string
  email: string
  teamID: string
}
