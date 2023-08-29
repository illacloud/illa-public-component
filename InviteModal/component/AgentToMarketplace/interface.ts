import { USER_ROLE } from "@illa-public/user-data"
import { ShareBlockProps } from "../ShareBlock/interface"

export interface AgentToMarketplaceProps
  extends Pick<ShareBlockProps, "onShare"> {
  agentID: string
  defaultAgentContributed: boolean
  onAgentContributed: (isAgentContributed: boolean) => void
  onCopyAgentMarketLink: (agentLink: string) => void
  userRoleForThisAgent: USER_ROLE
  ownerTeamID: string
}
