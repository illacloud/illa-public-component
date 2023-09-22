import { v4 } from "uuid"
import { ModalStore, ModalStoreHandler, SubListener } from "../interface"
import { StorageDrawerShowProps } from "./interface"

const drawerState = {
  listener: [],
  modal: null,
} as ModalStore<StorageDrawerShowProps>

function createDrawerStore(): ModalStoreHandler<StorageDrawerShowProps> {
  return {
    getModal: () => {
      return drawerState.modal
    },
    setModal: (modal: StorageDrawerShowProps) => {
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
  } as ModalStoreHandler<StorageDrawerShowProps>
}

export const drawerStore = createDrawerStore()
