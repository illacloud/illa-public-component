import {
  marketplaceTeamRequest,
  publicHashtagRequest,
  publicMarketplaceRequest,
} from "@illa-public/illa-net"
import { MarketAIAgent } from "@illa-public/market-agent"
import { ProductMarketApp } from "@illa-public/market-app"
import { HASHTAG_REQUEST_TYPE } from "../../constants"

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
  return publicHashtagRequest<{
    hashtags: string[]
  }>({
    method: "GET",
    url: `/defaultHashtagsList/unitType/${type}`,
  })
}

export const fetchAppDetailInfoByAppID = (appID: string) => {
  return publicMarketplaceRequest<ProductMarketApp>({
    method: "GET",
    url: `/apps/${appID}`,
  })
}

export const fetchAgentDetailInfoByAgentID = (aiAgentID: string) => {
  return publicMarketplaceRequest<MarketAIAgent>({
    method: "GET",
    url: `/aiAgents/${aiAgentID}`,
  })
}
