import { v4 } from "uuid"
import { ModalStore, ModalStoreHandler, SubListener } from "../../interface"
import { ModalShowProps } from "./interface"

// modal
const modalState = {
  listener: [],
  modal: null,
} as ModalStore<ModalShowProps>

function createModalStore(): ModalStoreHandler<ModalShowProps> {
  return {
    getModal: () => {
      return modalState.modal
    },
    setModal: (modal: ModalShowProps) => {
      modalState.modal = modal
      modalState.listener.forEach((listener) => {
        listener.onStoreChange()
      })
    },
    subscribe: (change) => {
      const listener = {
        listenerId: v4(),
        onStoreChange: change,
      } as SubListener
      modalState.listener.push(listener)
      listener.onStoreChange()
      return listener
    },
    unSubscribe: (listenerId) => {
      modalState.listener.splice(
        modalState.listener.findIndex(
          (listener) => listener.listenerId === listenerId,
        ),
        1,
      )
    },
    update: (modal) => {
      modalState.modal = modal
      modalState.listener.forEach((listener) => {
        listener.onStoreChange()
      })
    },
    remove: () => {
      modalState.modal = null
      modalState.listener.forEach((listener) => {
        listener.onStoreChange()
      })
    },
  } as ModalStoreHandler<ModalShowProps>
}

export const modalStore = createModalStore()
