import { FC } from "react"
import { useTranslation } from "react-i18next"
import { Button } from "@illa-design/react"
import { ReactComponent as InviteIcon } from "../../../asset/InviteLink.svg"
import { ShareBlockMobile } from "../../ShareBlock/mobile"
import { AppPublicProps } from "../interface"
import {
  inviteButtonStyle,
  inviteLinkContainer,
  inviteLinkHeaderStyle,
  inviteOptionsStyle,
  shareBlockContainerStyle,
} from "./style"
import { getMarketLinkTemplate } from "../../../utils"

// only for marketplace share app
export const AppPublicMobile: FC<Partial<AppPublicProps>> = (props) => {
  const { appID = "", onCopyContributeLink } = props

  const { t } = useTranslation()

  return (
    <div css={inviteLinkContainer}>
      <div css={inviteLinkHeaderStyle}>
        <InviteIcon />
      </div>
      <div css={inviteOptionsStyle}>
        <Button
          _css={inviteButtonStyle}
          colorScheme="techPurple"
          fullWidth
          onClick={() => {
            onCopyContributeLink?.(getMarketLinkTemplate(appID))
          }}
        >
          {t('user_management.modal.link.copy')}
        </Button>
        <div css={shareBlockContainerStyle}>
          <ShareBlockMobile
            title={t("user_management.modal.social_media.default_text.app")}
            shareUrl={getMarketLinkTemplate(appID)}
          />
        </div>
      </div>
    </div>
  )
}

AppPublicMobile.displayName = "AppPublicMobile"
