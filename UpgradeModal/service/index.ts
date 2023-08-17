import { authCloudRequest } from "@illa-public/illa-net"
import {
  PurchaseItem,
  SUBSCRIBE_PLAN,
  SUBSCRIPTION_CYCLE,
  SubscribeResponse,
} from "./interface"

export const purchase = async (
  requestData: {
    item: PurchaseItem
    quantity: number // 需要购买的物品数量, 比如 ITEM_DRIVE_TRAFFIC_1GB 购买4GB, 就填写4
    successRedirect: string // Success redirect URL
    cancelRedirect: string // Cancel redirect URL
  },
  teamID?: string,
) => {
  return await authCloudRequest<SubscribeResponse>(
    {
      url: `/billing/purchase`,
      method: "POST",
      data: requestData,
    },
    {
      teamID,
    },
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
  teamID?: string,
) => {
  return await authCloudRequest<SubscribeResponse>(
    {
      url: `/billing/subscribe`,
      method: "POST",
      data: requestData,
    },
    {
      teamID,
    },
  )
}

export const modifySubscribe = async (
  requestData: {
    plan: SUBSCRIBE_PLAN
    quantity: number // License quantity
    cycle: SUBSCRIPTION_CYCLE
  },
  teamID?: string,
) => {
  return await authCloudRequest(
    {
      url: `/billing/subscribe`,
      method: "PATCH",
      data: requestData,
    },
    {
      teamID,
    },
  )
}

export const cancelSubscribe = async (
  plan: SUBSCRIBE_PLAN,
  teamID?: string,
) => {
  return await authCloudRequest(
    {
      url: `/billing/subscribe`,
      method: "DELETE",
      data: { plan },
    },
    {
      teamID,
    },
  )
}
