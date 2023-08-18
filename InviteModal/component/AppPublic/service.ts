import { marketplaceRequest } from "@illa-public/illa-net"

export const makeAppPublic = (teamID: string, appID: string) => {}

export const makeAppContribute = (teamID: string, appID: string) => {
  return marketplaceRequest<{}>(
    {
      method: "POST",
      url: `products/apps/${appID}`,
    },
    {
      teamID: teamID,
    },
  )
}