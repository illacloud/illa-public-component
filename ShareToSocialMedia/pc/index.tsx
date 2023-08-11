import { FC } from "react"
import { useTranslation } from "react-i18next"
import { CloseIcon, Divider, Modal } from "@illa-design/react"
import { ShareToSocialMediaMobileProps } from "../mobile"
import ShareToMediaContent from "./ShareToMediaContent"
import {
  closeIconStyle,
  headerWrapperStyle,
  modalMaskStyle,
  modalStyle,
} from "./style"

const ShareToSocialMediaPC: FC<ShareToSocialMediaMobileProps> = (props) => {
  const { t } = useTranslation()
  const { agentName, agentLink, visible, onCancel } = props

  return (
    <Modal
      _css={modalStyle}
      withoutPadding
      maskClosable={false}
      footer={false}
      autoFocus={false}
      onCancel={onCancel}
      maskStyle={modalMaskStyle}
      visible={visible}
    >
      <header css={headerWrapperStyle}>
        <div>{t("share")}</div>
        <CloseIcon css={closeIconStyle} onClick={onCancel} />
      </header>
      <Divider />
      <ShareToMediaContent agentLink={agentLink} agentName={agentName} />
    </Modal>
  )
}

ShareToSocialMediaPC.displayName = "ShareToSocialMediaPC"

export default ShareToSocialMediaPC
