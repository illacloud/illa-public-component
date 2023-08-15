import { AuthShown, SHOW_RULES } from "@illa-public/auth-shown"
import { USER_ROLE } from "@illa-public/user-data"
import { pxToRem } from "@illa-public/utils"
import { FC, useContext } from "react"
import { useTranslation } from "react-i18next"
import { Button, CloseIcon, Divider, Drawer } from "@illa-design/react"
import InviteByEmail from "@/illa-public-component/MobileMember/InviteModalMobile/InviteByEmail"
import InviteByLink from "@/illa-public-component/MobileMember/InviteModalMobile/InviteByLink"
import { ReactComponent as LinkOffIcon } from "../../assets/link-off.svg"
import { ReactComponent as LinkIcon } from "../../assets/link.svg"
import ShareToMediaContentMobile from "../../components/ShareToMediaContent/mobile"
import { AgentShareModalContext } from "../context/AgentShareModalContext"
import { DefaultTabType, TeamAgentSharePCModalProps } from "../interface"
import {
  applyTabTitleItemStyle,
  closeIconContainerStyle,
  closeIconStyle,
  headerWrapperStyle,
  inviteOffWrapperStyle,
  inviteWrapperStyle,
  linkIconStyle,
  linkLinkButtonStyle,
  shareModalStyle,
  tabContentWrapperStyle,
  turnOffLinkStyle,
  turnOnLinkButtonStyle,
  wrapperStyle,
} from "./style"

const TeamAgentShareMobileModal: FC<TeamAgentSharePCModalProps> = (props) => {
  const { t } = useTranslation()
  const {
    activeTab,
    loading,
    tabsConfig,
    visible,
    publishedToMarketplace,
    onCancel,
    inviteByEmail,
    changeTeamMembersRole,
    onChangeTab,
    onContributed,
  } = props

  const {
    agentName,
    agentLink,
    userListData,
    userNickname,
    currentUserRole,
    teamName,

    allowInviteByLink,
    fetchInviteLink,
    configInviteLink,
  } = useContext(AgentShareModalContext)

  const closeContribute = () => {
    onContributed?.(false)
  }

  const openContribute = () => {
    onContributed?.(true)
  }

  return (
    <Drawer
      _css={shareModalStyle}
      w="100%"
      bdRadius={`${pxToRem(24)} ${pxToRem(24)}  0 0`}
      placement="bottom"
      maskClosable={false}
      closable={false}
      footer={false}
      autoFocus={false}
      onCancel={onCancel}
      visible={visible}
    >
      <CloseIcon
        css={closeIconStyle}
        onClick={onCancel}
        containerStyle={closeIconContainerStyle}
      />
      <div css={wrapperStyle}>
        <div css={headerWrapperStyle}>
          {tabsConfig.map((tab) => {
            const { id, label, hidden } = tab
            const isActive = id === activeTab
            if (hidden) return null

            return (
              <span
                key={`tab-${id}`}
                css={applyTabTitleItemStyle(isActive, hidden)}
                onClick={() => {
                  onChangeTab(id as DefaultTabType)
                }}
              >
                {label}
              </span>
            )
          })}
        </div>
        {activeTab === "share" && (
          <div css={tabContentWrapperStyle}>
            <InviteByLink
              currentUserRole={currentUserRole}
              teamName={teamName}
              userNickname={userNickname}
              inviteLinkEnabled={allowInviteByLink}
              fetchInviteLink={fetchInviteLink}
              configInviteLink={configInviteLink}
            />
            <InviteByEmail
              autoHeight
              userListData={userListData}
              currentUserRole={currentUserRole}
              inviteByEmail={inviteByEmail}
              changeTeamMembersRole={changeTeamMembersRole}
              closeInviteModal={onCancel}
            />
          </div>
        )}
        {activeTab === "contribute" && (
          <div css={tabContentWrapperStyle}>
            {publishedToMarketplace ? (
              <div css={inviteWrapperStyle}>
                <LinkIcon css={linkIconStyle} />
                <Button
                  _css={linkLinkButtonStyle}
                  fullWidth
                  colorScheme="techPurple"
                  loading={loading}
                  onClick={openContribute}
                >
                  {t("new_share.button.share_contribute")}
                </Button>
                <AuthShown
                  currentUserRole={currentUserRole}
                  allowRoles={[USER_ROLE.OWNER, USER_ROLE.ADMIN]}
                  rules={SHOW_RULES.EQUAL}
                >
                  <div css={turnOffLinkStyle} onClick={closeContribute}>
                    {t("new_share.button.uncontribute")}
                  </div>
                </AuthShown>
                <Divider mg={`${pxToRem(40)} 0`} />
                <ShareToMediaContentMobile
                  agentLink={agentLink}
                  agentName={agentName}
                />
              </div>
            ) : (
              <div css={inviteOffWrapperStyle}>
                <LinkOffIcon css={linkIconStyle} />
                <Button
                  _css={turnOnLinkButtonStyle}
                  fullWidth
                  colorScheme="techPurple"
                  loading={loading}
                  onClick={closeContribute}
                >
                  {t("new_share.button.contribute")}
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </Drawer>
  )
}

TeamAgentShareMobileModal.displayName = "TeamAgentShareMobileModal"

export default TeamAgentShareMobileModal
