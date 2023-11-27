import { getAgentPublicLink } from "@illa-public/utils"
import { FC } from "react"
import { useTranslation } from "react-i18next"
import { Button } from "@illa-design/react"
import InviteIcon from "../../../asset/InviteLink.svg?react"
import { ShareBlockMobile } from "../../ShareBlock/mobile"
import { AgentToMarketplaceProps } from "../interface"
import {
  inviteButtonStyle,
  inviteLinkContainer,
  inviteLinkHeaderStyle,
  inviteOptionsStyle,
  shareBlockContainerStyle,
} from "./style"

// No editing function, just for sharing.
export const AgentToMarketplaceMobile: FC<
  Pick<
    AgentToMarketplaceProps,
    "title" | "onShare" | "agentID" | "onCopyAgentMarketLink"
  >
> = (props) => {
  const { title, onShare, agentID, onCopyAgentMarketLink } = props

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
            onCopyAgentMarketLink?.(getAgentPublicLink(agentID))
          }}
        >
          {t("user_management.modal.link.copy")}
        </Button>
      </div>
      <div css={shareBlockContainerStyle}>
        <ShareBlockMobile
          onShare={onShare}
          title={title}
          shareUrl={getAgentPublicLink(agentID)}
        />
      </div>
    </div>
  )
}

AgentToMarketplaceMobile.displayName = "AgentToMarketplaceMobile"
