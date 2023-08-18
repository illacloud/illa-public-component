import { USER_ROLE } from "@illa-public/user-data"

export interface InviteLinkProps {
  defaultInviteUserRole: USER_ROLE
  defaultAllowInviteLink: boolean
  teamID: string
  currentUserRole: USER_ROLE
  onInviteLinkStateChange: (isInviteLink: boolean) => void
  onCopyInviteLink: (inviteLink: string) => void
}