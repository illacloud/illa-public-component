import { UpgradeIcon } from "@illa-public/icon"
import { FC } from "react"
import { useTranslation } from "react-i18next"
import { Button, Modal } from "@illa-design/react"
import { useCollarDrawer } from "../../hook"
import { CollarModalType } from "../../interface"
import { PAY_ERROR_TEXT } from "./constants"
import {
  descStyle,
  modalMaskStyle,
  modalStyle,
  parErrorContainerStyle,
  titleStyle,
  upgradeButtonStyle,
} from "./style"

interface PayErrorModalProps {
  modalType: CollarModalType
  visible?: boolean
  onCancel?: () => void
  afterClose?: () => void
}

export const PayErrorModal: FC<PayErrorModalProps> = ({
  visible,
  modalType = CollarModalType.TOKEN,
  onCancel,
  afterClose,
}) => {
  const openCollaDrawer = useCollarDrawer()

  const handleClick = () => {
    onCancel?.()
    openCollaDrawer()
  }
  const { t } = useTranslation()
  return (
    <Modal
      z={2000}
      visible={visible}
      _css={modalStyle}
      withoutPadding
      footer={false}
      onCancel={onCancel}
      maskStyle={modalMaskStyle}
      afterClose={afterClose}
      maskClosable
    >
      <div css={parErrorContainerStyle}>
        <span css={titleStyle}>
          {t("billing.modal.colla_insufficient_modal.failed.title")}
        </span>
        <span css={descStyle}>{t(PAY_ERROR_TEXT[modalType])}</span>
        <Button
          css={upgradeButtonStyle}
          leftIcon={<UpgradeIcon />}
          colorScheme="techPurple"
          onClick={handleClick}
        >
          {t("billing.modal.colla_insufficient_modal.failed.button")}
        </Button>
      </div>
    </Modal>
  )
}
