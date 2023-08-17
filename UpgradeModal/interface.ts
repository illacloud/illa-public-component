import { InsufficientNoticeModalType } from "./component/InsufficientNoticeModal";
import { UpgradeModalType } from "./component/SubscriptionReminderModal";
import { DrawerDefaultConfig } from "./component/UpgradeDrawer/interface";
import { UpgradeSuccessModalType } from "./component/UpgradeSuccessModal";

export interface DrawerShowProps {
  visible?: boolean;
  id?: string
  defaultConfig?: DrawerDefaultConfig
}

export interface ModalShowProps {
  visible?: boolean;
  id?: string
  modalType: UpgradeSuccessModalType | UpgradeModalType | InsufficientNoticeModalType
}

export interface DrawerHandler {
  (drawer: DrawerShowProps): string
}

export interface ModalHandler {
  (modal: ModalShowProps): string
}

export interface SubListener {
  listenerId: string
  onStoreChange: () => void
}

export interface DrawerStoreHandler {
  getDrawers: () => DrawerShowProps[]
  setDrawers: (drawers: DrawerShowProps[]) => void
  subscribe: (onStoreChange: () => void) => SubListener
  unSubscribe: (listenerId: string) => void
  add: (drawer: DrawerShowProps) => void
  remove: (drawerId: string) => void
  update: (drawerId: string, drawer: DrawerShowProps) => void
}

export interface ModalStoreHandler {
  getModals: () => ModalShowProps[]
  setModals: (modals: ModalShowProps[]) => void
  subscribe: (onStoreChange: () => void) => SubListener
  unSubscribe: (listenerId: string) => void
  add: (modal: ModalShowProps) => void
  remove: (modalId: string) => void
  update: (modalId: string, modal: ModalShowProps) => void
}

export interface DrawerStore {
  listener: SubListener[]
  drawers: DrawerShowProps[]
}

export interface ModalStore {
  listener: SubListener[]
  modals: ModalShowProps[]
}