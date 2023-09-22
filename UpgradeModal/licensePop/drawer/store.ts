import { v4 } from "uuid"
import { ModalStore, ModalStoreHandler, SubListener } from "../../interface"
import { DrawerShowProps } from "./interface"

// drawer
const drawerState = {
  listener: [],
  modal: null,
} as ModalStore<DrawerShowProps>

function createDrawerStore(): ModalStoreHandler<DrawerShowProps> {
  return {
    getModal: () => {
      return drawerState.modal
    },
    setModal: (modal: DrawerShowProps) => {
      drawerState.modal = modal
      drawerState.listener.forEach((listener) => {
        listener.onStoreChange()
      })
    },
    subscribe: (change) => {
      const listener = {
        listenerId: v4(),
        onStoreChange: change,
      } as SubListener
      drawerState.listener.push(listener)
      listener.onStoreChange()
      return listener
    },
    unSubscribe: (listenerId) => {
      drawerState.listener.splice(
        drawerState.listener.findIndex(
          (listener) => listener.listenerId === listenerId,
        ),
        1,
      )
    },
    update: (modal) => {
      drawerState.modal = modal
      drawerState.listener.forEach((listener) => {
        listener.onStoreChange()
      })
    },
    remove: () => {
      drawerState.modal = null
      drawerState.listener.forEach((listener) => {
        listener.onStoreChange()
      })
    },
  } as ModalStoreHandler<DrawerShowProps>
}

export const drawerStore = createDrawerStore()
