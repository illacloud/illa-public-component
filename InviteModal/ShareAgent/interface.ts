import { InviteByEmailProps } from "../component/InviteByEmail/interface"
import { InviteLinkProps } from "../component/InviteLink/interface"
import { ToMarketplaceProps } from "../component/ToMarketplace/interface"

export interface ShareAgentProps
  extends InviteByEmailProps,
    InviteLinkProps,
    ToMarketplaceProps {
  onClose?: () => void
  canInvite: boolean
  defaultTab: ShareAgentTab
}

export enum ShareAgentTab {
  SHARE_WITH_TEAM = "SHARE_WITH_TEAM",
  TO_MARKETPLACE = "TO_MARKETPLACE",
}
