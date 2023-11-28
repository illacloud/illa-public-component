import { SUBSCRIBE_PLAN, SUBSCRIPTION_CYCLE } from "@illa-public/public-types"
import { DrawerDefaultConfig } from "../../interface"

export interface DrawerSubscribeInfo {
  plan: SUBSCRIBE_PLAN
  cycle: SUBSCRIPTION_CYCLE
  quantity: number
  cancelAtPeriodEnd?: boolean
}

export interface UpgradeDrawerProps {
  from: string
  visible?: boolean
  defaultConfig: DrawerDefaultConfig
  onCancel: () => void
  afterClose?: () => void
}
