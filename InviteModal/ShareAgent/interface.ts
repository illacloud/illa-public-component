import { AgentToMarketplaceProps } from "../component/AgentToMarketplace/interface"
import { InviteByEmailProps } from "../component/InviteByEmail/interface"
import { InviteLinkProps } from "../component/InviteLink/interface"


export interface ShareAgentProps
  extends InviteByEmailProps,
    InviteLinkProps,
    AgentToMarketplaceProps {
  onClose?: () => void
  canInvite: boolean
  defaultTab: ShareAgentTab
}

export enum ShareAgentTab {
  SHARE_WITH_TEAM = "SHARE_WITH_TEAM",
  TO_MARKETPLACE = "TO_MARKETPLACE",
}