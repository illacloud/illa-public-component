import { USER_ROLE } from "@illa-public/user-data"
import { isBiggerThanTargetRole } from "@illa-public/user-role-utils"
import { getAgentPublicLink } from "@illa-public/utils"
import { FC, useState } from "react"
import { useTranslation } from "react-i18next"
import {
  Button,
  Input,
  Skeleton,
  Switch,
  getColor,
  useMergeValue,
  useMessage,
} from "@illa-design/react"
import { ShareBlockPC } from "../../ShareBlock/pc"
import { AgentToMarketplaceProps } from "../interface"
import { makeAgentContribute } from "../service"
import {
  blockContainerStyle,
  blockLabelStyle,
  contributingDocStyle,
  linkCopyContainer,
  publicContainerStyle,
} from "./style"

export const AgentToMarketplacePC: FC<AgentToMarketplaceProps> = (props) => {
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

  const { t } = useTranslation()

  const message = useMessage()

  return (
    <div css={publicContainerStyle}>
      {isBiggerThanTargetRole(
        USER_ROLE.VIEWER,
        userRoleForThisAgent,
        false,
      ) && (
        <div css={blockContainerStyle}>
          <div css={blockLabelStyle}>
            {t("user_management.modal.contribute.label")}
          </div>
          <div
            style={{
              flexGrow: 1,
            }}
          />
          <Switch
            checked={agentContributed}
            colorScheme={getColor("grayBlue", "02")}
            onChange={async (value) => {
              setAgentContributedLoading(true)
              setAgentContributed(value)
              try {
                await makeAgentContribute(ownerTeamID, agentID)
                onAgentContributed?.(value)
              } catch (e) {
                message.error({
                  content: t(
                    "user_management.modal.message.make_public_failed",
                  ),
                })
                setAgentContributed(!value)
              } finally {
                setAgentContributedLoading(false)
              }
            }}
          />
        </div>
      )}
      {agentContributed ? (
        <div css={linkCopyContainer}>
          <Input
            flexShrink="1"
            flexGrow="1"
            w="unset"
            readOnly
            colorScheme="techPurple"
            value={
              agentContributedLoading ? (
                <Skeleton text={{ rows: 1, width: 280 }} opac={0.5} animation />
              ) : (
                getAgentPublicLink(agentID)
              )
            }
          />
          <Button
            ml="8px"
            w="80px"
            colorScheme={getColor("grayBlue", "02")}
            loading={agentContributedLoading}
            onClick={() => {
              onCopyAgentMarketLink?.(getAgentPublicLink(agentID))
            }}
          >
            {!agentContributedLoading
              ? t("user_management.modal.link.copy")
              : undefined}
          </Button>
        </div>
      ) : (
        <div css={contributingDocStyle}>
          {t("user_management.modal.contribute.desc")}
        </div>
      )}
      {agentContributed && (
        <>
          <div
            style={{
              height: 16,
            }}
          />
          <ShareBlockPC
            title={t("user_management.modal.social_media.default_text.agent")}
            shareUrl={getAgentPublicLink(agentID)}
          />
        </>
      )}
    </div>
  )
}

AgentToMarketplacePC.displayName = "AgentToMarketplacePC"
