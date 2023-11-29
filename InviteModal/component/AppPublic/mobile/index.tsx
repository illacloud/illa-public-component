import { getMarketLinkTemplate } from "@illa-public/utils"
import { FC } from "react"
import { useTranslation } from "react-i18next"
import { Button } from "@illa-design/react"
import InviteIcon from "../../../asset/InviteLink.svg?react"
import { ShareBlockMobile } from "../../ShareBlock/mobile"
import { AppPublicProps } from "../interface"
import {
  inviteButtonStyle,
  inviteLinkContainer,
  inviteLinkHeaderStyle,
  inviteOptionsStyle,
  shareBlockContainerStyle,
} from "./style"

// only for marketplace share app
export const AppPublicMobile: FC<Partial<AppPublicProps>> = (props) => {
  const { appID = "", onCopyContributeLink, onShare, title = "" } = props

  const { t } = useTranslation()

  return (
    <div css={inviteLinkContainer}>
      <div css={inviteLinkHeaderStyle}>
        <InviteIcon />
      </div>
      <div css={inviteOptionsStyle}>
        <Button
          css={inviteButtonStyle}
          colorScheme="techPurple"
          fullWidth
          onClick={() => {
            onCopyContributeLink?.(getMarketLinkTemplate(appID))
          }}
        >
          {t("user_management.modal.link.copy")}
        </Button>
        <div css={shareBlockContainerStyle}>
          <ShareBlockMobile
            onShare={onShare}
            title={title}
            shareUrl={getMarketLinkTemplate(appID)}
          />
        </div>
      </div>
    </div>
  )
}

AppPublicMobile.displayName = "AppPublicMobile"
