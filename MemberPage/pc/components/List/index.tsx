import { ERROR_FLAG, isILLAAPiError } from "@illa-public/illa-net"
import { USER_ROLE } from "@illa-public/public-types"
import { RoleSelector } from "@illa-public/role-selector"
import {
  getCurrentMemberList,
  getCurrentTeamInfo,
  teamActions,
} from "@illa-public/user-data"
import { FC, useCallback, useMemo } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { Table, useMessage } from "@illa-design/react"
import { fetchChangeTeamMemberRole } from "../../../service"
import { MoreAction } from "../MoreAction"
import { NameSpace } from "../NameSpace"
import { listBodyStyle, tableListContainerStyle } from "./style"

export const PCMemberList: FC = () => {
  const message = useMessage()
  const userListData = useSelector(getCurrentMemberList)
  const currentTeamInfo = useSelector(getCurrentTeamInfo)!
  const dispatch = useDispatch()
  const { teamMemberID, myRole, id: currentTeamID } = currentTeamInfo
  const { t } = useTranslation()

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

  const formatToTableData = useMemo(() => {
    if (!Array.isArray(userListData) || userListData.length === 0) return []
    return userListData.map((item) => {
      return {
        userInfo: {
          nickname: item.nickname,
          avatar: item.avatar,
          email: item.email,
          status: item.userStatus,
          userID: item.userID,
          teamMemberID: item.teamMemberID,
        },
        permissions: {
          teamMemberID: item.teamMemberID,
          userID: item.userID,
          userRole: item.userRole,
          email: item.email,
        },
        actions: {
          userID: item.userID,
          userRole: item.userRole,
          userStatus: item.userStatus,
          teamMemberID: item.teamMemberID,
          email: item.email,
          nickname: item.nickname,
        },
      }
    })
  }, [userListData])

  const tableColumns = useMemo(
    () => [
      {
        id: "userInfo",
        header: t("user_management.page.member"),
        accessorKey: "userInfo",
        size: 520,
        cell: (props: Record<string, any>) => {
          const value = props.getValue()
          return (
            <NameSpace
              name={value?.nickname}
              avatar={value?.avatar}
              email={value?.email}
              status={value?.status}
              userID={value?.userID}
              teamMemberID={value?.teamMemberID}
              currentUserID={teamMemberID}
            />
          )
        },
      },
      {
        id: "permissions",
        header: t("user_management.page.permission"),
        accessorKey: "permissions",
        cell: (props: Record<string, any>) => {
          const value = props.getValue()
          const executedUserRole =
            value.userRole !== USER_ROLE.OWNER ? [USER_ROLE.OWNER] : []
          return (
            <RoleSelector
              value={value.userRole}
              currentUserRole={myRole}
              onClickItem={(userRole: USER_ROLE) => {
                handleChangeTeamMembersRole(value.teamMemberID, userRole)
              }}
              isSelf={value.teamMemberID === teamMemberID}
              showOwner
              excludeUserRole={executedUserRole}
            />
          )
        },
      },
      {
        id: "action",
        header: " ",
        size: 32,
        accessorKey: "actions",
        enableSorting: false,
        cell: (props: Record<string, any>) => {
          const value = props.getValue()
          if (!value) return <span>-</span>
          return (
            <MoreAction
              email={value.email}
              userRole={value.userRole}
              userStatus={value.userStatus}
              currentUserRole={myRole}
              currentUserID={teamMemberID}
              teamMemberID={value.teamMemberID}
              name={value.nickname}
              teamID={currentTeamID}
            />
          )
        },
      },
    ],
    [currentTeamID, handleChangeTeamMembersRole, myRole, t, teamMemberID],
  )

  return (
    <div css={tableListContainerStyle}>
      <Table
        data={formatToTableData}
        css={listBodyStyle}
        columns={tableColumns}
        pinedHeader
        tableLayout="auto"
        customCellPadding="14px 16px"
        clickOutsideToResetRowSelect
        h="100%"
      />
    </div>
  )
}
