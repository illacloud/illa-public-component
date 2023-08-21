export enum USER_ROLE {
  "GUEST" = -1,
  "OWNER" = 1,
  "ADMIN",
  "EDITOR",
  "VIEWER",
  "CUSTOM",
}

export enum USER_STATUS {
  "OK" = 1,
  "PENDING" = 2,
}
export interface MemberInfo {
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

export interface TeamMemberPermission {
  blockRegister: boolean
  inviteLinkEnabled: boolean
  allowViewerInvite: boolean
  allowEditorInvite: boolean
  allowEditorManageTeamMember: boolean
  allowViewerManageTeamMember: boolean
}

export interface TeamMemberPermissionConfig {
  config: number
}

export interface TeamPersonalConfig {
  teamLicenseSubscribeExpiredPopupShowed: boolean
  teamLicenseSubscribeExpiredBannerShowed: boolean
}

export enum SUBSCRIBE_PLAN {
  TEAM_LICENSE_FREE = 1,
  TEAM_LICENSE_PREMIUM,
  TEAM_LICENSE_ENTERPRISE,
  DRIVE_VOLUME_FREE,
  DRIVE_VOLUME_PAID,
  TEAM_LICENSE_EXPIRED,
  DRIVE_VOLUME_EXPIRED,
  TEAM_LICENSE_INSUFFICIENT,
  DRIVE_VOLUME_INSUFFICIENT,
}

export enum SUBSCRIPTION_CYCLE {
  FREE = 0,
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

export interface TeamInfo {
  id: string
  uid: string
  name: string
  icon: string
  identifier: string
  teamMemberID: string
  currentTeamLicense: SubscribeInfo
  totalTeamLicense: TotalTeamLicense
  personalConfig: TeamPersonalConfig
  myRole: USER_ROLE
  permission: TeamMemberPermission
  teamMemberPermission: TeamMemberPermissionConfig
}

export interface Team {
  items?: TeamInfo[]
  currentId?: string
  currentMemberList?: MemberInfo[]
}

export interface UpdateTransUserRolePayload {
  teamMemberID: string
}

export interface UpdateTeamMemberUserRolePayload {
  teamMemberID: string
  userRole: USER_ROLE
}

export interface UpdateTeamMemberPermissionPayload {
  teamID: string
  newPermission: TeamMemberPermission
}

export interface UpdateTeamSubscribePayload {
  teamID: string
  subscribeInfo: SubscribeInfo
}
