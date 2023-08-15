import { MemberListProps } from "@illa-public/member-list"

export type DefaultTabType = "share" | "contribute"
export interface TeamAgentShareModalProps
  extends Pick<
    MemberListProps,
    | "inviteByEmail"
    | "changeTeamMembersRole"
    | "userListData"
    | "currentUserRole"
    | "teamName"
    | "userNickname"
    | "renewInviteLink"
    | "fetchInviteLink"
    | "configInviteLink"
    | "allowInviteByLink"
  > {
  defaultTab?: DefaultTabType
  agentName: string
  agentLink: string
  publishedToMarketplace: boolean
  visible: boolean
  onCancel: () => void

  contributeToMarketplace: (value: boolean) => Promise<unknown>
}

export type TabsConfig = { hidden: boolean; id: string; label: string }[]
export interface TeamAgentSharePCModalProps
  extends Pick<
    TeamAgentShareModalProps,
    | "visible"
    | "inviteByEmail"
    | "onCancel"
    | "changeTeamMembersRole"
    | "publishedToMarketplace"
  > {
  activeTab: DefaultTabType
  onChangeTab: (currentTabId: DefaultTabType) => void
  loading: boolean
  tabsConfig: TabsConfig
  onContributed?: (value: boolean) => void
}
