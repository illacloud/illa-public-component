import { USER_ROLE } from "@illa-public/user-data"

export interface InviteByEmailProps {
  defaultInviteUserRole: USER_ROLE
  defaultBalance: number
  teamID: string
  currentUserRole: USER_ROLE
  onBalanceChange: (balance: number) => void
  redirectUrl: string
}

export interface InvitedUser {
  email: string
  teamMemberID: string
  userRole: USER_ROLE
}