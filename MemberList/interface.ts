import {
  USER_ROLE,
  USER_STATUS,
} from "@/illa-public-component/UserRoleUtils/interface"

interface UserData {
  teamMemberID: string
  userID: string
  nickname: string
  email: string
  avatar: string
  userRole: USER_ROLE
  userStatus: USER_STATUS
  permission: Record<string, any> // Reserved Field
  createdAt: string
  updatedAt: string
}

export enum SUBSCRIBE_PLAN {
  TEAM_LICENSE_FREE = 1,
  TEAM_LICENSE_PLUS,
  TEAM_LICENSE_ENTERPRISE,
  DRIVE_VOLUME_FREE,
  DRIVE_VOLUME_PAID,
  TEAM_LICENSE_EXPIRED,
  DRIVE_VOLUME_EXPIRED,
  TEAM_LICENSE_INSUFFICIENT,
  DRIVE_VOLUME_INSUFFICIENT,
}

export enum SUBSCRIPTION_CYCLE {
  MONTHLY = 1,
  YEARLY,
}

export interface SubscribeInfo {
  volume: number
  balance: number
  quantity: number
  plan: SUBSCRIBE_PLAN
  invoiceIssueDate: string
  cycle: SUBSCRIPTION_CYCLE
  amount: number
}

export interface fetchInviteLinkResponse {
  inviteLink: string
  teamID: number
  userRole: USER_ROLE
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

export interface MemberListProps {
  isCloudVersion?: boolean
  hasApp?: boolean
  loading?: boolean
  appLink?: string
  isAppPublic?: boolean
  currentUserID: string
  currentTeamMemberID: string
  teamCurrentLicense: SubscribeInfo
  currentUserRole: USER_ROLE
  userListData: UserData[]
  allowEditorManageTeamMember: boolean
  allowViewerManageTeamMember: boolean
  userNickname: string
  teamName: string
  allowInviteByLink: boolean
  changeTeamMembersRole: (
    teamMemberID: string,
    userRole: USER_ROLE,
  ) => Promise<boolean>
  configInviteLink: (inviteLinkEnabled: boolean) => Promise<boolean>
  removeTeam: () => Promise<boolean>
  removeTeamMembers: (teamMemberID: string) => Promise<boolean>
  fetchInviteLink: (userRole: USER_ROLE) => Promise<fetchInviteLinkResponse>
  renewInviteLink: (userRole: USER_ROLE) => Promise<fetchInviteLinkResponse>
  inviteByEmail: (
    email: string,
    userRole: USER_ROLE,
  ) => Promise<inviteByEmailResponse>
  updateTeamPermissionConfig: (
    allowEditorManageTeamMember: boolean,
    allowViewerManageTeamMember: boolean,
  ) => Promise<boolean>
  updateAppPublicConfig?: (isPublic: boolean) => Promise<boolean>
}
