import { CreateFromTemplateProps } from "../interface"

export type Modal = {
  id?: string
} & CreateFromTemplateProps

export interface SubListener {
  listenerId: string
  onStoreChange: () => void
}

export interface ModalStore {
  listener: SubListener[]
  modal: Modal | null
}

export interface ModalHandler {
  (modal: Modal): string
}

export interface ModalStoreHandler {
  getModal: () => Modal
  setModal: (modal: Modal) => void
  subscribe: (onStoreChange: () => void) => SubListener
  unSubscribe: (listenerId: string) => void
  remove: () => void
  update: (modal: Modal) => void
}
