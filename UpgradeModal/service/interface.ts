import {
  CollarInfo,
  SUBSCRIPTION_CYCLE,
  SubscribeInfo,
  TotalTeamLicense,
} from "@illa-public/public-types"

export enum CUSTOM_CYCLE {
  LIFETIME = 3,
}
export enum REDIRECT_PAGE_TYPE {
  EDIT = "edit",
  RELEASE = "release",
}

export enum PurchaseItem {
  DRIVE_TRAFFIC_1GB = 1,
}

export interface LicenseSubscribeInfo extends SubscribeInfo {}

export interface AppSumoSubscribeInfo extends Omit<SubscribeInfo, "plan"> {
  volume: number
  balance: number
  plan: CUSTOM_CYCLE
}

export interface DriveSubscribeInfo extends SubscribeInfo {
  volume: number
  volumeConverted: number
  balance: number
  balanceConverted: number
}

export interface TrafficSubscribeInfo {
  balance: number
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
  colla: {
    current: CollarInfo
  }
}

export interface PortalURLResponse {
  url: string
}

export interface SubscribeResponse {
  url: string
}

export interface CollaUsageInfoResponse {
  driveVolumeUsage: number
  driveVolumeUsagePercent: number
  driveTrafficUsage: number
  driveTrafficUsagePercent: number
  aiTokenGeneralUsage: number
  aiTokenGeneralUsagePercent: number
  totalCollaUsage: number
}

export const LICENSE_UNIT_PRICE = {
  [SUBSCRIPTION_CYCLE.FREE]: 0,
  [SUBSCRIPTION_CYCLE.MONTHLY]: 20,
  [SUBSCRIPTION_CYCLE.YEARLY]: 200,
  [SUBSCRIPTION_CYCLE.LIFETIME]: -1,
}

export const ENTERPRISE_UNIT_PRICE = {
  [SUBSCRIPTION_CYCLE.FREE]: 0,
  [SUBSCRIPTION_CYCLE.MONTHLY]: 50,
  [SUBSCRIPTION_CYCLE.YEARLY]: 500,
  [SUBSCRIPTION_CYCLE.LIFETIME]: -1,
}

export const COLLAR_UNIT_PRICE = {
  [SUBSCRIPTION_CYCLE.FREE]: 0,
  [SUBSCRIPTION_CYCLE.MONTHLY]: 10,
  [SUBSCRIPTION_CYCLE.YEARLY]: 100,
  [SUBSCRIPTION_CYCLE.LIFETIME]: -1,
}

export const COLLAR_UNIT_BY_CYCLE = {
  [SUBSCRIPTION_CYCLE.FREE]: 0,
  [SUBSCRIPTION_CYCLE.MONTHLY]: 5, // unit collar by month
  [SUBSCRIPTION_CYCLE.YEARLY]: 60, // unit collar by year
  [SUBSCRIPTION_CYCLE.LIFETIME]: -1,
}

export const UNIT_COLLA_BY_STORAGE = 1 // 1GB storage = 1k colla

export const UNIT_COLLA_CONVERSION_STORAGE = 1
export const UNIT_COLLA_CONVERSION_TRAFFIC = 1
export const UNIT_COLLA_CONVERSION_TOKEN = 20

export const LICENSE_NEW_USER_DISCOUNT = 0.8 // 20% off for new user
