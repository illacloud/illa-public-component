import { InviteByEmailProps } from "../component/InviteByEmail/interface"
import { InviteLinkProps } from "../component/InviteLink/interface"


export interface InviteMemberProps
  extends Omit<InviteByEmailProps, "excludeUserRole">,
    Omit<InviteLinkProps, "excludeUserRole"> {
  onClose: () => void
  canInvite: boolean
}