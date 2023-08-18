import { FC, useMemo } from "react"
import { useTranslation } from "react-i18next"
import { Button, CloseIcon, Modal } from "@illa-design/react"
import { ReactComponent as ModalDecorate } from "../UpgradeSuccessModal/assets/success-bg.svg"
import { SUCCESS_MODAL_CONFIG_KEY } from "./constants"
import { UpgradeSuccessModalProps } from "./interface"
import {
  actionAreaStyle,
  decorateStyle,
  descriptionStyle,
  headerStyle,
  modalCloseIconStyle,
  modalMaskStyle,
  modalStyle,
  titleStyle,
} from "./style"

export const UpgradeSuccessModal: FC<UpgradeSuccessModalProps> = (props) => {
  const { visible, configType = "renew", onCancel } = props
  const { t } = useTranslation()

  const { title, description } = useMemo(() => {
    return SUCCESS_MODAL_CONFIG_KEY[configType]
  }, [configType])

  return (
    <Modal
      visible={visible}
      _css={modalStyle}
      withoutPadding
      maskClosable={false}
      footer={false}
      onCancel={onCancel}
      maskStyle={modalMaskStyle}
    >
      <div css={modalCloseIconStyle} onClick={onCancel}>
        <CloseIcon size="12px" />
      </div>
      <ModalDecorate css={decorateStyle} />
      <div css={headerStyle}>
        <div css={titleStyle}>{t(title)}</div>
        <div css={descriptionStyle}>{t(description)}</div>
      </div>
      <div css={actionAreaStyle}>
        <Button colorScheme="techPurple" size="large" onClick={onCancel}>
          {t("billing.modal.sub_suc.got_it")}
        </Button>
      </div>
    </Modal>
  )
}

UpgradeSuccessModal.displayName = "UpgradeSuccessModal"
