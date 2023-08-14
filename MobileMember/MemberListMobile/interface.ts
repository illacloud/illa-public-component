import { USER_ROLE } from "@illa-public/user-role-utils/interface"
import { HTMLAttributes } from "react"
import {
  SubscribeInfo,
  TotalTeamLicense,
  UserData,
  fetchInviteLinkResponse,
  inviteByEmailResponse,
} from "@/illa-public-component/MemberList/interface"

export interface MemberListCommonProps {
  currentTeamLicense: SubscribeInfo
  totalTeamLicense: TotalTeamLicense
  teamName?: string
  userNickname?: string
  loading?: boolean
  userListData: UserData[]
  currentUserID: string
  currentUserRole: USER_ROLE
  changeTeamMembersRole: (
    teamMemberID: string,
    userRole: USER_ROLE,
  ) => Promise<boolean>
  configInviteLink: (inviteLinkEnabled: boolean) => Promise<boolean>
  removeTeamMembers: (teamMemberID: string) => Promise<boolean>
  fetchInviteLink: (userRole: USER_ROLE) => Promise<fetchInviteLinkResponse>
  inviteByEmail: (
    email: string,
    userRole: USER_ROLE,
  ) => Promise<inviteByEmailResponse>
  onSubscribe?: () => void
}

export interface MemberListMobileProps
  extends HTMLAttributes<HTMLDivElement>,
    MemberListCommonProps {
  inviteLinkEnabled?: boolean
  modalVisible: boolean
  setModalVisible: (visible: boolean) => void
}
