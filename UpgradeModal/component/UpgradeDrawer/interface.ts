import { SUBSCRIBE_PLAN, SUBSCRIPTION_CYCLE } from "@illa-public/user-data"
import { DrawerDefaultConfig } from "../../interface"

export interface DrawerSubscribeInfo {
  plan: SUBSCRIBE_PLAN
  currentPlan?: SUBSCRIBE_PLAN
  cycle: SUBSCRIPTION_CYCLE
  quantity: number
  cancelAtPeriodEnd?: boolean
}

export type DrawerType = "license" | "storage" | "traffic"

export interface UpgradeDrawerProps {
  visible?: boolean
  defaultConfig: DrawerDefaultConfig
  onCancel: () => void
}
