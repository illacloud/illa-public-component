import { MemberListProps } from "@illa-public/member-list"
import { USER_ROLE, USER_STATUS } from "@illa-public/user-data"

export interface InviteMemberByEmailProps
  extends Pick<
    MemberListProps,
    | "currentUserRole"
    | "userListData"
    | "inviteByEmail"
    | "changeTeamMembersRole"
  > {
  appID?: string
  inviteToEditApp?: boolean
}

export interface inviteByEmailResponse {
  name?: string
  email: string
  userID: string
  teamMemberID: string
  userRole: USER_ROLE
  userAvatar?: string
  emailStatus: USER_STATUS
}
