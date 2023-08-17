import { HTMLAttributes } from "react"
import { MemberListCommonProps } from "@/illa-public-component/MobileMember/MemberListMobile/interface"

export interface InviteByLinkProps
  extends HTMLAttributes<HTMLDivElement>,
    Pick<
      MemberListCommonProps,
      | "fetchInviteLink"
      | "configInviteLink"
      | "currentUserRole"
      | "teamName"
      | "userNickname"
    > {
  inviteLinkEnabled?: boolean
}

export interface InviteByEmailProps
  extends Pick<
    MemberListCommonProps,
    | "currentUserRole"
    | "userListData"
    | "inviteByEmail"
    | "changeTeamMembersRole"
  > {
  closeInviteModal?: () => void
  autoHeight?: boolean
}
