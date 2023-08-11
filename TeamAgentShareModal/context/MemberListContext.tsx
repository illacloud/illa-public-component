import { createContext } from "react"
import { TeamAgentShareModalProps } from "../index"

interface AgentShareModalContextTypeProps
  extends Pick<
    TeamAgentShareModalProps,
    | "userListData"
    | "currentUserRole"
    | "teamName"
    | "userNickname"
    | "renewInviteLink"
    | "fetchInviteLink"
    | "configInviteLink"
    | "allowInviteByLink"
  > {
  agentName: string
  agentLink: string
}

export const AgentShareModalContext =
  createContext<AgentShareModalContextTypeProps>(
    {} as AgentShareModalContextTypeProps,
  )
