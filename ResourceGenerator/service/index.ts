import { actionRequest, agentRequest } from "@illa-public/illa-net"
import { Agent, ResourceContent, ResourceType } from "@illa-public/public-types"

export interface IActionTestConnectionRequestData {
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

export const forkAIAgentToTeam = (teamID: string, aiAgentID: string) => {
  return agentRequest<Agent>({
    url: `/aiAgent/${aiAgentID}/forkTo/teams/${teamID}`,
    method: "POST",
  })
}

export interface TeamAgentListData {
  aiAgentList: Agent[]
  totalAIAgentCount: number
  totalPages: number
}

export const fetchTeamAgentListByPage = (
  teamID: string,
  page: number,
  keywords: string = "",
  signal?: AbortSignal,
) => {
  return agentRequest<TeamAgentListData>(
    {
      url: keywords
        ? `/aiAgent/list/limit/10/page/${page}/sortBy/id/like/keywords/${keywords}`
        : `/aiAgent/list/limit/10/page/${page}/sortBy/id`,
      method: "GET",
      signal,
    },
    {
      teamID: teamID,
    },
  )
}
