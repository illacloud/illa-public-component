import { SUBSCRIBE_PLAN, SUBSCRIPTION_CYCLE } from "@illa-public/public-types"
import { DrawerSubscribeInfo } from "./component/UpgradeDrawer/interface"
import { PurchaseItem } from "./service/interface"

export interface ModalStoreHandler<T> {
  getModal: () => T
  setModal: (modal: T) => void
  subscribe: (onStoreChange: () => void) => SubListener
  unSubscribe: (listenerId: string) => void
  remove: () => void
  update: (modal: T) => void
}

export interface ModalHandler<T> {
  (modal: T): string
}

export interface ModalStore<T> {
  listener: SubListener[]
  modal: T | null
}

export interface SubListener {
  listenerId: string
  onStoreChange: () => void
}

export interface DrawerDefaultConfig {
  subscribeInfo?: DrawerSubscribeInfo
  purchaseInfo?: {
    item: PurchaseItem
    quantity: number
  }
  appSumoInvoiceURL?: string
  onSubscribeCallback?: (teamID: string) => void
}

export interface DriveVolumeInfo {
  plan: SUBSCRIBE_PLAN
  balanceConverted: number
  volumeConverted: number
  quantity: number
  cycle: SUBSCRIPTION_CYCLE
  cancelAtPeriodEnd: boolean
}

export interface StorageDrawerConfig {
  driveVolume?: DriveVolumeInfo
  successCallBack?: (teamID: string) => void
}

export enum CollarModalType {
  STORAGE = "storage",
  TOKEN = "token",
  TRAFFIC = "traffic",
}

export enum COLLAR_TYPE {
  SUBSCRIBE = "subscribe",
  ADD_COLLAR = "addCollar",
  REMOVE_COLLAR = "removeCollar",
  CANCEL_SUBSCRIPTION = "cancelSubscription",
  MODIFY_SUBSCRIPTION = "modifySubscription",
}

export enum FREE_TEAM_LIMIT_TYPE {
  CREATE = "create",
  TRANSFER_OWNER = "transferOwner",
}

export enum PURCHASE_TYPE {
  COLLA = "colla",
  LICENSE = "license",
}
