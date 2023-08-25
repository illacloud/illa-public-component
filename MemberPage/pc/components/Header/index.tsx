import { InviteMemberPC } from "@illa-public/invite-modal"
import { useUpgradeModal } from "@illa-public/upgrade-modal"
import {
  USER_ROLE,
  getCurrentTeamInfo,
  getCurrentUser,
  teamActions,
} from "@illa-public/user-data"
import { canManageInvite } from "@illa-public/user-role-utils"
import { isCloudVersion, useCopyToClipboard } from "@illa-public/utils"
import { FC, useCallback, useState } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { Button } from "@illa-design/react"
import { MoreAction } from "./moreAction"
import { buttonGroup, headerWrapperStyle, titleStyle } from "./style"


export const Header: FC = () => {
  const { t } = useTranslation()
  const [inviteModalVisible, setInviteModalVisible] = useState(false)
  const dispatch = useDispatch()
  const teamInfo = useSelector(getCurrentTeamInfo)!!
  const currentUserInfo = useSelector(getCurrentUser)!!
  const currentUserRole = teamInfo?.myRole ?? USER_ROLE.VIEWER
  const copyToClipboard = useCopyToClipboard()
  const upgradeModal = useUpgradeModal()

  const enableInvite = canManageInvite(
    currentUserRole,
    teamInfo?.permission?.allowEditorManageTeamMember,
    teamInfo?.permission?.allowViewerManageTeamMember,
  )

  const handleClickInviteButton = useCallback(() => {
    if (!isCloudVersion || teamInfo?.totalTeamLicense?.teamLicenseAllPaid) {
      setInviteModalVisible(true)
    } else if (teamInfo?.totalTeamLicense.balance < 0) {
      upgradeModal({
        modalType: "add-license",
      })
    } else {
      upgradeModal({
        modalType: "upgrade",
      })
    }
  }, [
    teamInfo?.totalTeamLicense.balance,
    teamInfo?.totalTeamLicense?.teamLicenseAllPaid,
    upgradeModal,
  ])

  return (
    <>
      <div css={headerWrapperStyle}>
        <h1 css={titleStyle}>{t("user_management.page.member")}</h1>
        <div css={buttonGroup}>
          <MoreAction />
          <Button
            w="200px"
            colorScheme="techPurple"
            disabled={!enableInvite}
            onClick={handleClickInviteButton}
          >
            {t("user_management.page.invite")}
          </Button>
        </div>
      </div>
      {inviteModalVisible && (
        <InviteMemberPC
          redirectURL={`${import.meta.env.ILLA_CLOUD_URL}/workspace/${
            teamInfo?.identifier
          }`}
          onClose={() => setInviteModalVisible(false)}
          canInvite={enableInvite}
          currentUserRole={currentUserRole}
          defaultAllowInviteLink={teamInfo.permission.inviteLinkEnabled}
          defaultInviteUserRole={USER_ROLE.VIEWER}
          defaultBalance={teamInfo.currentTeamLicense.balance}
          onCopyInviteLink={(inviteLink) => {
            copyToClipboard(
              t("user_management.modal.custom_copy_text", {
                inviteLink: inviteLink,
                teamName: teamInfo.name,
                userName: currentUserInfo.nickname,
              }),
            )
          }}
          onInviteLinkStateChange={(isInviteLink) => {
            dispatch(
              teamActions.updateTeamMemberPermissionReducer({
                teamID: teamInfo.id,
                newPermission: {
                  ...teamInfo.permission,
                  inviteLinkEnabled: isInviteLink,
                },
              }),
            )
          }}
          teamID={teamInfo.id}
          onBalanceChange={(balance) => {
            dispatch(
              teamActions.updateTeamMemberSubscribeReducer({
                teamID: teamInfo.id,
                subscribeInfo: {
                  ...teamInfo.currentTeamLicense,
                  balance: balance,
                },
              }),
            )
          }}
        />
      )}
    </>
  )
}