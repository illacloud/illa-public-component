import { actionRequest } from "@illa-public/illa-net"
import { ResourceContent, ResourceType } from "@illa-public/public-types"

interface IActionTestConnectionRequestData {
  resourceID: string
  resourceName: string
  resourceType: ResourceType
  content: ResourceContent
}

export const fetchActionTestConnection = (
  teamID: string,
  data: IActionTestConnectionRequestData,
) => {
  return actionRequest<null>(
    { url: "/resources/testConnection", method: "POST", data },
    {
      teamID,
    },
  )
}
