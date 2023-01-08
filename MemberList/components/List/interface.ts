import { MemberListProps } from "@/illa-public-component/MemberList/interface"
import {
  USER_ROLE,
  USER_STATUS,
} from "@/illa-public-component/UserRoleUtils/interface"

export interface NameSpaceProps {
  name: string
  avatar: string
  email: string
  status: USER_STATUS
}

export interface ListProps
  extends Pick<
    MemberListProps,
    | "userListData"
    | "removeTeamMembers"
    | "currentUserRole"
    | "currentUserID"
    | "changeTeamMembersRole"
  > {}

export interface MoreActionProps
  extends Pick<
    MemberListProps,
    | "currentUserID"
    | "currentUserRole"
    | "removeTeamMembers"
    | "changeTeamMembersRole"
  > {
  email: string
  name: string

  userID: string
  userRole: USER_ROLE
}
