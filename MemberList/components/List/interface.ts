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

  userID: string
  currentUserID: string
}

export interface ListProps
  extends Pick<
    MemberListProps,
    | "userListData"
    | "removeTeamMembers"
    | "currentUserID"
    | "currentUserRole"
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
  teamMemberID: string
  userID: string
  userRole: USER_ROLE
  userStatus: USER_STATUS
}
