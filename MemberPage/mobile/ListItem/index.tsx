import { Avatar } from "@illa-public/avatar"
import { ERROR_FLAG, isILLAAPiError } from "@illa-public/illa-net"
import { USER_ROLE, USER_STATUS } from "@illa-public/public-types"
import { RoleSelector } from "@illa-public/role-selector"
import { teamActions } from "@illa-public/user-data"
import { FC, useCallback } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch } from "react-redux"
import { useMessage } from "@illa-design/react"
import { fetchChangeTeamMemberRole } from "../../service"
import { ListItemProps } from "./interface"
import {
  emailStyle,
  listAvatarAndNameContainerStyle,
  listItemContainerStyle,
  nickNameAndEmailContainerStyle,
  nickNameContainerStyle,
  statusStyle,
} from "./style"

export const MobileMemberListItem: FC<ListItemProps> = (props) => {
  const {
    nickName,
    userID,
    email,
    status,
    userRole,
    currentUserID,
    currentUserRole,
    avatarURL,
    currentTeamID,
    teamMemberID,
  } = props

  const { t } = useTranslation()
  const dispatch = useDispatch()
  const message = useMessage()

  const executedUserRole = userRole !== USER_ROLE.OWNER ? [USER_ROLE.OWNER] : []

  const handleChangeTeamMembersRole = useCallback(
    async (teamMemberID: string, userRole: USER_ROLE) => {
      try {
        await fetchChangeTeamMemberRole(currentTeamID, teamMemberID, userRole)
        dispatch(
          teamActions.updateTeamMemberUserRoleReducer({
            teamMemberID: teamMemberID,
            userRole: userRole,
          }),
        )
        message.success({
          content: t("user_management.mes.change_role_suc"),
        })
      } catch (error) {
        if (isILLAAPiError(error)) {
          switch (error.data.errorFlag) {
            case ERROR_FLAG.ERROR_FLAG_ACCESS_DENIED:
            case ERROR_FLAG.ERROR_FLAG_CAN_NOT_INCREASE_TEAM_MEMBER_DUE_TO_NO_BALANCE:
              message.error({
                content: t("user_management.mes.change_role_fail"),
              })
              break
            case ERROR_FLAG.ERROR_FLAG_CAN_NOT_UPDATE_TEAM_MEMBER_ROLE_BECAUSE_APPSUMO_BUYER:
              message.error({
                content: t("billing.message.appsumo.transfer"),
              })
              break
            default:
              if (userRole === USER_ROLE.OWNER) {
                message.error({
                  content: t("user_management.mes.transfer_fail"),
                })
              } else {
                message.error({
                  content: t("user_management.mes.change_role_fail"),
                })
              }
              break
          }
        }
      }
    },
    [dispatch, currentTeamID, message, t],
  )

  return (
    <div css={listItemContainerStyle}>
      <div css={listAvatarAndNameContainerStyle}>
        <Avatar name={nickName} id={userID} avatarUrl={avatarURL} size={40} />
        <div css={nickNameAndEmailContainerStyle}>
          <div css={nickNameContainerStyle}>
            <span>{nickName}</span>
            {status === USER_STATUS.PENDING && (
              <span> ({t("user_management.status.pending")})</span>
            )}
            {userID === currentUserID && (
              <span css={statusStyle}>
                {" "}
                ({t("user_management.status.current-user")})
              </span>
            )}
          </div>
          <span css={emailStyle}>{email}</span>
        </div>
      </div>
      <RoleSelector
        value={userRole}
        currentUserRole={currentUserRole}
        showOwner
        isSelf={currentUserID === userID}
        onClickItem={(role) => {
          handleChangeTeamMembersRole(teamMemberID, role)
        }}
        excludeUserRole={executedUserRole}
      />
    </div>
  )
}
