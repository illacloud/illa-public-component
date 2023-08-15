import { isCloudVersion } from "@illa-public/utils"
import { FC, useContext } from "react"
import { useTranslation } from "react-i18next"
import { CloseIcon, Divider, Loading, Modal, Switch } from "@illa-design/react"
import { InviteMemberByLink } from "@/illa-public-component/MemberList/components/Header/InviteMemberModalContent"
import { InviteMemberByEmailPC } from "../../components/InviteMemberByEmail/pc"
import ShareToMediaContentPC from "../../components/ShareToMediaContent/pc"
import { AgentShareModalContext } from "../context/AgentShareModalContext"
import { DefaultTabType, TeamAgentSharePCModalProps } from "../interface"
import {
  applyTabLabelStyle,
  closeIconStyle,
  descriptionStyle,
  headerWrapperStyle,
  modalMaskStyle,
  modalStyle,
  modalTabWrapperStyle,
  switchLabelStyle,
  switchWrapperStyle,
  wrapperStyle,
} from "./style"

export type TabType = "share" | "contribute"
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
                  onChangeTab(id as DefaultTabType)
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
          <InviteMemberByEmailPC
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
            <ShareToMediaContentPC
              agentLink={agentLink}
              agentName={agentName}
            />
          ) : null}
        </div>
      )}
    </Modal>
  )
}

TeamAgentSharePCModal.displayName = "TeamAgentShareModal"

export default TeamAgentSharePCModal
