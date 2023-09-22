import { StorageDrawerConfig } from "../../interface"

export interface StorageDrawerProps {
  visible?: boolean
  config: StorageDrawerConfig
  onCancel?: () => void
  afterClose?: () => void
}
