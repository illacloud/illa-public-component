import { FC, useContext } from "react"
import { useTranslation } from "react-i18next"
import { CloseIcon, Divider, Loading, Modal, Switch } from "@illa-design/react"
import {
  InviteMemberByEmail,
  InviteMemberByLink,
} from "@/illa-public-component/MemberList/components/Header/InviteMemberModalContent"
import ShareToMediaContent from "@/illa-public-component/ShareToSocialMedia/pc/ShareToMediaContent"
import {
  descriptionStyle,
  switchLabelStyle,
  switchWrapperStyle,
  wrapperStyle,
} from "@/illa-public-component/ShareToSocialMedia/pc/style"
import { TeamAgentShareModalProps } from "@/illa-public-component/TeamAgentShareModal"
import { AgentShareModalContext } from "@/illa-public-component/TeamAgentShareModal/context/MemberListContext"
import {
  applyTabLabelStyle,
  closeIconStyle,
  headerWrapperStyle,
  modalMaskStyle,
  modalStyle,
  modalTabWrapperStyle,
} from "@/illa-public-component/TeamAgentShareModal/pc/style"
import { isCloudVersion } from "@/utils/typeHelper"

export type TabType = "share" | "contribute"
export type TabsConfig = { hidden: boolean; id: string; label: string }[]

export interface TeamAgentSharePCModalProps
  extends Pick<
    TeamAgentShareModalProps,
    | "visible"
    | "inviteByEmail"
    | "onCancel"
    | "changeTeamMembersRole"
    | "publishedToMarketplace"
  > {
  activeTab: TabType
  onChangeTab: (currentTabId: TabType) => void
  loading: boolean
  tabsConfig: TabsConfig
  onContributed?: (value: boolean) => void
}
const TeamAgentSharePCModal: FC<TeamAgentSharePCModalProps> = (props) => {
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
    renewInviteLink,
    configInviteLink,
  } = useContext(AgentShareModalContext)

  return (
    <Modal
      _css={modalStyle}
      withoutPadding
      maskClosable={false}
      footer={false}
      autoFocus={false}
      onCancel={onCancel}
      maskStyle={modalMaskStyle}
      visible={visible}
    >
      <header css={headerWrapperStyle}>
        <div css={modalTabWrapperStyle}>
          {tabsConfig.map((tab) => {
            const { id, label, hidden } = tab
            const isActive = id === activeTab
            if (hidden) return null

            return (
              <span
                key={`tab-${id}`}
                css={applyTabLabelStyle(isActive)}
                onClick={() => {
                  onChangeTab(id as TabType)
                }}
              >
                {label}
              </span>
            )
          })}
        </div>
        <CloseIcon css={closeIconStyle} onClick={onCancel} />
      </header>
      <Divider />
      {activeTab === "share" && (
        <div css={wrapperStyle}>
          <InviteMemberByLink
            from={"builder_agent"}
            isCloudVersion={isCloudVersion}
            currentUserRole={currentUserRole}
            allowInviteByLink={allowInviteByLink}
            appID={"appID"}
            userNickname={userNickname}
            teamName={teamName}
            configInviteLink={configInviteLink}
            fetchInviteLink={fetchInviteLink}
            renewInviteLink={renewInviteLink}
          />
          <InviteMemberByEmail
            currentUserRole={currentUserRole}
            userListData={userListData}
            inviteByEmail={inviteByEmail}
            changeTeamMembersRole={changeTeamMembersRole}
          />
        </div>
      )}
      {activeTab === "contribute" && (
        <div>
          <div css={switchWrapperStyle}>
            <div css={switchLabelStyle}>
              <span>{t("new_share.label.contribute")}</span>
              {loading ? (
                <Loading colorScheme="techPurple" />
              ) : (
                <Switch
                  checked={publishedToMarketplace}
                  colorScheme="black"
                  onChange={onContributed}
                />
              )}
            </div>
            <div css={descriptionStyle}>{t("new_share.desc.contribute")}</div>
          </div>
          {publishedToMarketplace ? (
            <ShareToMediaContent agentLink={agentLink} agentName={agentName} />
          ) : null}
        </div>
      )}
    </Modal>
  )
}

TeamAgentSharePCModal.displayName = "TeamAgentShareModal"

export default TeamAgentSharePCModal
