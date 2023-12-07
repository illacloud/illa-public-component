import {
  ILLA_MIXPANEL_EVENT_TYPE,
  MixpanelTrackContext,
} from "@illa-public/mixpanel-utils"
import { USER_ROLE } from "@illa-public/public-types"
import { isBiggerThanTargetRole } from "@illa-public/user-role-utils"
import { getAgentPublicLink } from "@illa-public/utils"
import { FC, useContext, useState } from "react"
import { useTranslation } from "react-i18next"
import {
  BindIcon,
  Button,
  PenIcon,
  Switch,
  getColor,
  useMergeValue,
  useMessage,
} from "@illa-design/react"
import { ContributeAgentPC } from "../../../ContributeAgent/pc"
import { HASHTAG_REQUEST_TYPE } from "../../../constants"
import { ShareBlockPC } from "../../ShareBlock/pc"
import { AgentToMarketplaceProps } from "../interface"
import { fetchRemoveToMarketplace, makeAgentContribute } from "../service"
import {
  blockContainerStyle,
  blockLabelStyle,
  contributingDocStyle,
  linkCopyContainer,
  publicContainerStyle,
} from "./style"

export const AgentToMarketplacePC: FC<AgentToMarketplaceProps> = (props) => {
  const {
    title,
    defaultAgentContributed,
    onAgentContributed,
    userRoleForThisAgent,
    agentID,
    onShare,
    onCopyAgentMarketLink,
    ownerTeamID,
  } = props

  const [agentContributed, setAgentContributed] = useMergeValue(
    defaultAgentContributed,
    {
      defaultValue: defaultAgentContributed,
    },
  )

  const [isOpenContributeModal, setIsOpenContributeModal] = useState(false)

  const [agentContributedLoading, setAgentContributedLoading] = useState(false)
  const { track } = useContext(MixpanelTrackContext)

  const { t } = useTranslation()

  const message = useMessage()

  return (
    <>
      <div css={publicContainerStyle}>
        {(isBiggerThanTargetRole(
          USER_ROLE.VIEWER,
          userRoleForThisAgent,
          false,
        ) ||
          agentContributed) && (
          <div css={blockContainerStyle}>
            <div css={blockLabelStyle}>
              {t("user_management.modal.contribute.label")}
            </div>
            <div
              style={{
                flexGrow: 1,
              }}
            />
            {isBiggerThanTargetRole(
              USER_ROLE.VIEWER,
              userRoleForThisAgent,
              false,
            ) && (
              <Switch
                checked={agentContributed}
                colorScheme={getColor("grayBlue", "02")}
                onChange={async (value) => {
                  track?.(ILLA_MIXPANEL_EVENT_TYPE.CLICK, {
                    element: "share_modal_contribute_switch",
                    parameter2: !value,
                    parameter5: agentID,
                  })
                  setAgentContributed(value)
                  try {
                    setAgentContributedLoading(true)
                    if (value) {
                      await makeAgentContribute(ownerTeamID, agentID)
                    } else {
                      await fetchRemoveToMarketplace(ownerTeamID, agentID)
                    }
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
            )}
          </div>
        )}
        {agentContributed ? (
          <div css={linkCopyContainer}>
            {isBiggerThanTargetRole(
              USER_ROLE.VIEWER,
              userRoleForThisAgent,
              false,
            ) && (
              <Button
                mr="8px"
                flexGrow="1"
                variant="outline"
                colorScheme="grayBlue"
                leftIcon={<PenIcon />}
                onClick={() => {
                  setIsOpenContributeModal(true)
                }}
              >
                {t("contribute.update")}
              </Button>
            )}
            <Button
              flexGrow="1"
              variant="outline"
              leftIcon={<BindIcon />}
              colorScheme="grayBlue"
              onClick={() => {
                onCopyAgentMarketLink?.(getAgentPublicLink(agentID))
              }}
            >
              {t("user_management.modal.link.copy")}
            </Button>
          </div>
        ) : (
          <div css={contributingDocStyle}>
            {t("user_management.modal.contribute.desc")}
          </div>
        )}
        {agentContributed && (
          <ShareBlockPC
            onShare={onShare}
            title={title}
            shareUrl={getAgentPublicLink(agentID)}
          />
        )}
      </div>
      {isOpenContributeModal && (
        <ContributeAgentPC
          onContributed={props.onAgentContributed}
          teamID={ownerTeamID}
          onClose={() => {
            setIsOpenContributeModal(false)
          }}
          productID={agentID}
          productType={HASHTAG_REQUEST_TYPE.UNIT_TYPE_AI_AGENT}
          productContributed={agentContributed}
        />
      )}
    </>
  )
}

AgentToMarketplacePC.displayName = "AgentToMarketplacePC"
