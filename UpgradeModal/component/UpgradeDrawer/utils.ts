import { SUBSCRIBE_PLAN, SUBSCRIPTION_CYCLE } from "@illa-public/user-data"
import { DrawerDefaultConfig } from "../../interface"
import { DrawerSubscribeInfo } from "./interface"

export const isSubscribe = (subscribePlan?: SUBSCRIBE_PLAN) => {
  return (
    subscribePlan === SUBSCRIBE_PLAN.TEAM_LICENSE_PREMIUM ||
    subscribePlan === SUBSCRIBE_PLAN.TEAM_LICENSE_ENTERPRISE ||
    subscribePlan === SUBSCRIBE_PLAN.DRIVE_VOLUME_PAID ||
    subscribePlan === SUBSCRIBE_PLAN.TEAM_LICENSE_INSUFFICIENT ||
    subscribePlan === SUBSCRIBE_PLAN.DRIVE_VOLUME_INSUFFICIENT
  )
}

export const isCancelSubscribe = (quantity: number) => quantity === 0

export const isQuantityDecreased = (
  quantity: number,
  subscribeInfo: DrawerSubscribeInfo,
) => quantity < subscribeInfo.quantity

export const getSubscriptionStatus = (
  defaultConfig: DrawerDefaultConfig,
  quantity: number,
  cycle: SUBSCRIPTION_CYCLE,
) => {
  const { type, subscribeInfo } = defaultConfig

  switch (type) {
    case "license":
    case "storage":
      if (!subscribeInfo) return "unknown"
      if (
        isSubscribe(subscribeInfo?.currentPlan) &&
        !subscribeInfo.cancelAtPeriodEnd
      ) {
        if (
          subscribeInfo.quantity === quantity &&
          subscribeInfo.cycle === cycle
        ) {
          return "un_changed"
        } else if (isCancelSubscribe(quantity)) {
          return "subscribed_cancelled"
        } else if (cycle !== subscribeInfo.cycle) {
          if (isQuantityDecreased(quantity, subscribeInfo)) {
            return "subscribed_plan_decreased_with_update"
          } else {
            return "subscribed_plan_increased_with_update"
          }
        } else {
          if (isQuantityDecreased(quantity, subscribeInfo)) {
            return "subscribed_quantity_decreased"
          } else {
            return "subscribed_quantity_increased"
          }
        }
      } else {
        if (cycle === SUBSCRIPTION_CYCLE.YEARLY) {
          return "subscribed_yearly"
        } else {
          return "subscribed_monthly"
        }
      }
    case "traffic":
      return "traffic_added"
    default:
      return "unknown"
  }
}

export function updateHash(newHash: string) {
  const currentURL = window.location.href
  const parsedUrl = new URL(currentURL)
  parsedUrl.hash = newHash
  return parsedUrl.toString()
}

export function getSuccessRedirectWithParams(
  params: Record<string, string>,
): string {
  const redirectPath = "/landing/subscribed"
  const paramString = Object.entries(params)
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(value)}`,
    )
    .join("&")

  return `${process.env.ILLA_CLOUD_URL}${redirectPath}?${paramString}`
}
