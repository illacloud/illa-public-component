import { ReactNode } from "react"
import { DrawerDefaultConfig } from "../../interface"
import { UPGRADE_MODAL_CONFIG_KEY } from "./constants"

export type UpgradeModalType = keyof typeof UPGRADE_MODAL_CONFIG_KEY

export interface UpgradeModalProps {
  visible?: boolean
  title?: ReactNode
  from?: string
  description?: ReactNode
  configType?: UpgradeModalType
  handleLicenseDrawerVisible: (
    visible: boolean,
    drawerConfig: DrawerDefaultConfig,
  ) => void
  onCancel: () => void
  afterClose?: () => void
}
