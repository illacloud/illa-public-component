import { Table, useMessage } from "@illa-design/react"
import { FC, useCallback, useMemo } from "react"
import { useTranslation } from "react-i18next"
import { MoreAction } from "@/illa-public-component/MemberList/components/List/MoreAction"
import { NameSpace } from "@/illa-public-component/MemberList/components/List/NameSpace"
import { ListProps } from "@/illa-public-component/MemberList/components/List/interface"
import {
  listBodyStyle,
  listWrapperStyle,
  nameStyle,
} from "@/illa-public-component/MemberList/components/List/style"
import RoleSelect from "@/illa-public-component/RoleSelect"
import { USER_ROLE } from "@/illa-public-component/UserRoleUtils/interface"

export const List: FC<ListProps> = (props) => {
  const {
    userListData,
    currentUserID,
    currentUserRole,
    removeTeamMembers,
    changeTeamMembersRole,
  } = props

  const { t } = useTranslation()
  const message = useMessage()

  const data = useMemo(() => {
    if (!Array.isArray(userListData) || userListData.length === 0) {
      return undefined
    }
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

  const handleChangeRole = useCallback(
    async (teamMemberID: string, value: USER_ROLE) => {
      try {
        const res = await changeTeamMembersRole(teamMemberID, value)
        if (!res) {
          message.error({
            content: t("user_management.mes.change_role_fail"),
          })
        }
      } catch (e) {
        message.error({
          content: t("user_management.mes.change_role_fail"),
        })
        console.error(e)
      }
    },
    [changeTeamMembersRole, message, t],
  )

  const columns = useMemo(
    () => [
      {
        id: "userInfo",
        header: t("user_management.page.member"),
        accessorKey: "userInfo",
        cell: (props: Record<string, any>) => {
          const value = props.getValue()
          return (
            <NameSpace
              name={value?.nickname}
              avatar={value?.avatar}
              email={value?.email}
              status={value?.status}
              userID={value?.userID}
              currentUserID={currentUserID}
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
            <RoleSelect
              fontWeight={500}
              value={value.userRole}
              userRole={currentUserRole}
              disabled={value.userID === currentUserID}
              onChange={(userRole: USER_ROLE) => {
                handleChangeRole(value.teamMemberID, userRole)
              }}
            />
          )
        },
      },
      {
        id: "action",
        header: " ",
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
              currentUserRole={currentUserRole}
              currentUserID={currentUserID}
              teamMemberID={value.teamMemberID}
              userID={value.userID}
              name={value.nickname}
              removeTeamMembers={removeTeamMembers}
              changeTeamMembersRole={changeTeamMembersRole}
            />
          )
        },
      },
    ],
    [
      changeTeamMembersRole,
      currentUserID,
      currentUserRole,
      handleChangeRole,
      removeTeamMembers,
      t,
    ],
  )

  return (
    <div css={listWrapperStyle}>
      {data?.length ? (
        <Table
          data={data}
          columns={columns}
          css={listBodyStyle}
          pinedHeader
          tableLayout="auto"
          h="100%"
          clickOutsideToResetRowSelect
        />
      ) : null}
    </div>
  )
}
