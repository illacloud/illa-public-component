import { USER_ROLE } from "@illa-public/user-data"
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

export interface AgentHashtagDetail {
  id: string
  unitType: number
  serial: number
  hashtagID: string
  hashtagName: string
  hashtagAmount: number
}
export interface AgentRecommendHashtagResponse {
  hashtags: AgentHashtagDetail[]
}
