import {
  ACTION_MANAGE,
  ATTRIBUTE_GROUP,
  canManage,
} from "@illa-public/user-role-utils"
import { FC } from "react"
import {
  CloseIcon,
  Divider,
  Drawer,
  TriggerProvider,
  useMergeValue,
} from "@illa-design/react"
import { AgentToMarketplaceMobile } from "../../component/AgentToMarketplace/mobile"
import { InviteByEmailMobile } from "../../component/InviteByEmail/mobile"
import { InviteLinkMobile } from "../../component/InviteLink/mobile"
import { ShareAgentProps, ShareAgentTab } from "../interface"
import {
  closeIconContainerStyle,
  contentContainerStyle,
  dividerStyle,
  inviteHeaderContainerStyle,
  inviteModalStyle,
  spaceLineStyle,
  tabTitleStyle,
  tabsContainerStyle,
} from "./style"
import { useTranslation } from "react-i18next"

export const ShareAgentMobile: FC<ShareAgentProps> = (props) => {
  const { onClose } = props
  const [activeTab, setActiveTab] = useMergeValue<string>(
    ShareAgentTab.SHARE_WITH_TEAM,
    {
      defaultValue: ShareAgentTab.SHARE_WITH_TEAM,
    },
  )
  const { t } = useTranslation()

  return (
    <TriggerProvider renderInBody zIndex={1005}>
      <Drawer
        _css={inviteModalStyle}
        w="100%"
        placement="bottom"
        maskClosable={false}
        closable={false}
        footer={false}
        onCancel={onClose}
        visible={true}
      >
        <div css={inviteHeaderContainerStyle}>
          <div
            css={closeIconContainerStyle}
            onClick={() => {
              props.onClose?.()
            }}
          >
            <CloseIcon size="12" />
          </div>
          <div css={tabsContainerStyle}>
            {props.canInvite && (
              <div
                css={tabTitleStyle(activeTab === ShareAgentTab.SHARE_WITH_TEAM)}
                onClick={() => setActiveTab(ShareAgentTab.SHARE_WITH_TEAM)}
              >
                {t('user_management.modal.tab.with_team')}
              </div>
            )}
            {(canManage(
              props.currentUserRole,
              ATTRIBUTE_GROUP.AGENT,
              ACTION_MANAGE.FORK_AGENT,
            ) ||
              props.defaultAgentContributed) && (
              <>
                <div css={spaceLineStyle} />
                <div
                  css={tabTitleStyle(
                    activeTab === ShareAgentTab.TO_MARKETPLACE,
                  )}
                  onClick={() => setActiveTab(ShareAgentTab.TO_MARKETPLACE)}
                >
                  {t('user_management.modal.title.contribute')}
                </div>
              </>
            )}
          </div>
        </div>
        <div css={contentContainerStyle}>
          {activeTab === ShareAgentTab.TO_MARKETPLACE &&
            props.agentID !== "" &&
            props.agentID !== undefined && (
              <AgentToMarketplaceMobile
                defaultAgentContributed={props.defaultAgentContributed}
                onAgentContributed={props.onAgentContributed}
                agentID={props.agentID}
                onCopyAgentMarketLink={props.onCopyAgentMarketLink}
                userRoleForThisAgent={props.userRoleForThisAgent}
                ownerTeamID={props.ownerTeamID}
              />
            )}
          {activeTab === ShareAgentTab.SHARE_WITH_TEAM && (
            <div>
              <InviteLinkMobile
                redirectUrl={props.redirectUrl}
                defaultBalance={props.defaultBalance}
                defaultInviteUserRole={props.defaultInviteUserRole}
                defaultAllowInviteLink={props.defaultAllowInviteLink}
                teamID={props.teamID}
                currentUserRole={props.currentUserRole}
                onInviteLinkStateChange={props.onInviteLinkStateChange}
                onCopyInviteLink={props.onCopyInviteLink}
              />
              <Divider _css={dividerStyle} />
              <InviteByEmailMobile
                onBalanceChange={props.onBalanceChange}
                defaultInviteUserRole={props.defaultInviteUserRole}
                teamID={props.teamID}
                currentUserRole={props.currentUserRole}
                defaultBalance={props.defaultBalance}
              />
            </div>
          )}
        </div>
      </Drawer>
    </TriggerProvider>
  )
}
