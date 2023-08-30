import { InviteMemberPC } from "@illa-public/invite-modal"
import { useUpgradeModal } from "@illa-public/upgrade-modal"
import {
  MemberInfo,
  USER_ROLE,
  USER_STATUS,
  getCurrentTeamInfo,
  getCurrentUser,
  teamActions,
} from "@illa-public/user-data"
import { canManageInvite } from "@illa-public/user-role-utils"
import {
  COPY_STATUS,
  copyToClipboard,
  isCloudVersion,
} from "@illa-public/utils"
import { FC, useCallback, useState } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { Button, useMessage } from "@illa-design/react"
import { IPcHeaderProps } from "./interface"
import { MoreAction } from "./moreAction"
import { buttonGroup, headerWrapperStyle, titleStyle } from "./style"

export const Header: FC<IPcHeaderProps> = (props) => {
  const { t } = useTranslation()
  const { afterLeaveTeam } = props
  const [inviteModalVisible, setInviteModalVisible] = useState(false)
  const dispatch = useDispatch()
  const teamInfo = useSelector(getCurrentTeamInfo)!!
  const currentUserInfo = useSelector(getCurrentUser)!!
  const currentUserRole = teamInfo?.myRole ?? USER_ROLE.VIEWER
  const upgradeModal = useUpgradeModal()
  const message = useMessage()

  const enableInvite = canManageInvite(
    currentUserRole,
    teamInfo?.permission?.allowEditorManageTeamMember,
    teamInfo?.permission?.allowViewerManageTeamMember,
  )

  const handleClickInviteButton = useCallback(() => {
    if (!isCloudVersion || teamInfo?.totalTeamLicense?.teamLicenseAllPaid) {
      setInviteModalVisible(true)
    } else if (teamInfo?.totalTeamLicense?.balance < 0) {
      upgradeModal({
        modalType: "add-license",
      })
    } else {
      upgradeModal({
        modalType: "upgrade",
      })
    }
  }, [
    teamInfo?.totalTeamLicense?.balance,
    teamInfo?.totalTeamLicense?.teamLicenseAllPaid,
    upgradeModal,
  ])

  const handleCopy = useCallback(
    (inviteLink: string) => {
      const flag = copyToClipboard(
        t("user_management.modal.custom_copy_text", {
          inviteLink: inviteLink,
          teamName: teamInfo.name,
          userName: currentUserInfo.nickname,
        }),
      )
      if (flag === COPY_STATUS.EMPTY) {
        message.info({
          content: t("empty_copied_tips"),
        })
      } else {
        message.success({
          content: t("copied"),
        })
      }
    },
    [currentUserInfo.nickname, message, t, teamInfo.name],
  )

  return (
    <>
      <div css={headerWrapperStyle}>
        <h1 css={titleStyle}>{t("user_management.page.member")}</h1>
        <div css={buttonGroup}>
          <MoreAction afterLeaveTeam={afterLeaveTeam} />
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
          redirectURL=""
          onClose={() => setInviteModalVisible(false)}
          canInvite={enableInvite}
          currentUserRole={currentUserRole}
          defaultAllowInviteLink={teamInfo.permission.inviteLinkEnabled}
          defaultInviteUserRole={USER_ROLE.VIEWER}
          defaultBalance={
            isCloudVersion ? teamInfo?.currentTeamLicense?.balance : Infinity
          }
          onCopyInviteLink={handleCopy}
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
          onInvitedChange={(userList) => {
            const memberListInfo: MemberInfo[] = userList.map((user) => {
              return {
                ...user,
                userID: "",
                nickname: "",
                avatar: "",
                userStatus: USER_STATUS.PENDING,
                permission: {},
                createdAt: "",
                updatedAt: "",
              }
            })
            dispatch(teamActions.updateInvitedUserReducer(memberListInfo))
          }}
        />
      )}
    </>
  )
}
