import {
  SUBSCRIPTION_CYCLE,
  SubscribeInfo,
  TotalTeamLicense,
} from "@illa-public/user-data"

export enum CUSTOM_CYCLE {
  LIFETIME = 3,
}
export enum REDIRECT_PAGE_TYPE {
  EDIT = "edit",
  RELEASE = "release",
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

export const SUBSCRIBE_UNIT_PRICE = {
  license: {
    [SUBSCRIPTION_CYCLE.FREE]: 0,
    [SUBSCRIPTION_CYCLE.MONTHLY]: 20,
    [SUBSCRIPTION_CYCLE.YEARLY]: 200,
  },
  storage: {
    [SUBSCRIPTION_CYCLE.FREE]: 0,
    [SUBSCRIPTION_CYCLE.MONTHLY]: 10,
    [SUBSCRIPTION_CYCLE.YEARLY]: 100,
  },
  traffic: {
    [PurchaseItem.DRIVE_TRAFFIC_1GB]: 10,
  },
}
