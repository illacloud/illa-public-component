import { CloseIcon, Modal, ModalProps } from "@illa-design/react"
import { FC } from "react"
import { useTranslation } from "react-i18next"
import { ReactComponent as ModalDecorate } from "@/illa-public-component/UpgradeModal/assets/upgrad-modal-bg.svg"
import { modalStyle } from "@/illa-public-component/UpgradeModal/style"
import {
  modalCloseIconStyle,
  modalMaskStyle,
} from "@/page/workspace/components/CreateTeamModal/style"

interface UpgradeModalProps extends ModalProps {}

export const UpgradeModal: FC<UpgradeModalProps> = (props) => {
  const { onCancel, ...otherProps } = props
  const { t } = useTranslation()

  return (
    <Modal
      _css={modalStyle}
      maskClosable={false}
      footer={false}
      onCancel={onCancel}
      maskStyle={modalMaskStyle}
      {...otherProps}
    >
      <div css={modalCloseIconStyle} onClick={onCancel}>
        <CloseIcon size="12px" />
      </div>
      <ModalDecorate />
    </Modal>
  )
}

UpgradeModal.displayName = "UpgradeModal"
