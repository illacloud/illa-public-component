import { FC, useMemo } from "react"
import { useTranslation } from "react-i18next"
import { Button, CloseIcon, Modal } from "@illa-design/react"
import {
  actionAreaStyle,
  descriptionStyle,
  modalStyle,
  titleStyle,
  modalCloseIconStyle,
  modalMaskStyle,
} from "./style"
import { InsufficientNoticeModalProps } from "./interface"
import { INSUFFICIENT_MODAL_CONFIG_KEY } from "./constants"


export const InsufficientNoticeModal: FC<InsufficientNoticeModalProps> = (
  props,
) => {
  const { visible, configType = "add-license", onCancel} = props
  const { t } = useTranslation()

  const { title, description, buttonText } = useMemo(() => {
    return INSUFFICIENT_MODAL_CONFIG_KEY[configType] ?? {}
  }, [configType])

  return (
    <Modal
      _css={modalStyle}
      withoutPadding
      maskClosable={false}
      footer={false}
      autoFocus={false}
      maskStyle={modalMaskStyle}
      visible={visible}
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
