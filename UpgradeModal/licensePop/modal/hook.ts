import { v4 } from "uuid"
import { ModalHandler } from "../../interface"
import { ModalShowProps } from "./interface"
import { modalStore } from "./store"

const showModalImpl = (modal: ModalShowProps) => {
  if (!modal.id) {
    modal.id = v4()
  }
  if (!modal.visible) {
    modal.visible = true
  }
  modalStore.setModal(modal)
  return modal.id
}

const modalHandler = (type: ModalShowProps) => {
  return showModalImpl(type)
}

export function useUpgradeModal(): ModalHandler<ModalShowProps> {
  return modalHandler
}

export const createUpgradeModal = useUpgradeModal
