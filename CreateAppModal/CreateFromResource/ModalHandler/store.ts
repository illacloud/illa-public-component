import { v4 } from "uuid"
import { Modal, ModalStore, ModalStoreHandler, SubListener } from "./interface"

const createFromResourceState = {
  listener: [],
  modal: null,
} as ModalStore

function createFromResourceStore(): ModalStoreHandler {
  return {
    getModal: () => {
      return createFromResourceState.modal
    },
    setModal: (modal: Modal) => {
      createFromResourceState.modal = modal
      createFromResourceState.listener.forEach((listener) => {
        listener.onStoreChange()
      })
    },
    subscribe: (change) => {
      const listener = {
        listenerId: v4(),
        onStoreChange: change,
      } as SubListener
      createFromResourceState.listener.push(listener)
      listener.onStoreChange()
      return listener
    },
    unSubscribe: (listenerId) => {
      createFromResourceState.listener.splice(
        createFromResourceState.listener.findIndex(
          (listener) => listener.listenerId === listenerId,
        ),
        1,
      )
    },
    update: (modal) => {
      createFromResourceState.modal = modal
      createFromResourceState.listener.forEach((listener) => {
        listener.onStoreChange()
      })
    },
    remove: () => {
      createFromResourceState.modal = null
      createFromResourceState.listener.forEach((listener) => {
        listener.onStoreChange()
      })
    },
  } as ModalStoreHandler
}

export const fromResourceStore = createFromResourceStore()
