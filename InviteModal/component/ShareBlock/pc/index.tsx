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
  cardNameStyle,
  shareContainerStyle,
  shareGridLayoutStyle,
  shareLabelStyle,
} from "./style"

export const ShareBlockPC: FC<ShareBlockProps> = (props) => {
  return (
    <div css={shareContainerStyle}>
      <div css={shareLabelStyle}>Share Via</div>
      <div css={shareGridLayoutStyle}>
        {SocialMediaList.map((platform) => {
          const child = (
            <div
              key={platform.platform}
              css={cardContainerStyle}
              onClick={() => {}}
            >
              <div css={cardIconStyle}>{platform.icon}</div>
              <div css={cardNameStyle}>{platform.platformName}</div>
            </div>
          )
          switch (platform.platform) {
            case PlatformType.TWITTER:
              return (
                <TwitterShareButton
                  key={platform.platform}
                  url={props.shareUrl}
                >
                  {child}
                </TwitterShareButton>
              )
            case PlatformType.REDDIT:
              return (
                <RedditShareButton
                  key={platform.platform}
                  url={props.shareUrl}
                >
                  {child}
                </RedditShareButton>
              )
            case PlatformType.LINKEDIN:
              return (
                <LinkedinShareButton
                  key={platform.platform}
                  url={props.shareUrl}
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
                      `https://news.ycombinator.com/submitlink?u=${props.shareUrl}&t=${props.shareUrl}`,
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
                >
                  {child}
                </FacebookShareButton>
              )
            case PlatformType.WHATSAPP:
              return (
                <WhatsappShareButton
                  key={platform.platform}
                  url={props.shareUrl}
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

ShareBlockPC.displayName = "ShareBlockPC"