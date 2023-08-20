import { USER_ROLE } from "@illa-public/user-data"

export interface ToMarketplaceProps {
  ownerTeamIdentify: string
  agentID: string
  defaultAgentContributed: boolean
  onAgentContributed: (isAgentContributed: boolean) => void
  onCopyAgentMarketLink: (agentLink: string) => void
  userRoleForThisAgent: USER_ROLE
}
