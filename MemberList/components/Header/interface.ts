import { ReactNode } from "react"
import {
  MemberListProps,
  inviteByEmailResponse,
} from "@/illa-public-component/MemberList/interface"

export interface HeaderProps
  extends Pick<
    MemberListProps,
    | "currentUserRole"
    | "allowEditorOrViewerInvite"
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
  > {
  children: ReactNode
}

export interface InviteListItemProps
  extends inviteByEmailResponse,
    Pick<InviteListProps, "changeTeamMembersRole" | "currentUserRole"> {}

export interface InviteListProps
  extends Pick<
    InviteMemberByEmailProps,
    "changeTeamMembersRole" | "currentUserRole"
  > {
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
    "currentUserRole" | "inviteByEmail" | "changeTeamMembersRole"
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
    | "changeTeamMembersRole"
  > {}
