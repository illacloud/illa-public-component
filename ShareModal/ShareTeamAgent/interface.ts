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
