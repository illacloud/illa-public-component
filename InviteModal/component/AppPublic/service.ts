import { builderRequest, marketplaceTeamRequest } from "@illa-public/illa-net"

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
