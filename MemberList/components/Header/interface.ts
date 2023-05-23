import { ReactNode } from "react"
import {
  MemberListProps,
  inviteByEmailResponse,
} from "@/illa-public-component/MemberList/interface"
import { USER_ROLE } from "@/illa-public-component/UserRoleUtils/interface"

export interface HeaderProps
  extends Pick<
    MemberListProps,
    | "currentUserRole"
    | "allowEditorManageTeamMember"
    | "allowViewerManageTeamMember"
    | "updateTeamPermissionConfig"
    | "removeTeamMembers"
    | "removeTeam"
    | "currentUserID"
    | "currentTeamMemberID"
    | "hasApp"
    | "changeTeamMembersRole"
    | "inviteByEmail"
    | "renewInviteLink"
    | "fetchInviteLink"
    | "configInviteLink"
    | "allowInviteByLink"
    | "userListData"
    | "appLink"
    | "isAppPublic"
    | "isCloudVersion"
    | "updateAppPublicConfig"
    | "teamName"
    | "userNickname"
  > {}

export interface MoreActionProps
  extends Pick<
    HeaderProps,
    | "currentUserID"
    | "currentUserRole"
    | "currentTeamMemberID"
    | "hasApp"
    | "updateTeamPermissionConfig"
    | "removeTeam"
    | "removeTeamMembers"
    | "allowEditorManageTeamMember"
    | "allowViewerManageTeamMember"
    | "isCloudVersion"
  > {
  children: ReactNode
  userNumber: number
}

export interface InviteListItemProps
  extends inviteByEmailResponse,
    Pick<InviteListProps, "currentUserRole" | "changeMembersRole"> {}

export interface InviteListProps
  extends Pick<InviteMemberByEmailProps, "currentUserRole"> {
  inviteList?: inviteByEmailResponse[]
  changeMembersRole: (userID: string, userRole: USER_ROLE) => void
}

// changeTeamMembersRole, currentUserRole, inviteByEmail, renewInviteLink
export interface InviteMemberModalProps
  extends Pick<
    HeaderProps,
    | "changeTeamMembersRole"
    | "currentUserRole"
    | "inviteByEmail"
    | "renewInviteLink"
    | "fetchInviteLink"
    | "configInviteLink"
    | "allowInviteByLink"
    | "allowEditorManageTeamMember"
    | "allowViewerManageTeamMember"
    | "userListData"
    | "hasApp"
    | "appLink"
    | "isAppPublic"
    | "isCloudVersion"
    | "updateAppPublicConfig"
  > {
  maskClosable?: boolean
  handleCloseModal: () => void
  appID?: string
  teamName?: string
  userNickname?: string
}

export interface AppPublicContentProps
  extends Pick<
    InviteMemberModalProps,
    | "appLink"
    | "isAppPublic"
    | "updateAppPublicConfig"
    | "appID"
    | "teamName"
    | "userNickname"
  > {}

export interface InviteMemberByLinkProps
  extends Pick<
    InviteMemberModalContentProps,
    | "isCloudVersion"
    | "currentUserRole"
    | "renewInviteLink"
    | "fetchInviteLink"
    | "configInviteLink"
    | "allowInviteByLink"
    | "appID"
    | "teamName"
    | "userNickname"
  > {}

export interface InviteMemberByEmailProps
  extends Pick<
    InviteMemberModalContentProps,
    | "currentUserRole"
    | "userListData"
    | "inviteByEmail"
    | "changeTeamMembersRole"
    | "appID"
  > {}

export interface InviteMemberModalContentProps
  extends Pick<
    MemberListProps,
    | "isCloudVersion"
    | "changeTeamMembersRole"
    | "currentUserRole"
    | "renewInviteLink"
    | "fetchInviteLink"
    | "configInviteLink"
    | "allowInviteByLink"
    | "inviteByEmail"
    | "userListData"
  > {
  appID?: string
  teamName?: string
  userNickname?: string
}
