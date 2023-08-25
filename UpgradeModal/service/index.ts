import { authCloudRequest } from "@illa-public/illa-net"
import { SUBSCRIBE_PLAN, SUBSCRIPTION_CYCLE } from "@illa-public/user-data"
import { PurchaseItem, SubscribeResponse } from "./interface"

export const purchase = async (
  teamID: string,
  requestData: {
    item: PurchaseItem
    quantity: number // 需要购买的物品数量, 比如 ITEM_DRIVE_TRAFFIC_1GB 购买4GB, 就填写4
    successRedirect: string // Success redirect URL
    cancelRedirect: string // Cancel redirect URL
  },
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
  teamID: string,
  requestData: {
    plan: SUBSCRIBE_PLAN
    quantity: number // License quantity
    cycle: SUBSCRIPTION_CYCLE
    successRedirect: string // Success redirect URL
    cancelRedirect: string // Cancel redirect URL
  },
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
  teamID: string,
  requestData: {
    plan: SUBSCRIBE_PLAN
    quantity: number // License quantity
    cycle: SUBSCRIPTION_CYCLE
  },
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
  teamID: string,
  plan: SUBSCRIBE_PLAN,
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
