import { FC, useMemo } from "react"
import { useTranslation } from "react-i18next"
import { Button, CloseIcon, Modal } from "@illa-design/react"
import { INSUFFICIENT_MODAL_CONFIG_KEY } from "./constants"
import { InsufficientNoticeModalProps } from "./interface"
import {
  actionAreaStyle,
  descriptionStyle,
  modalCloseIconStyle,
  modalMaskStyle,
  modalStyle,
  titleStyle,
} from "./style"

export const InsufficientNoticeModal: FC<InsufficientNoticeModalProps> = (
  props,
) => {
  const { visible, configType = "add-license", onCancel, afterClose } = props
  const { t } = useTranslation()

  const { title, description, buttonText } = useMemo(() => {
    return INSUFFICIENT_MODAL_CONFIG_KEY[configType] ?? {}
  }, [configType])

  return (
    <Modal
      z={2000}
      _css={modalStyle}
      withoutPadding
      maskClosable={false}
      footer={false}
      autoFocus={false}
      maskStyle={modalMaskStyle}
      visible={visible}
      afterClose={afterClose}
    >
      <div css={modalCloseIconStyle} onClick={onCancel}>
        <CloseIcon size="12px" />
      </div>
      <div css={titleStyle}>{t(title)}</div>
      <div css={descriptionStyle}>{t(description)}</div>
      <div css={actionAreaStyle}>
        <Button colorScheme="techPurple" onClick={onCancel}>
          {t(buttonText)}
        </Button>
      </div>
    </Modal>
  )
}

InsufficientNoticeModal.displayName = "InsufficientNoticeModal"
