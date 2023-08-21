import { marketplaceTeamRequest } from "@illa-public/illa-net"

export const makeAgentContribute = (teamID: string, agentID: string) => {
  return marketplaceTeamRequest<{}>(
    {
      method: "POST",
      url: `/products/aiAgents/${agentID}`,
    },
    {
      teamID: teamID,
    },
  )
}