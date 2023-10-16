import { marketplaceTeamRequest } from "@illa-public/illa-net"

export const makeAgentContribute = (
  teamID: string,
  agentID: string,
  hashTags?: string[],
) => {
  return marketplaceTeamRequest<{}>(
    {
      method: "POST",
      url: `/products/aiAgents/${agentID}`,
      data: {
        hashTags,
      },
    },
    {
      teamID: teamID,
    },
  )
}

export const fetchRemoveToMarketplace = (teamID: string, agentID: string) => {
  return marketplaceTeamRequest<{}>(
    {
      method: "DELETE",
      url: `/products/aiAgents/${agentID}`,
    },
    {
      teamID: teamID,
    },
  )
}

export const fetchReMakeAgentContribute = (
  teamID: string,
  agentID: string,
  hashTags?: string[],
) => {
  return marketplaceTeamRequest<{}>(
    {
      method: "POST",
      url: `/products/aiAgents/${agentID}/recontribute`,
      data: {
        hashTags,
      },
    },
    {
      teamID: teamID,
    },
  )
}
