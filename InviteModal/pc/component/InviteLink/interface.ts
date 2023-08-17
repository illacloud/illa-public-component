import { USER_ROLE } from "@illa-public/user-data"

export interface InviteLinkProps {
  defaultInviteUserRole: USER_ROLE
  defaultAllowInviteLink?: boolean
  redirectPage?: string
  onInviteLinkStateChange?: (isInviteLink: boolean) => void
}