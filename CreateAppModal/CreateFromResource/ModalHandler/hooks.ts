import { v4 } from "uuid"
import { Modal } from "./interface"
import { fromResourceStore } from "./store"

const showCreateFromResourceImpl = (config: Modal) => {
  let modal: Modal = {
    ...config,
    id: v4(),
  }
  if (!modal.visible) {
    modal.visible = true
  }
  fromResourceStore.setModal(modal)
  return modal.id
}

const createFromResourceHandler = (config: Modal) => {
  return showCreateFromResourceImpl(config)
}

export function useCreateFromResource() {
  return createFromResourceHandler
}

export const createFromResource = useCreateFromResource
