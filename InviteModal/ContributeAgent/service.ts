import { marketplaceTeamRequest } from "@illa-public/illa-net"

export const updateAgentContribute = (
  teamID: string,
  productID: string,
  hashtags: string[],
) => {
  return marketplaceTeamRequest<{}>(
    {
      method: "POST",
      url: `/products/aiAgents/${productID}/updatePropertyWith?property=hashtags`,
      data: {
        hashtags,
      },
    },
    {
      teamID: teamID,
    },
  )
}

export const contributeAgentWithHashtags = (
  teamID: string,
  productID: string,
  hashtags: string[],
) => {
  return marketplaceTeamRequest<{}>(
    {
      method: "POST",
      url: `/products/aiAgents/${productID}/recontributeWith?property=hashtags`,
      data: {
        hashtags,
      },
    },
    {
      teamID: teamID,
    },
  )
}
