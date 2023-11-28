import { v4 } from "uuid"
import { DrawerShowProps } from "./interface"
import { drawerStore } from "./store"

const showDrawerImpl = (
  from: string,
  config: Pick<DrawerShowProps, "defaultConfig">,
) => {
  let drawer: DrawerShowProps = {
    id: v4(),
    from,
    defaultConfig: config.defaultConfig,
  }
  if (!drawer.visible) {
    drawer.visible = true
  }
  drawerStore.setModal(drawer)
  return drawer.id
}

const drawerHandler = (
  from: string,
  config: Pick<DrawerShowProps, "defaultConfig">,
) => {
  return showDrawerImpl(from, config)
}

export function useUpgradeDrawer() {
  return drawerHandler
}

export const createUpgradeDrawer = useUpgradeDrawer
