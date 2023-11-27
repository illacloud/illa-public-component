import { INSUFFICIENT_MODAL_CONFIG_KEY } from "./constants"

export type InsufficientNoticeModalType =
  keyof typeof INSUFFICIENT_MODAL_CONFIG_KEY

export interface InsufficientNoticeModalProps {
  configType?: InsufficientNoticeModalType
  visible?: boolean
  onCancel?: () => void
  afterClose?: () => void
}
