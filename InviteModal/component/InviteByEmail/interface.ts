import { USER_ROLE } from "@illa-public/user-data"

export interface InviteByEmailProps {
  defaultInviteUserRole: USER_ROLE
  teamID: string
  currentUserRole: USER_ROLE
  license: number
}

export interface InvitedUser {
  email: string
  teamMemberID: string
  userRole: USER_ROLE
}