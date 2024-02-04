import { USER_ROLE, USER_STATUS } from "../user"

export interface MemberInfo {
  teamMemberID: string
  userID: string
  nickname: string
  email: string
  avatar: string
  userRole: USER_ROLE
  userStatus: USER_STATUS
  permission: Record<string, any>
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
  UNDEFINED = "undefined",
  TEAM_LICENSE_FREE = "team_license_free",
  TEAM_LICENSE_PLUS = "team_license_plus",
  TEAM_LICENSE_PREMIUM = "team_license_premium",
  TEAM_LICENSE_ENTERPRISE = "team_license_enterprise",
  TEAM_LICENSE_INSUFFICIENT = "team_license_insufficient",
  TEAM_LICENSE_EXPIRED = "team_license_expired",
  TEAM_LICENSE_CANCELED = "team_license_canceled",
  TEAM_LICENSE_APPSUMO_TIER_1 = "team_license_appsumo_tier_1",
  TEAM_LICENSE_APPSUMO_TIER_2 = "team_license_appsumo_tier_2",
  TEAM_LICENSE_APPSUMO_TIER_3 = "team_license_appsumo_tier_3",
  TEAM_LICENSE_APPSUMO_TIER_4 = "team_license_appsumo_tier_4",
  DRIVE_FREE = "drive_free",
  DRIVE_VOLUME_PAID = "drive_volume_paid",
  DRIVE_VOLUME_INSUFFICIENT = "drive_volume_insufficient",
  DRIVE_VOLUME_EXPIRED = "drive_volume_expired",
  DRIVE_VOLUME_CANCELED = "drive_volume_canceled",
  COLLA_FREE = "colla_free",
  COLLA_SUBSCRIBE_PAID = "colla_subscribe_paid",
  COLLA_SUBSCRIBE_INSUFFICIENT = "colla_subscribe_insufficient",
  COLLA_SUBSCRIBE_CANCELED = "colla_subscribe_canceled",
  COLLA_SUBSCRIBE_EXPIRED = "colla_subscribe_expired",
}

export enum SUBSCRIPTION_CYCLE {
  FREE = 0,
  MONTHLY = 1,
  YEARLY = 2,
  LIFETIME = 3,
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
  teamLicensePurchased: boolean
  teamLicenseAllPaid: boolean
}

export interface CollarInfo {
  volume: number
  balance: number
  balanceConverted: number
  quantity: number
  invoiceIssueDate: string
  cycle: SUBSCRIPTION_CYCLE
  totalAmount: number
  plan: SUBSCRIBE_PLAN
  cancelAtPeriodEnd: boolean
  bonus: number
  bonusConverted: number
}

export interface ITeamCustomInfo {
  customDomain: string
  favicon: string
  title: string
}

export interface TeamInfo {
  id: string
  uid: string
  name: string
  icon: string
  identifier: string
  teamMemberID: string
  currentTeamLicense: SubscribeInfo
  appSumoTeamLicense: SubscribeInfo
  totalTeamLicense: TotalTeamLicense
  personalConfig: TeamPersonalConfig
  myRole: USER_ROLE
  permission: TeamMemberPermission
  teamMemberPermission: TeamMemberPermissionConfig
  colla: CollarInfo
  customInfo: ITeamCustomInfo
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
  newPermission: Partial<TeamMemberPermission>
}

export interface UpdateTeamSubscribePayload {
  teamID: string
  subscribeInfo: SubscribeInfo
}
