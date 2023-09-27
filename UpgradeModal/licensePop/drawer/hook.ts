import { v4 } from "uuid"
import { ModalHandler } from "../../interface"
import { DrawerShowProps } from "./interface"
import { drawerStore } from "./store"

const showDrawerImpl = (drawer: DrawerShowProps) => {
  if (!drawer.id) {
    drawer.id = v4()
  }
  if (!drawer.visible) {
    drawer.visible = true
  }
  drawerStore.setModal(drawer)
  return drawer.id
}

const drawerHandler = (config: Pick<DrawerShowProps, "defaultConfig">) => {
  return showDrawerImpl(config)
}

export function useUpgradeDrawer(): ModalHandler<DrawerShowProps> {
  return drawerHandler
}

export const createUpgradeDrawer = useUpgradeDrawer
