import { FC } from "react"
import { useTranslation } from "react-i18next"
import { MediaConfig, getMediaLink } from "../utils"
import {
  mediaContainerStyle,
  mediaGroupStyle,
  mediaItemIconStyle,
  mediaItemStyle,
  mediaTitleStyle,
} from "./style"

export interface ShareToMediaContentProps {
  agentName: string
  agentLink: string
}

const ShareToMediaContent: FC<ShareToMediaContentProps> = (props) => {
  const { t } = useTranslation()
  const { agentName, agentLink } = props

  return (
    <div css={mediaGroupStyle}>
      <div css={mediaTitleStyle}>{t("share via")}</div>
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
          </a>
        ))}
      </div>
    </div>
  )
}

ShareToMediaContent.displayName = "ShareToMediaContent"

export default ShareToMediaContent
