import {marketplaceRequest} from "@illa-public/illa-net";

export const makeAgentContribute = (teamID: string, agentID: string) => {
  return marketplaceRequest<{}>(
    {
      method: "POST",
      url: `/aiagents/${agentID}`,
    },
    {
      teamID: teamID,
    },
  )
}