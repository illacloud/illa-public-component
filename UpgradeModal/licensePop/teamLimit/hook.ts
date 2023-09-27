import { v4 } from "uuid"
import { ModalHandler } from "../../interface"
import { ModalShowProps } from "./interface"
import { modalStore } from "./store"

const showTeamLimitModalImpl = (modal: ModalShowProps) => {
  if (!modal.id) {
    modal.id = v4()
  }
  if (!modal.visible) {
    modal.visible = true
  }
  modalStore.setModal(modal)
  return modal.id
}

const teamLimitModalHandler = (type: ModalShowProps) => {
  return showTeamLimitModalImpl(type)
}

export function useTeamLimitModal(): ModalHandler<ModalShowProps> {
  return teamLimitModalHandler
}

export const createTeamLimitModal = useTeamLimitModal
