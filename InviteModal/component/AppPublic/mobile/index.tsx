import { FC } from "react"
import {
  Button,
} from "@illa-design/react"
import { AppPublicProps } from "../interface"
import {
  inviteButtonStyle,
  inviteLinkContainer,
  inviteLinkHeaderStyle,
  inviteOptionsStyle,
  shareBlockContainerStyle,
} from "./style"
import { ReactComponent as InviteIcon } from "../../../asset/InviteLink.svg"
import { ShareBlockMobile } from "../../ShareBlock/mobile"

function getMarketLinkTemplate(appID: string): string {
  return `${process.env.ILLA_MARKET_URL}/apps/${appID}/deploy`
}

// only for marketplace share app
export const AppPublicMobile: FC<Partial<AppPublicProps>> = (props) => {
  const {
    appID = '',
    onCopyContributeLink,
  } = props


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
          Copy & invite
        </Button>
        <div css={shareBlockContainerStyle}>
          <ShareBlockMobile title="" shareUrl={getMarketLinkTemplate(appID) } />
        </div>
      </div>
    </div>
  )
}

AppPublicMobile.displayName = "AppPublicMobile"
