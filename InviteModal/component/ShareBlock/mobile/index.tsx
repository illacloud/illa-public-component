import React, { FC } from "react"
import {
  FacebookShareButton,
  LinkedinShareButton,
  RedditShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share"
import { PlatformType, ShareBlockProps, SocialMediaList } from "../interface"
import {
  cardContainerStyle,
  cardIconStyle,
  shareContainerStyle,
  shareIconContainerStyle,
  shareLabelStyle,
} from "./style"
import { useTranslation } from "react-i18next"

export const ShareBlockMobile: FC<ShareBlockProps> = (props) => {
  const { title, shareUrl } = props
  const { t } = useTranslation()
  return (
    <div css={shareContainerStyle}>
      <div css={shareLabelStyle}>{t('user_management.modal.social_media.label')}</div>
      <div css={shareIconContainerStyle}>
        {SocialMediaList.map((platform) => {
          const child = (
            <div
              key={platform.platform}
              css={cardContainerStyle}
              onClick={() => {}}
            >
              <div css={cardIconStyle}>{platform.icon}</div>
            </div>
          )
          switch (platform.platform) {
            case PlatformType.X:
              return (
                <TwitterShareButton
                  key={platform.platform}
                  url={props.shareUrl}
                  title={title}
                >
                  {child}
                </TwitterShareButton>
              )
            case PlatformType.REDDIT:
              return (
                <RedditShareButton
                  key={platform.platform}
                  url={props.shareUrl}
                  title={title}
                >
                  {child}
                </RedditShareButton>
              )
            case PlatformType.LINKEDIN:
              return (
                <LinkedinShareButton
                  key={platform.platform}
                  url={props.shareUrl}
                  title={title}
                >
                  {child}
                </LinkedinShareButton>
              )
            case PlatformType.HACKER_NEWS:
              return (
                <div
                  key={platform.platform}
                  onClick={() => {
                    window.open(
                      `https://news.ycombinator.com/submitlink?u=${shareUrl}&t=${title}`,
                      "_blank",
                    )
                  }}
                >
                  {child}
                </div>
              )
            case PlatformType.FACEBOOK:
              return (
                <FacebookShareButton
                  key={platform.platform}
                  url={props.shareUrl}
                  title={title}
                >
                  {child}
                </FacebookShareButton>
              )
            case PlatformType.WHATSAPP:
              return (
                <WhatsappShareButton
                  key={platform.platform}
                  url={props.shareUrl}
                  title={title}
                >
                  {child}
                </WhatsappShareButton>
              )
            default:
              return null
          }
        })}
      </div>
    </div>
  )
}

ShareBlockMobile.displayName = "ShareBlockMobile"