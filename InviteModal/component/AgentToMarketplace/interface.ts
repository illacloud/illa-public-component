import { USER_ROLE } from "@illa-public/user-data"

export interface AgentToMarketplaceProps {
  agentID: string
  defaultAgentContributed: boolean
  onAgentContributed: (isAgentContributed: boolean) => void
  onCopyAgentMarketLink: (agentLink: string) => void
  userRoleForThisAgent: USER_ROLE
  ownerTeamID: string
}
