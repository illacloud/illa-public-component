import { builderRequest, marketplaceTeamRequest } from "@illa-public/illa-net"

export const updateAppContribute = (
  teamID: string,
  productID: string,
  hashtags: string[],
) => {
  return marketplaceTeamRequest<{}>(
    {
      method: "POST",
      url: `/products/apps/${productID}/recontribute?property=hashtags`,
      data: {
        hashtags,
      },
    },
    {
      teamID: teamID,
    },
  )
}

export const updateAppConfig = async (
  appID: string,
  teamID: string,
  config: {
    description?: string
    appName?: string
  },
) => {
  return builderRequest<{}>(
    {
      method: "PATCH",
      url: `/apps/${appID}/config`,
      data: config,
    },
    {
      teamID: teamID,
    },
  )
}

export const contributeAppWithHashtags = (
  teamID: string,
  productID: string,
  hashtags: string[],
) => {
  return marketplaceTeamRequest<{}>(
    {
      method: "POST",
      url: `/products/apps/${productID}/recontributeWith?property=hashtags`,
      data: {
        hashtags,
      },
    },
    {
      teamID: teamID,
    },
  )
}