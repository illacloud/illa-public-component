import { v4 } from "uuid"
import { Modal, ModalStore, ModalStoreHandler, SubListener } from "./interface"

const createFromTemplateState = {
  listener: [],
  modal: null,
} as ModalStore

function createFromTemplateStore(): ModalStoreHandler {
  return {
    getModal: () => {
      return createFromTemplateState.modal
    },
    setModal: (modal: Modal) => {
      createFromTemplateState.modal = modal
      createFromTemplateState.listener.forEach((listener) => {
        listener.onStoreChange()
      })
    },
    subscribe: (change) => {
      const listener = {
        listenerId: v4(),
        onStoreChange: change,
      } as SubListener
      createFromTemplateState.listener.push(listener)
      listener.onStoreChange()
      return listener
    },
    unSubscribe: (listenerId) => {
      createFromTemplateState.listener.splice(
        createFromTemplateState.listener.findIndex(
          (listener) => listener.listenerId === listenerId,
        ),
        1,
      )
    },
    update: (modal) => {
      createFromTemplateState.modal = modal
      createFromTemplateState.listener.forEach((listener) => {
        listener.onStoreChange()
      })
    },
    remove: () => {
      createFromTemplateState.modal = null
      createFromTemplateState.listener.forEach((listener) => {
        listener.onStoreChange()
      })
    },
  } as ModalStoreHandler
}

export const fromTemplateStore = createFromTemplateStore()
