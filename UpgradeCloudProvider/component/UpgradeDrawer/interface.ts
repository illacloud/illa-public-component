import { authCloudRequest } from "@illa-public/illa-net"
import "@illa-public/illa-net/base"
import {
  SUBSCRIBE_PLAN,
  SUBSCRIPTION_CYCLE,
  SubscribeInfo,
} from "@illa-public/user-data"

export enum PurchaseItem {
  DRIVE_TRAFFIC_1GB = 1,
}

export interface LicenseSubscribeInfo extends SubscribeInfo {}

export interface DriveSubscribeInfo extends SubscribeInfo {
  volume: number // Storage capacity, in bytes
  balance: number // Remaining storage capacity, in bytes
}

export interface TrafficSubscribeInfo {
  balance: number // Remaining storage traffic, in bytes
}

export interface TeamSubscription {
  teamLicense: {
    current: LicenseSubscribeInfo
    next: LicenseSubscribeInfo
  }
  driveVolume: {
    current: DriveSubscribeInfo
    next: DriveSubscribeInfo
  }
  driveTraffic: TrafficSubscribeInfo
}

interface PortalURLResponse {
  url: string
}

interface SubscribeResponse {
  url: string
}

export const getPortalURL = async (returningURL: string, teamID?: string) => {
  const { data } = await authCloudRequest<PortalURLResponse>(
    {
      url: `/billing/getPortalURL`,
      method: "POST",
      data: { returningURL },
    },
    { teamID },
  )
  return data
}

export const getTeamSubscription = async (teamID?: string) => {
  const { data } = await authCloudRequest<TeamSubscription>(
    {
      url: `/billing`,
      method: "GET",
    },
    { teamID },
  )
  return data
}

export const purchase = async (
  requestData: {
    item: PurchaseItem
    quantity: number // 需要购买的物品数量, 比如 ITEM_DRIVE_TRAFFIC_1GB 购买4GB, 就填写4
    successRedirect: string // Success redirect URL
    cancelRedirect: string // Cancel redirect URL
  },
  teamID: string,
) => {
  return await authCloudRequest<SubscribeResponse>(
    {
      url: `/billing/purchase`,
      method: "POST",
      data: requestData,
    },
    { teamID },
  )
}

export const subscribe = async (
  requestData: {
    plan: SUBSCRIBE_PLAN
    quantity: number // License quantity
    cycle: SUBSCRIPTION_CYCLE
    successRedirect: string // Success redirect URL
    cancelRedirect: string // Cancel redirect URL
  },
  teamID: string,
) => {
  return await authCloudRequest<SubscribeResponse>(
    {
      url: `/billing/subscribe`,
      method: "POST",
      data: requestData,
    },
    { teamID },
  )
}

export const modifySubscribe = async (
  requestData: {
    plan: SUBSCRIBE_PLAN
    quantity: number // License quantity
    cycle: SUBSCRIPTION_CYCLE
  },
  teamID: string,
) => {
  return await authCloudRequest(
    {
      url: `/billing/subscribe`,
      method: "PATCH",
      data: requestData,
    },
    { teamID },
  )
}

export const cancelSubscribe = async (plan: SUBSCRIBE_PLAN, teamID: string) => {
  return await authCloudRequest(
    {
      url: `/billing/subscribe`,
      method: "DELETE",
      data: { plan },
    },
    { teamID },
  )
}
