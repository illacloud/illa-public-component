import copy from "copy-to-clipboard"
import { FC } from "react"
import { useTranslation } from "react-i18next"
import { Button, Input, useMessage } from "@illa-design/react"
import { MediaConfig, getMediaLink } from "../utils"
import {
  labelStyle,
  linkWrapperStyle,
  mediaContainerStyle,
  mediaGroupStyle,
  mediaItemIconStyle,
  mediaItemNameStyle,
  mediaItemStyle,
  wrapperStyle,
} from "./style"

export interface ShareToMediaContentProps {
  agentName: string
  agentLink: string
}

const ShareToMediaContent: FC<ShareToMediaContentProps> = (props) => {
  const { t } = useTranslation()
  const { agentName, agentLink } = props
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
    <div css={wrapperStyle}>
      <div css={mediaGroupStyle}>
        <div css={labelStyle}>{t("Share with link")}</div>
        <div css={linkWrapperStyle}>
          <Input w="100%" value={agentLink} readOnly />
          <Button w="72px" colorScheme="black" onClick={copyToShare}>
            {t("user_management.modal.link.copy")}
          </Button>
        </div>
      </div>
      <div css={mediaGroupStyle}>
        <div css={labelStyle}>{t("new_share.label.social-media")}</div>
        <div css={mediaContainerStyle}>
          {MediaConfig.map((mediaShareLink) => (
            <a
              css={mediaItemStyle}
              key={mediaShareLink.name}
              href={getMediaLink(
                mediaShareLink.name,
                t(mediaShareLink.defaultTextKey, {
                  promptName: agentName,
                  promptLink: agentLink,
                }),
                agentName,
                agentLink,
              )}
              target="_blank"
              rel="noreferrer"
            >
              <img
                css={mediaItemIconStyle}
                src={mediaShareLink.icon}
                alt="icon"
              />
              <div css={mediaItemNameStyle}>{mediaShareLink.name}</div>
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}

ShareToMediaContent.displayName = "ShareToMediaContent"

export default ShareToMediaContent
