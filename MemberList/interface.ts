import {
  SUBSCRIBE_PLAN,
  SUBSCRIPTION_CYCLE,
  USER_ROLE,
  USER_STATUS,
} from "@illa-public/user-data"

export interface UserData {
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

export enum CUSTOM_CYCLE {
  LIFETIME = 3,
}
export enum REDIRECT_PAGE_TYPE {
  EDIT = "edit",
  RELEASE = "release",
}

export interface SubscribeInfo {
  volume: number
  balance: number
  quantity: number
  plan: SUBSCRIBE_PLAN
  invoiceIssueDate: string
  cycle: SUBSCRIPTION_CYCLE
  totalAmount: number
  cancelAtPeriodEnd: boolean
  invoiceURL: string
}

export interface TotalTeamLicense {
  volume: number
  balance: number
  teamLicensePurchased: boolean // 用于区分免费团队和付费团队
  teamLicenseAllPaid: boolean // 用于区分团队是否已付费并且license充足
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
  currentTeamLicense: SubscribeInfo
  totalTeamLicense: TotalTeamLicense
  currentUserRole: USER_ROLE
  userListData: UserData[]
  allowEditorManageTeamMember: boolean
  allowViewerManageTeamMember: boolean
  blockRegister: boolean
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
  fetchInviteLink: (
    userRole: USER_ROLE,
    redirectPage?: REDIRECT_PAGE_TYPE,
  ) => Promise<fetchInviteLinkResponse>
  renewInviteLink: (
    userRole: USER_ROLE,
    redirectPage?: REDIRECT_PAGE_TYPE,
  ) => Promise<fetchInviteLinkResponse>
  inviteByEmail: (
    email: string,
    userRole: USER_ROLE,
    redirectPage?: REDIRECT_PAGE_TYPE,
  ) => Promise<inviteByEmailResponse>
  updateTeamPermissionConfig: (
    allowEditorManageTeamMember: boolean,
    allowViewerManageTeamMember: boolean,
    blockRegister: boolean,
  ) => Promise<boolean>
  updateAppPublicConfig?: (isPublic: boolean) => Promise<boolean>
  onSubscribe?: () => void
}
