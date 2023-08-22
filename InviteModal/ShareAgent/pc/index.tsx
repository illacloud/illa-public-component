import {
  ACTION_MANAGE,
  ATTRIBUTE_GROUP,
  canManage,
} from "@illa-public/user-role-utils"
import { FC } from "react"
import { useTranslation } from "react-i18next"
import {
  CloseIcon,
  Modal,
  TabPane,
  Tabs,
  useMergeValue,
} from "@illa-design/react"
import { AgentToMarketplacePC } from "../../component/AgentToMarketplace/pc"
import { InviteByEmailPC } from "../../component/InviteByEmail/pc"
import { InviteLinkPC } from "../../component/InviteLink/pc"
import { ShareAgentProps, ShareAgentTab } from "../interface"
import {
  closeIconStyle,
  contentContainerStyle,
  headerContainerStyle,
} from "./style"

export const ShareAgentPC: FC<ShareAgentProps> = (props) => {
  const [activeTab, setActiveTab] = useMergeValue<string>(
    ShareAgentTab.SHARE_WITH_TEAM,
    {
      defaultValue: ShareAgentTab.SHARE_WITH_TEAM,
    },
  )

  const { t } = useTranslation()

  return (
    <Modal
      withoutLine={false}
      withoutPadding
      w="498px"
      onCancel={() => {
        props.onClose?.()
      }}
      footer={false}
      maskClosable={false}
      visible={true}
    >
      <div css={headerContainerStyle}>
        <Tabs
          activeKey={activeTab}
          variant="text"
          colorScheme="grayBlue"
          withoutBorderLine
          onChange={(activeKey) => {
            setActiveTab(activeKey)
          }}
        >
          {props.canInvite && (
            <TabPane
              title={t("user_management.modal.tab.with_team")}
              key={ShareAgentTab.SHARE_WITH_TEAM}
            />
          )}
          {(canManage(
            props.currentUserRole,
            ATTRIBUTE_GROUP.AGENT,
            ACTION_MANAGE.FORK_AGENT,
          ) ||
            props.defaultAgentContributed) && (
            <TabPane
              title={t("user_management.modal.title.contribute")}
              key={ShareAgentTab.TO_MARKETPLACE}
            />
          )}
        </Tabs>
        <div
          css={closeIconStyle}
          onClick={() => {
            props.onClose?.()
          }}
        >
          <CloseIcon />
        </div>
      </div>
      <div css={contentContainerStyle}>
        {activeTab === ShareAgentTab.TO_MARKETPLACE &&
          props.agentID !== "" &&
          props.agentID !== undefined && (
            <AgentToMarketplacePC
              defaultAgentContributed={props.defaultAgentContributed}
              onAgentContributed={props.onAgentContributed}
              agentID={props.agentID}
              onCopyAgentMarketLink={props.onCopyAgentMarketLink}
              userRoleForThisAgent={props.userRoleForThisAgent}
              ownerTeamID={props.ownerTeamID}
            />
          )}
        {activeTab === ShareAgentTab.SHARE_WITH_TEAM && (
          <>
            <InviteLinkPC
              defaultBalance={props.defaultBalance}
              defaultInviteUserRole={props.defaultInviteUserRole}
              defaultAllowInviteLink={props.defaultAllowInviteLink}
              teamID={props.teamID}
              currentUserRole={props.currentUserRole}
              onInviteLinkStateChange={props.onInviteLinkStateChange}
              onCopyInviteLink={props.onCopyInviteLink}
            />
            <InviteByEmailPC
              onBalanceChange={props.onBalanceChange}
              defaultInviteUserRole={props.defaultInviteUserRole}
              teamID={props.teamID}
              currentUserRole={props.currentUserRole}
              defaultBalance={props.defaultBalance}
            />
          </>
        )}
      </div>
    </Modal>
  )
}

ShareAgentPC.displayName = "ShareAgentPC"
