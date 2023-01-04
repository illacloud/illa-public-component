import { ReactNode } from "react"
import { MemberListProps } from "@/illa-public-component/MemberList/interface"

export interface HeaderProps
  extends Pick<
    MemberListProps,
    | "currentUserRole"
    | "allowEditorOrViewerInvite"
    | "updateTeamPermissionConfig"
    | "removeTeamMembers"
    | "currentUserID"
    | "hasApp"
  > {}

export interface MoreActionProps extends HeaderProps {
  children: ReactNode
}
