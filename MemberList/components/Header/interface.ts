import { ReactNode } from "react"
import {
  MemberListProps,
  inviteByEmailResponse,
} from "@/illa-public-component/MemberList/interface"

export interface HeaderProps
  extends Pick<
    MemberListProps,
    | "currentUserRole"
    | "allowEditorManageTeamMember"
    | "allowViewerManageTeamMember"
    | "updateTeamPermissionConfig"
    | "removeTeamMembers"
    | "currentUserID"
    | "hasApp"
    | "changeTeamMembersRole"
    | "inviteByEmail"
    | "renewInviteLink"
    | "fetchInviteLink"
    | "configInviteLink"
    | "allowInviteByLink"
  > {}

export interface MoreActionProps
  extends Pick<
    HeaderProps,
    | "currentUserRole"
    | "currentUserID"
    | "hasApp"
    | "updateTeamPermissionConfig"
    | "removeTeamMembers"
    | "allowEditorManageTeamMember"
    | "allowViewerManageTeamMember"
  > {
  children: ReactNode
}

export interface InviteListItemProps
  extends inviteByEmailResponse,
    Pick<InviteListProps, "inviteByEmail" | "currentUserRole"> {}

export interface InviteListProps
  extends Pick<InviteMemberByEmailProps, "currentUserRole" | "inviteByEmail"> {
  inviteList?: inviteByEmailResponse[]
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
  > {
  handleCloseModal: () => void
}

export interface InviteMemberByLinkProps
  extends Pick<
    InviteMemberModalContentProps,
    | "currentUserRole"
    | "renewInviteLink"
    | "fetchInviteLink"
    | "configInviteLink"
    | "allowInviteByLink"
  > {}

export interface InviteMemberByEmailProps
  extends Pick<
    InviteMemberModalContentProps,
    "currentUserRole" | "inviteByEmail"
  > {}

export interface InviteMemberModalContentProps
  extends Pick<
    MemberListProps,
    | "currentUserRole"
    | "renewInviteLink"
    | "fetchInviteLink"
    | "configInviteLink"
    | "allowInviteByLink"
    | "inviteByEmail"
  > {}
