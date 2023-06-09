import { Button, MoreIcon } from "@illa-design/react"
import {
  FC,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react"
import { createPortal } from "react-dom"
import { useTranslation } from "react-i18next"
import { InviteMemberModal } from "@/illa-public-component/MemberList/components/Header/InviteMemberModalContent"
import { MoreAction } from "@/illa-public-component/MemberList/components/Header/MoreAction"
import {
  buttonGroup,
  headerWrapperStyle,
  titleStyle,
} from "@/illa-public-component/MemberList/components/Header/style"
import { ILLA_MIXPANEL_EVENT_TYPE } from "@/illa-public-component/MixpanelUtils/interface"
import { MixpanelTrackContext } from "@/illa-public-component/MixpanelUtils/mixpanelContext"
import { UpgradeCloudContext } from "@/illa-public-component/UpgradeCloudProvider"
import { isSubscribeLicense } from "@/illa-public-component/UserRoleUtils"
import { USER_ROLE } from "@/illa-public-component/UserRoleUtils/interface"
import { HeaderProps } from "./interface"

const getInviteButtonStatus = (
  allowEditorManageTeamMember: boolean,
  allowViewerManageTeamMember: boolean,
  currentUserRole: USER_ROLE,
) => {
  if (
    currentUserRole === USER_ROLE.OWNER ||
    currentUserRole === USER_ROLE.ADMIN
  ) {
    return "not_disable"
  }
  if (currentUserRole === USER_ROLE.EDITOR && allowEditorManageTeamMember) {
    return "not_disable"
  }
  if (currentUserRole === USER_ROLE.VIEWER && allowViewerManageTeamMember) {
    return "not_disable"
  }
  return "disable"
}

export const Header: FC<HeaderProps> = (props) => {
  const {
    currentUserID,
    currentUserRole,
    currentTeamMemberID,
    allowEditorManageTeamMember,
    allowViewerManageTeamMember,
    hasApp,
    allowInviteByLink,
    updateTeamPermissionConfig,
    removeTeam,
    removeTeamMembers,
    changeTeamMembersRole,
    inviteByEmail,
    renewInviteLink,
    fetchInviteLink,
    configInviteLink,
    teamName,
    userNickname,
    userListData,
    isCloudVersion,
    currentTeamLicense,
  } = props
  const { t } = useTranslation()
  const { track } = useContext(MixpanelTrackContext)
  const { handleUpgradeModalVisible } = useContext(UpgradeCloudContext)

  const [showInviteMemberModal, setShowInviteMemberModal] = useState(false)

  const handleClickInvite = useCallback(() => {
    setShowInviteMemberModal(true)
  }, [])

  const inviteButtonStatus = useMemo(
    () =>
      getInviteButtonStatus(
        allowEditorManageTeamMember,
        allowViewerManageTeamMember,
        currentUserRole,
      ),
    [allowEditorManageTeamMember, allowViewerManageTeamMember, currentUserRole],
  )

  useEffect(() => {
    track?.(
      ILLA_MIXPANEL_EVENT_TYPE.SHOW,
      {
        element: "invite_button",
        parameter4: inviteButtonStatus,
      },
      "both",
    )
  }, [inviteButtonStatus, track])

  useEffect(() => {
    showInviteMemberModal &&
      track?.(
        ILLA_MIXPANEL_EVENT_TYPE.SHOW,
        {
          element: "invite_modal",
        },
        "both",
      )
  }, [showInviteMemberModal, track])

  const handleClickMoreIcon = useCallback(() => {
    track?.(
      ILLA_MIXPANEL_EVENT_TYPE.CLICK,
      {
        element: "more",
      },
      "both",
    )
  }, [track])

  const handleClickInviteButton = useCallback(() => {
    track?.(
      ILLA_MIXPANEL_EVENT_TYPE.CLICK,
      {
        element: "invite_button",
      },
      "both",
    )
    if (isSubscribeLicense(currentTeamLicense?.plan)) {
      handleClickInvite()
    } else {
      handleUpgradeModalVisible(true, "upgrade")
    }
  }, [
    track,
    currentTeamLicense?.plan,
    handleClickInvite,
    handleUpgradeModalVisible,
  ])

  return (
    <div css={headerWrapperStyle}>
      <h1 css={titleStyle}>{t("user_management.page.member")}</h1>
      <div css={buttonGroup}>
        <MoreAction
          isCloudVersion={isCloudVersion}
          currentTeamMemberID={currentTeamMemberID}
          currentUserRole={currentUserRole}
          currentUserID={currentUserID}
          hasApp={hasApp}
          removeTeam={removeTeam}
          removeTeamMembers={removeTeamMembers}
          updateTeamPermissionConfig={updateTeamPermissionConfig}
          allowEditorManageTeamMember={allowEditorManageTeamMember}
          allowViewerManageTeamMember={allowViewerManageTeamMember}
          userNumber={userListData.length}
        >
          <Button w="32px" colorScheme="grayBlue" onClick={handleClickMoreIcon}>
            <MoreIcon />
          </Button>
        </MoreAction>
        <Button
          w="200px"
          colorScheme="techPurple"
          onClick={handleClickInviteButton}
        >
          {t("user_management.page.invite")}
        </Button>
      </div>
      {showInviteMemberModal &&
        createPortal(
          <InviteMemberModal
            hasApp={hasApp}
            from="cloud_dashboard"
            isCloudVersion={isCloudVersion}
            userListData={userListData}
            handleCloseModal={() => {
              setShowInviteMemberModal(false)
            }}
            teamName={teamName}
            userNickname={userNickname}
            changeTeamMembersRole={changeTeamMembersRole}
            currentUserRole={currentUserRole}
            inviteByEmail={inviteByEmail}
            renewInviteLink={renewInviteLink}
            fetchInviteLink={fetchInviteLink}
            configInviteLink={configInviteLink}
            allowInviteByLink={allowInviteByLink}
            allowEditorManageTeamMember={allowEditorManageTeamMember}
            allowViewerManageTeamMember={allowViewerManageTeamMember}
          />,
          document.body,
        )}
    </div>
  )
}
