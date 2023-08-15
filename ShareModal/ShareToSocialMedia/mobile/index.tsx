import { pxToRem } from "@illa-public/utils"
import copy from "copy-to-clipboard"
import { FC } from "react"
import { useTranslation } from "react-i18next"
import {
  Button,
  CloseIcon,
  Divider,
  Drawer,
  useMessage,
} from "@illa-design/react"
import { ReactComponent as LinkIcon } from "../../assets/link.svg"
import ShareToMediaContentMobile from "../../components/ShareToMediaContent/mobile"
import { ShareToSocialMediaMobileProps } from "../interface"
import {
  closeIconContainerStyle,
  closeIconStyle,
  linkButtonStyle,
  linkIconStyle,
  linkStyle,
  mediaGroupStyle,
  shareModalStyle,
  wrapperStyle,
} from "./style"

const ShareToSocialMediaMobile: FC<ShareToSocialMediaMobileProps> = (props) => {
  const { t } = useTranslation()
  const { agentName, agentLink, visible, onCancel } = props
  const message = useMessage()

  const copyToShare = () => {
    const copyReturned = copy(
      t("new_share.default-text.contribute", {
        promptName: agentName,
        promptLink: agentLink,
      }),
    )
    if (copyReturned) {
      message.success({
        content: t("user_management.modal.link.copied_suc"),
      })
    } else {
      message.error({
        content: t("user_management.modal.link.failed_to_copy"),
      })
    }
  }

  return (
    <Drawer
      _css={shareModalStyle}
      w="100%"
      bdRadius={`${pxToRem(24)} ${pxToRem(24)}  0 0`}
      placement="bottom"
      maskClosable={false}
      closable={false}
      footer={false}
      autoFocus={false}
      onCancel={onCancel}
      visible={visible}
    >
      <CloseIcon
        css={closeIconStyle}
        onClick={onCancel}
        containerStyle={closeIconContainerStyle}
      />
      <div css={wrapperStyle}>
        <div>
          <div css={mediaGroupStyle}>
            <LinkIcon css={linkIconStyle} />
            <div css={linkStyle}>{agentLink}</div>
          </div>

          <Button
            _css={linkButtonStyle}
            fullWidth
            colorScheme="techPurple"
            onClick={copyToShare}
          >
            Copy Link
          </Button>
        </div>
        <Divider mb={`${pxToRem(40)}`} />
        <ShareToMediaContentMobile
          agentLink={agentLink}
          agentName={agentName}
        />
      </div>
    </Drawer>
  )
}

ShareToSocialMediaMobile.displayName = "ShareToSocialMediaMobile"

export default ShareToSocialMediaMobile
