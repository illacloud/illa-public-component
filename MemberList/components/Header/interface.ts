import { ReactNode } from "react"
import { MemberListProps } from "@/illa-public-component/MemberList/interface"
import { USER_ROLE } from "@/store/userInfo/userInfoState"

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

export interface InviteListItemProps {
  email: string
  userRole: USER_ROLE
  userAvatar: string
  emailStatus: boolean
}

export interface InviteListProps {
  inviteList?: InviteListItemProps[]
}

export interface InviteMemberModalProps {
  handleCloseModal: () => void
}
