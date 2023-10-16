import {
  marketplaceTeamRequest,
  publicHashtagRequest,
} from "@illa-public/illa-net"
import { HASHTAG_REQUEST_TYPE } from "../../constants"
import { AgentRecommendHashtagResponse } from "./interface"

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

export const updateContributeAttr = (
  teamID: string,
  agentID: string,
  hashtags?: string[],
) => {
  return marketplaceTeamRequest<{}>(
    {
      method: "POST",
      url: `/products/aiAgents/${agentID}/recontribute`,
      data: {
        hashtags,
      },
    },
    {
      teamID: teamID,
    },
  )
}

export const fetchRecommendHashTag = () => {
  return publicHashtagRequest<AgentRecommendHashtagResponse>({
    method: "GET",
    url: `/defaultHashtagsListFull/unitType/${HASHTAG_REQUEST_TYPE.UNIT_TYPE_AI_AGENT}`,
  })
}
