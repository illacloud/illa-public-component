import { SUBSCRIPTION_CYCLE } from "@illa-public/public-types"
import { DrawerDefaultConfig } from "../../interface"
import { isSubscribeForDrawer } from "../../utils"
import { DrawerSubscribeInfo } from "./interface"

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
  const { subscribeInfo } = defaultConfig
  if (!subscribeInfo) return "unknown"
  if (
    isSubscribeForDrawer(subscribeInfo?.plan) &&
    !subscribeInfo.cancelAtPeriodEnd
  ) {
    if (subscribeInfo.quantity === quantity && subscribeInfo.cycle === cycle) {
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
}
