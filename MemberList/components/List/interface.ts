import { USER_ROLE, USER_STATUS } from "@illa-public/user-data"
import { MemberListProps } from "../../interface"

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
    | "currentTeamLicense"
    | "totalTeamLicense"
    | "isCloudVersion"
    | "onSubscribe"
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
