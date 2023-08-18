import { v4 } from "uuid"
import { DrawerHandler, DrawerShowProps, ModalHandler, ModalShowProps } from "./interface"
import {  drawerStore, modalStore } from "./store"

// drawer
const showDrawerImpl = (drawer: DrawerShowProps) => {
  if (
    drawerStore.getDrawers().length > 5
  ) {
    drawerStore.getDrawers().shift()
  }
  if (!drawer.id) {
    drawer.id = v4()
  }
  if (!drawer.visible) {
    drawer.visible = true
  }
  drawerStore.add(drawer)
  return drawer.id
}

const drawerHandler = (config: Pick<DrawerShowProps, "defaultConfig">) => {
  return showDrawerImpl(config)
}

export function useUpgradeDrawer(): DrawerHandler {
  return drawerHandler
}

export const createUpgradeDrawer = useUpgradeDrawer

// modal
const showModalImpl = (modal: ModalShowProps) => {
  if (
    modalStore.getModals().length > 5
  ) {
    modalStore.getModals().shift()
  }
  if (!modal.id) {
    modal.id = v4()
  }
  if (!modal.visible) {
    modal.visible = true
  }
  modalStore.add(modal)
  return modal.id
}

const modalHandler = (type: ModalShowProps) => {
  return showModalImpl(type)
}

export function useUpgradeModal(): ModalHandler {
  return modalHandler
}

export const createUpgradeModal = useUpgradeModal