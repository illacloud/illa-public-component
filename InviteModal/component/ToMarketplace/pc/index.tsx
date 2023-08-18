import { USER_ROLE } from "@illa-public/user-data"
import { isSmallThanTargetRole } from "@illa-public/user-role-utils"
import { FC, useState } from "react"
import { useTranslation } from "react-i18next"
import {
  Button,
  Input,
  Skeleton,
  Switch,
  getColor,
  useMergeValue,
} from "@illa-design/react"
import { ToMarketplaceProps } from "../interface"
import {
  blockContainerStyle,
  blockLabelStyle,
  contributingDocStyle,
  linkCopyContainer,
  publicContainerStyle,
} from "./style"


function getAgentPublickLink(teamIdentify: string, agentID: string): string {
  return `${
    import.meta.env.ILLA_CLOUD_URL
  }/${teamIdentify}/deploy/agent/${agentID}`
}

export const ToMarketplacePC: FC<ToMarketplaceProps> = (props) => {
  const {
    defaultAgentContributed,
    onAgentContributed,
    currentUserRole,
    teamIdentify,
    agentID,
    onCopyAgentMarketLink,
  } = props

  const [agentContributed, setAgentContributed] = useMergeValue(
    defaultAgentContributed,
    {
      defaultValue: defaultAgentContributed,
    },
  )

  const [agentContributedLoading, setAgentContributedLoading] = useState(false)

  const { t } = useTranslation()

  return (
    <div css={publicContainerStyle}>
      {isSmallThanTargetRole(USER_ROLE.VIEWER, currentUserRole, false) && (
        <div css={blockContainerStyle}>
          <div css={blockLabelStyle}>Contribute to marketplace</div>
          <div
            style={{
              flexGrow: 1,
            }}
          />
          <Switch
            checked={agentContributed}
            colorScheme={getColor("grayBlue", "02")}
            onChange={(value) => {
              onAgentContributed?.(value)
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
                ""
              )
            }
          />
          <Button
            ml="8px"
            w="80px"
            colorScheme={getColor("grayBlue", "02")}
            loading={agentContributedLoading}
            onClick={() => {
              onCopyAgentMarketLink?.(
                getAgentPublickLink(teamIdentify, agentID),
              )
            }}
          >
            {!agentContributedLoading ? "Copy" : undefined}
          </Button>
        </div>
      ) : (
        <div css={contributingDocStyle}>
          Current app hasnt been deployed. Public access and viewer access may
          cause errors
        </div>
      )}
    </div>
  )
}

ToMarketplacePC.displayName = "ToMarketplacePC"