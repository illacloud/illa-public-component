import { v4 } from "uuid"
import { ModalHandler } from "../../interface"
import { ModalShowProps } from "./interface"
import { modalStore } from "./store"

const showCollarModalImpl = (modal: ModalShowProps) => {
  if (!modal.id) {
    modal.id = v4()
  }
  if (!modal.visible) {
    modal.visible = true
  }
  modalStore.setModal(modal)
  return modal.id
}

const collarModalHandler = (type: ModalShowProps) => {
  return showCollarModalImpl(type)
}

export function useCollarModal(): ModalHandler<ModalShowProps> {
  return collarModalHandler
}

export const createCollarModal = useCollarModal
