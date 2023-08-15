import { LayoutAutoChange } from "@illa-public/layout-auto-change"
import {
  ACTION_MANAGE,
  ATTRIBUTE_GROUP,
  canManage,
} from "@illa-public/user-role-utils"
import { FC, useCallback, useMemo, useState } from "react"
import { useTranslation } from "react-i18next"
import { useMessage } from "@illa-design/react"
import { AgentShareModalContext } from "./context/MemberListContext"
import { TeamAgentShareModalProps } from "./interface"
import TeamAgentShareMobileModal from "./mobile"
import TeamAgentSharePCModal from "./pc"

const TeamAgentShareModal: FC<TeamAgentShareModalProps> = (props) => {
  const message = useMessage()
  const { t } = useTranslation()
  const {
    defaultTab = "share",
    agentName,
    agentLink,
    visible,
    currentUserRole,
    teamName,
    userNickname,
    userListData,
    publishedToMarketplace,
    onCancel,
    allowInviteByLink,
    fetchInviteLink,
    renewInviteLink,
    configInviteLink,
    inviteByEmail,
    changeTeamMembersRole,
    contributeToMarketplace,
  } = props

  const [activeTab, setActiveTab] = useState(defaultTab)
  const [loading, setLoading] = useState(false)
  const canInvite = useMemo(
    () =>
      canManage(
        currentUserRole,
        ATTRIBUTE_GROUP.INVITE,
        ACTION_MANAGE.INVITE_LINK,
      ),
    [currentUserRole],
  )

  const tabs = useMemo(
    () => [
      {
        id: "share",
        label: t("new_share.title.share-with-team"),
        hidden: false,
      },
      {
        id: "contribute",
        label: t("new_share.title.contribute"),
        hidden: !canInvite && !publishedToMarketplace,
      },
    ],
    [t, canInvite, publishedToMarketplace],
  )

  const switchContribute = useCallback(
    async (value: boolean) => {
      if (loading) return
      setLoading(true)
      try {
        await contributeToMarketplace?.(value)
        message.success({
          content: t("user_management.modal.message.make_public_suc"),
        })
        setLoading(false)
      } catch (e) {
        message.error({
          content: t("user_management.modal.message.make_public_failed"),
        })
      }
      setLoading(false)
    },
    [loading, contributeToMarketplace, message, t],
  )

  return (
    <AgentShareModalContext.Provider
      value={{
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
      }}
    >
      <LayoutAutoChange
        desktopPage={
          <TeamAgentSharePCModal
            activeTab={activeTab}
            loading={loading}
            tabsConfig={tabs}
            visible={visible}
            publishedToMarketplace={publishedToMarketplace}
            onCancel={onCancel}
            inviteByEmail={inviteByEmail}
            changeTeamMembersRole={changeTeamMembersRole}
            onChangeTab={setActiveTab}
            onContributed={switchContribute}
          />
        }
        mobilePage={
          <TeamAgentShareMobileModal
            activeTab={activeTab}
            loading={loading}
            tabsConfig={tabs}
            visible={visible}
            publishedToMarketplace={publishedToMarketplace}
            onCancel={onCancel}
            inviteByEmail={inviteByEmail}
            changeTeamMembersRole={changeTeamMembersRole}
            onChangeTab={setActiveTab}
            onContributed={switchContribute}
          />
        }
      />
    </AgentShareModalContext.Provider>
  )
}

TeamAgentShareModal.displayName = "TeamAgentShareModal"

export default TeamAgentShareModal
