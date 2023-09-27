import { FC } from "react"
import { useTranslation } from "react-i18next"
import { Button, Modal } from "@illa-design/react"
import { FREE_TEAM_LIMIT_TYPE } from "../../interface"
import { MODAL_TEXT } from "./constants"
import {
  descStyle,
  modalMaskStyle,
  modalStyle,
  parErrorContainerStyle,
  titleStyle,
  upgradeButtonStyle,
} from "./style"

interface TeamLimitModalProps {
  modalType: FREE_TEAM_LIMIT_TYPE
  visible?: boolean
  onCancel?: () => void
  afterClose?: () => void
}

export const TeamLimitModal: FC<TeamLimitModalProps> = ({
  visible,
  modalType,
  onCancel,
  afterClose,
}) => {
  const { t } = useTranslation()
  const { title, desc, buttonText } = MODAL_TEXT[modalType]
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
        <span css={titleStyle}>{t(title)}</span>
        <span css={descStyle}>{t(desc)}</span>
        <Button
          css={upgradeButtonStyle}
          colorScheme="techPurple"
          onClick={() => onCancel?.()}
        >
          {t(buttonText)}
        </Button>
      </div>
    </Modal>
  )
}
