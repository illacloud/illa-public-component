import { USER_ROLE } from "@illa-public/public-types"
import { ShareBlockProps } from "../ShareBlock/interface"

export interface AgentToMarketplaceProps
  extends Pick<ShareBlockProps, "onShare" | "title"> {
  agentID: string
  defaultAgentContributed: boolean
  onAgentContributed: (isAgentContributed: boolean) => void
  onCopyAgentMarketLink: (agentLink: string) => void
  userRoleForThisAgent: USER_ROLE
  ownerTeamID: string
}
