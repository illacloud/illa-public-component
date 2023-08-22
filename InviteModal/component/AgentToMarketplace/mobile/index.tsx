import { USER_ROLE } from "@illa-public/user-data"
import { isBiggerThanTargetRole } from "@illa-public/user-role-utils"
import { FC, useCallback, useState } from "react"
import { useTranslation } from "react-i18next"
import { Button, useMergeValue, useMessage } from "@illa-design/react"
import { ReactComponent as DisableInviteIcon } from "../../../asset/DisableInviteLink.svg"
import { ReactComponent as InviteIcon } from "../../../asset/InviteLink.svg"
import { ShareBlockMobile } from "../../ShareBlock/mobile"
import { AgentToMarketplaceProps } from "../interface"
import { makeAgentContribute } from "../service"
import {
  inviteButtonStyle,
  inviteLinkContainer,
  inviteLinkDisableHeaderStyle,
  inviteLinkHeaderStyle,
  inviteOptionsStyle,
  shareBlockContainerStyle,
} from "./style"
import { getAgentPublicLink } from "../../../utils"

export const AgentToMarketplaceMobile: FC<AgentToMarketplaceProps> = (
  props,
) => {
  const {
    defaultAgentContributed,
    onAgentContributed,
    userRoleForThisAgent,
    agentID,
    onCopyAgentMarketLink,
    ownerTeamID,
  } = props

  const [agentContributed, setAgentContributed] = useMergeValue(
    defaultAgentContributed,
    {
      defaultValue: defaultAgentContributed,
    },
  )

  const [agentContributedLoading, setAgentContributedLoading] = useState(false)
  const message = useMessage()

  const { t } = useTranslation()

  const handleAgentContribute = useCallback(
    async (value: boolean) => {
      setAgentContributedLoading(true)
      setAgentContributed(value)
      try {
        await makeAgentContribute(ownerTeamID, agentID)
        onAgentContributed?.(value)
      } catch (e) {
        message.error({
          content: t('user_management.modal.message.make_public_failed'),
        })
        setAgentContributed(!value)
      } finally {
        setAgentContributedLoading(false)
      }
    },
    [agentID, message, onAgentContributed, ownerTeamID, setAgentContributed, t],
  )

  return (
    <div css={inviteLinkContainer}>
      {agentContributed ? (
        <>
          <div css={inviteLinkHeaderStyle}>
            <InviteIcon />
          </div>
          <div css={inviteOptionsStyle}>
            <Button
              _css={inviteButtonStyle}
              colorScheme="techPurple"
              fullWidth
              loading={agentContributedLoading}
              onClick={() => {
                onCopyAgentMarketLink?.(getAgentPublicLink(agentID))
              }}
            >
              {t("user_management.modal.link.copy")}
            </Button>
            {isBiggerThanTargetRole(
              USER_ROLE.VIEWER,
              userRoleForThisAgent,
              false,
            ) && (
              <Button
                _css={inviteButtonStyle}
                colorScheme="grayBlue"
                variant="text"
                fullWidth
                loading={agentContributedLoading}
                onClick={() => {
                  handleAgentContribute(false)
                }}
              >
                {t('user_management.modal.contribute.turn_off')}
              </Button>
            )}
          </div>
          <div css={shareBlockContainerStyle}>
            <ShareBlockMobile
              title={t("user_management.modal.social_media.default_text.agent")}
              shareUrl={getAgentPublicLink(agentID)}
            />
          </div>
        </>
      ) : (
        <>
          <div css={inviteLinkDisableHeaderStyle}>
            <DisableInviteIcon />
          </div>
          {isBiggerThanTargetRole(
            USER_ROLE.VIEWER,
            userRoleForThisAgent,
            false,
          ) && (
            <Button
              _css={inviteButtonStyle}
              colorScheme="techPurple"
              fullWidth
              loading={agentContributedLoading}
              onClick={() => {
                handleAgentContribute(true)
              }}
            >
              {t('user_management.modal.contribute.label')}
            </Button>
          )}
        </>
      )}
    </div>
  )
}

AgentToMarketplaceMobile.displayName = "AgentToMarketplaceMobile"
