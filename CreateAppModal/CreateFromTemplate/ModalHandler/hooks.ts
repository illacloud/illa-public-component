import { v4 } from "uuid"
import { Modal } from "./interface"
import { fromTemplateStore } from "./store"

const showCreateFromTemplateImpl = (config: Modal) => {
  let modal: Modal = {
    ...config,
    id: v4(),
  }
  if (!modal.visible) {
    modal.visible = true
  }
  fromTemplateStore.setModal(modal)
  return modal.id
}

const createFromTemplateHandler = (config: Modal) => {
  return showCreateFromTemplateImpl(config)
}

export function useCreateFromTemplate() {
  return createFromTemplateHandler
}

export const createFromTemplate = useCreateFromTemplate
