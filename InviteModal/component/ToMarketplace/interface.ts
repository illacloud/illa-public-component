import { USER_ROLE } from "@illa-public/user-data"

export interface ToMarketplaceProps {
  teamIdentify: string
  agentID: string
  defaultAgentContributed: boolean
  onAgentContributed: (isAgentContributed: boolean) => void
  onCopyAgentMarketLink: (agentLink: string) => void
  currentUserRole: USER_ROLE
}