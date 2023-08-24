import { ERROR_FLAG, isILLAAPiError } from "@illa-public/illa-net"
import { RoleSelector } from "@illa-public/role-selector"
import {
  USER_ROLE,
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

export const PCMemberList: FC = () => {
  const message = useMessage()
  const userListData = useSelector(getCurrentMemberList)
  const currentTeamInfo = useSelector(getCurrentTeamInfo)!
  const dispatch = useDispatch()
  const { teamMemberID, myRole, id: currentTeamID } = currentTeamInfo
  const { t } = useTranslation()

  const handleChangeTeamMembersRole = useCallback(
    async (userID: string, userRole: USER_ROLE) => {
      try {
        await fetchChangeTeamMemberRole(currentTeamID, userID, userRole)
        if (userRole === USER_ROLE.OWNER) {
          dispatch(
            teamActions.updateTransUserRoleReducer({ teamMemberID: userID }),
          )
          message.success({
            content: t("user_management.mes.transfer_suc"),
          })
        } else {
          dispatch(
            teamActions.updateTeamMemberUserRoleReducer({
              teamMemberID: userID,
              userRole: userRole,
            }),
          )
          message.success({
            content: t("user_management.mes.change_role_suc"),
          })
        }
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
        size: 400,
        cell: (props: Record<string, any>) => {
          const value = props.getValue()
          return (
            <NameSpace
              name={value?.nickname}
              avatar={value?.avatar}
              email={value?.email}
              status={value?.status}
              userID={value?.userID}
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
          return (
            <RoleSelector
              value={value.userRole}
              currentUserRole={myRole}
              onClickItem={(userRole: USER_ROLE) => {
                handleChangeTeamMembersRole(value.teamMemberID, userRole)
              }}
              isSelf={value.teamMemberID === teamMemberID}
              showOwner
            />
          )
        },
      },
      {
        id: "action",
        header: " ",
        size: 100,
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
              changeTeamMembersRole={handleChangeTeamMembersRole}
              teamID={currentTeamID}
            />
          )
        },
      },
    ],
    [currentTeamID, handleChangeTeamMembersRole, myRole, t, teamMemberID],
  )

  return (
    <Table
      data={formatToTableData}
      columns={tableColumns}
      pinedHeader
      tableLayout="auto"
      customCellPadding="14px 16px"
      clickOutsideToResetRowSelect
    />
  )
}
