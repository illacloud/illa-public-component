import { InviteByEmailProps } from "../component/InviteByEmail/interface"
import { InviteLinkProps } from "../component/InviteLink/interface"


export interface InviteMemberProps extends InviteByEmailProps, InviteLinkProps {
  onClose: () => void
  canInvite: boolean
}