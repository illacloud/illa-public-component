import { USER_ROLE } from "@illa-public/user-data"
import { isSmallThanTargetRole } from "@illa-public/user-role-utils"
import { FC } from "react"
import {
  CloseIcon,
  Modal,
  TabPane,
  Tabs,
  useMergeValue,
} from "@illa-design/react"
import { InviteByEmailPC } from "../../component/InviteByEmail/pc"
import { InviteLinkPC } from "../../component/InviteLink/pc"
import { ToMarketplacePC } from "../../component/ToMarketplace/pc"
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
              title="Share with Team"
              key={ShareAgentTab.SHARE_WITH_TEAM}
            />
          )}
          {(isSmallThanTargetRole(USER_ROLE.EDITOR, props.currentUserRole) ||
            props.defaultAgentContributed) && (
            <TabPane
              title="To Marketplace"
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
        {activeTab === ShareAgentTab.TO_MARKETPLACE && (
          <ToMarketplacePC
            defaultAgentContributed={props.defaultAgentContributed}
            onAgentContributed={props.onAgentContributed}
            currentUserRole={props.currentUserRole}
            agentID={props.agentID}
            onCopyAgentMarketLink={props.onCopyAgentMarketLink}
            teamIdentify={props.teamIdentify}
          />
        )}
        {activeTab === ShareAgentTab.SHARE_WITH_TEAM && (
          <>
            <InviteLinkPC
              balance={props.balance}
              defaultInviteUserRole={props.defaultInviteUserRole}
              defaultAllowInviteLink={props.defaultAllowInviteLink}
              teamID={props.teamID}
              currentUserRole={props.currentUserRole}
              onInviteLinkStateChange={props.onInviteLinkStateChange}
              onCopyInviteLink={props.onCopyInviteLink}
            />
            <InviteByEmailPC
              defaultInviteUserRole={props.defaultInviteUserRole}
              teamID={props.teamID}
              currentUserRole={props.currentUserRole}
              balance={props.balance}
            />
          </>
        )}
      </div>
    </Modal>
  )
}