import {
  ILLA_MIXPANEL_EVENT_TYPE,
  MixpanelTrackContext,
} from "@illa-public/mixpanel-utils"
import {
  ACTION_MANAGE,
  ATTRIBUTE_GROUP,
  canManage,
} from "@illa-public/user-role-utils"
import { FC, useContext } from "react"
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
  const [activeTab, setActiveTab] = useMergeValue<string>(props.defaultTab, {
    defaultValue: props.defaultTab,
  })

  const { t } = useTranslation()
  const { track } = useContext(MixpanelTrackContext)

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
            track(ILLA_MIXPANEL_EVENT_TYPE.CLICK, {
              element: "share_modal_tab",
              parameter2: activeKey,
              parameter5: props.agentID,
            })
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
            props.userRoleForThisAgent,
            ATTRIBUTE_GROUP.AGENT,
            ACTION_MANAGE.CREATE_AGENT,
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
              title={props.title}
              defaultAgentContributed={props.defaultAgentContributed}
              onAgentContributed={props.onAgentContributed}
              agentID={props.agentID}
              onCopyAgentMarketLink={props.onCopyAgentMarketLink}
              userRoleForThisAgent={props.userRoleForThisAgent}
              ownerTeamID={props.ownerTeamID}
              onShare={props.onShare}
            />
          )}
        {activeTab === ShareAgentTab.SHARE_WITH_TEAM && (
          <>
            <InviteLinkPC
              excludeUserRole={[]}
              redirectURL={props.redirectURL}
              defaultBalance={props.defaultBalance}
              defaultInviteUserRole={props.defaultInviteUserRole}
              defaultAllowInviteLink={props.defaultAllowInviteLink}
              teamID={props.teamID}
              currentUserRole={props.currentUserRole}
              onInviteLinkStateChange={props.onInviteLinkStateChange}
              onCopyInviteLink={props.onCopyInviteLink}
            />
            <InviteByEmailPC
              excludeUserRole={[]}
              redirectURL={props.redirectURL}
              onBalanceChange={props.onBalanceChange}
              defaultInviteUserRole={props.defaultInviteUserRole}
              teamID={props.teamID}
              currentUserRole={props.currentUserRole}
              defaultBalance={props.defaultBalance}
              itemID={props.agentID}
            />
          </>
        )}
      </div>
    </Modal>
  )
}

ShareAgentPC.displayName = "ShareAgentPC"
