import {
  marketplaceTeamRequest,
  publicHashtagRequest,
} from "@illa-public/illa-net"
import { HASHTAG_REQUEST_TYPE } from "../../constants"
import { AgentRecommendHashtagResponse } from "../AgentToMarketplace/interface"

export const updateContributeAttr = (
  teamID: string,
  productID: string,
  type: HASHTAG_REQUEST_TYPE,
  hashtags: string[],
) => {
  switch (type) {
    case HASHTAG_REQUEST_TYPE.UNIT_TYPE_AI_AGENT:
      return marketplaceTeamRequest<{}>(
        {
          method: "POST",
          url: `/products/aiAgents/${productID}/recontribute`,
          data: {
            hashtags,
          },
        },
        {
          teamID: teamID,
        },
      )
    case HASHTAG_REQUEST_TYPE.UNIT_TYPE_APP:
      return marketplaceTeamRequest<{}>(
        {
          method: "POST",
          url: `/products/apps/${productID}/recontribute`,
          data: {
            hashtags,
          },
        },
        {
          teamID: teamID,
        },
      )
  }
}

export const fetchRecommendHashtag = (type: HASHTAG_REQUEST_TYPE) => {
  return publicHashtagRequest<AgentRecommendHashtagResponse>({
    method: "GET",
    url: `/defaultHashtagsListFull/unitType/${type}`,
  })
}
