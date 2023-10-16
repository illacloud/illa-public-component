import {
  builderRequest,
  marketplaceTeamRequest,
  publicHashtagRequest,
} from "@illa-public/illa-net"
import { HASHTAG_REQUEST_TYPE } from "../../constants"
import { AppRecommendHashtagResponse } from "./interface"

export const updateAppPublicConfig = async (
  isPublic: boolean,
  teamID: string,
  appID: string,
) => {
  await builderRequest<{}>(
    {
      method: "PATCH",
      url: `/apps/${appID}/config`,
      data: {
        public: isPublic,
      },
    },
    {
      teamID: teamID,
    },
  )
  return true
}

export const makeAppContribute = (
  teamID: string,
  appID: string,
  hashtags?: string[],
) => {
  return marketplaceTeamRequest<{}>(
    {
      method: "POST",
      url: `/products/apps/${appID}`,
      data: {
        hashtags,
      },
    },
    {
      teamID: teamID,
    },
  )
}

export const fetchRemoveAppToMarket = (teamID: string, appID: string) => {
  return marketplaceTeamRequest<{}>(
    {
      method: "DELETE",
      url: `/products/apps/${appID}`,
    },
    {
      teamID: teamID,
    },
  )
}

export const fetchReMakeAppContribute = (
  teamID: string,
  appID: string,
  hashtags?: string[],
) => {
  return marketplaceTeamRequest<{}>(
    {
      method: "POST",
      url: `/products/apps/${appID}/recontribute`,
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
  return publicHashtagRequest<AppRecommendHashtagResponse>({
    method: "GET",
    url: `/defaultHashtagsListFull/unitType/${HASHTAG_REQUEST_TYPE.UNIT_TYPE_APP}`,
  })
}
