import { CollarModalType } from "../../interface"

export interface CollarModalProps {
  visible?: boolean
  modalType: CollarModalType
  from: string
  onCancel: () => void
  afterClose?: () => void
}

export interface ModalDetail {
  title: string
  desc: string[]
}
