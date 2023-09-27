import { v4 } from "uuid"
import { ModalHandler } from "../interface"
import { StorageDrawerShowProps } from "./interface"
import { drawerStore } from "./store"

const showDrawerImpl = (drawer: StorageDrawerShowProps) => {
  if (!drawer.id) {
    drawer.id = v4()
  }
  if (!drawer.visible) {
    drawer.visible = true
  }
  drawerStore.setModal(drawer)
  return drawer.id
}

const drawerHandler = (config: Pick<StorageDrawerShowProps, "config">) => {
  return showDrawerImpl(config)
}

export function useStorageDrawer(): ModalHandler<StorageDrawerShowProps> {
  return drawerHandler
}

export const createStorageDrawer = useStorageDrawer
