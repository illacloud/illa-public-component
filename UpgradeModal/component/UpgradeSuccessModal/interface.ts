import { SUCCESS_MODAL_CONFIG_KEY } from "./constants";

export type UpgradeSuccessModalType = keyof typeof SUCCESS_MODAL_CONFIG_KEY


export interface UpgradeSuccessModalProps  {
  visible?: boolean
  configType?: UpgradeSuccessModalType
  onCancel?: () => void
}