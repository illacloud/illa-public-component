import { SUBSCRIBE_PLAN } from "@illa-public/public-types"
import { AgentToMarketplaceProps } from "../component/AgentToMarketplace/interface"
import { InviteByEmailProps } from "../component/InviteByEmail/interface"
import { InviteLinkProps } from "../component/InviteLink/interface"

export interface ShareAgentProps
  extends Omit<InviteByEmailProps, "excludeUserRole">,
    Omit<InviteLinkProps, "excludeUserRole">,
    AgentToMarketplaceProps {
  onClose: () => void
  canInvite: boolean
  teamPlan: SUBSCRIBE_PLAN
  canUseBillingFeature: boolean
  defaultTab?: ShareAgentTab
}

export enum ShareAgentTab {
  SHARE_WITH_TEAM = "SHARE_WITH_TEAM",
  TO_MARKETPLACE = "TO_MARKETPLACE",
}
