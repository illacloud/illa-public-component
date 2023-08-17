import { DrawerProps } from "@illa-design/react"
import {
  PurchaseItem,
  SUBSCRIBE_PLAN,
  SUBSCRIPTION_CYCLE,
} from "../../service/interface"

export interface DrawerSubscribeInfo {
  plan: SUBSCRIBE_PLAN
  currentPlan?: SUBSCRIBE_PLAN
  cycle: SUBSCRIPTION_CYCLE
  quantity: number
  cancelAtPeriodEnd?: boolean
}

export type DrawerType = "license" | "storage" | "traffic"

export interface DrawerDefaultConfig {
  type: DrawerType
  subscribeInfo?: DrawerSubscribeInfo
  purchaseInfo?: {
    item: PurchaseItem
    quantity: number
  }
  appSumoInvoiceURL?: string
  onSubscribeCallback?: () => void
}

export interface UpgradeDrawerProps extends DrawerProps {
  defaultConfig: DrawerDefaultConfig
}
