import { ReactNode } from "react";
import { UPGRADE_MODAL_CONFIG_KEY } from "./constants";
import { DrawerDefaultConfig } from "../../interface";

export type UpgradeModalType = keyof typeof UPGRADE_MODAL_CONFIG_KEY

export interface UpgradeModalProps {
  visible?: boolean
  title?: ReactNode
  description?: ReactNode
  configType?: UpgradeModalType
  handleLicenseDrawerVisible: (
    visible: boolean,
    drawerConfig: DrawerDefaultConfig,
  ) => void
  onCancel: () => void
}