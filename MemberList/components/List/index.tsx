import { Select, Table } from "@illa-design/react"
import { FC, useCallback, useMemo } from "react"
import { useTranslation } from "react-i18next"
import { MoreAction } from "@/illa-public-component/MemberList/components/List/MoreAction"
import { NameSpace } from "@/illa-public-component/MemberList/components/List/NameSpace"
import { ListProps } from "@/illa-public-component/MemberList/components/List/interface"
import {
  listBodyStyle,
  listWrapperStyle,
} from "@/illa-public-component/MemberList/components/List/style"
import {
  getSmallThenTargetRole,
  userRoleMapI18nString,
} from "@/illa-public-component/UserRoleUtils"
import { USER_ROLE } from "@/illa-public-component/UserRoleUtils/interface"

export const List: FC<ListProps> = (props) => {
  const {
    userListData,
    currentUserRole,
    currentUserID,
    removeTeamMembers,
    changeTeamMembersRole,
  } = props

  const { t } = useTranslation()

  const data = useMemo(() => {
    if (!Array.isArray(userListData) || userListData.length === 0) {
      return []
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
          userRole: item.userRole,
          email: item.email,
        },
        actions: {
          userID: item.userID,
          userRole: item.userRole,
          email: item.email,
          nickname: item.nickname,
        },
      }
    })
  }, [userListData])

  const handleChangeRole = useCallback(
    async (userID: string, value: USER_ROLE) => {
      try {
        const res = await changeTeamMembersRole(userID, value)
        if (!res) {
        }
      } catch (e) {
        console.error(e)
      }
    },
    [changeTeamMembersRole],
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
          const options = getSmallThenTargetRole(currentUserRole, false, [
            USER_ROLE.OWNER,
            USER_ROLE.CUSTOM,
          ]).map((role) => {
            const labelI18nKey = userRoleMapI18nString[role]

            return {
              label: t(labelI18nKey),
              value: role,
            }
          })

          return (
            <Select
              value={t(userRoleMapI18nString[value.userRole as USER_ROLE])}
              options={options}
              onChange={(userRole: USER_ROLE) => {
                handleChangeRole(value?.userID, userRole)
              }}
              w="auto"
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
              currentUserRole={currentUserRole}
              currentUserID={currentUserID}
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
      <Table
        data={data}
        columns={columns}
        css={listBodyStyle}
        pinedHeader
        tableLayout="auto"
        h="100%"
      />
    </div>
  )
}
