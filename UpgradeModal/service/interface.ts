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

export enum CAPACITY_TYPE {
  LICENSE = 1, // 团队坐席
  DRIVE_VOLUME, // drive 容量
  DRIVE_TRAFFIC, // drive 流量
  POSTGRES_DATABASE_RECORD_VOLUME, // 数据库条目总数
}

export enum PurchaseItem {
  DRIVE_TRAFFIC_1GB = 1,
}

export interface LicenseSubscribeInfo extends SubscribeInfo {}

export interface AppSumoSubscribeInfo extends Omit<SubscribeInfo, "plan"> {
  volume: number // volume 代表AppSumo的总额
  balance: number // balance 代表余额
  plan: CUSTOM_CYCLE
}

export interface DriveSubscribeInfo extends SubscribeInfo {
  volume: number // 存储容量, 单位为字节,
  balance: number // 存储容量剩余, 单位为字节
}

export interface TrafficSubscribeInfo {
  balance: number // 存储流量剩余, 单位为字节
}

export interface TeamSubscription {
  teamLicense: {
    current: LicenseSubscribeInfo
    appSumo: AppSumoSubscribeInfo
    total: TotalTeamLicense
  }
  driveVolume: {
    current: DriveSubscribeInfo
  }
  driveTraffic: TrafficSubscribeInfo
}

export interface PortalURLResponse {
  url: string
}

export interface SubscribeResponse {
  url: string
}