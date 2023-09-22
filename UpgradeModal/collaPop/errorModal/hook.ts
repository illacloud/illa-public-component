import { v4 } from "uuid"
import { ModalHandler } from "../../interface"
import { ModalShowProps } from "./interface"
import { modalStore } from "./store"

const showPayErrorModalImpl = (modal: ModalShowProps) => {
  if (!modal.id) {
    modal.id = v4()
  }
  if (!modal.visible) {
    modal.visible = true
  }
  modalStore.setModal(modal)
  return modal.id
}

const parErrorModalHandler = (type: ModalShowProps) => {
  return showPayErrorModalImpl(type)
}

export function usePayErrorModal(): ModalHandler<ModalShowProps> {
  return parErrorModalHandler
}

export const createPayErrorModal = usePayErrorModal
