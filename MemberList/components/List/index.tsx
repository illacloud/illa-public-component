import { Button, MoreIcon, Select, Table } from "@illa-design/react"
import { FC, useMemo } from "react"
import { NameSpace } from "@/illa-public-component/MemberList/components/List/NameSpace"
import { ListProps } from "@/illa-public-component/MemberList/components/List/interface"
import {
  listBodyStyle,
  listWrapperStyle,
} from "@/illa-public-component/MemberList/components/List/style"
import { geSmallThenTargetRole } from "@/illa-public-component/MemberList/utils"
import { USER_ROLE, USER_STATUS } from "@/store/userInfo/userInfoState"

const userData = [
  {
    userID: "1",
    nickname: "123123123",
    email: "1@asdasd.com",
    avatar: "1",
    userRole: USER_ROLE.ADMIN,
    userStatus: USER_STATUS.OK,
    createdAt: "1",
    updatedAt: "1",
  },
  {
    userID: "2",
    nickname: "2",
    email: "2",
    avatar: "2",
    userRole: USER_ROLE.OWNER,
    userStatus: USER_STATUS.OK,
    createdAt: "2",
    updatedAt: "2",
  },
  {
    userID: "3",
    nickname: "3",
    email: "3",
    avatar: "2",
    userRole: USER_ROLE.EDITOR,
    userStatus: USER_STATUS.OK,
    createdAt: "2",
    updatedAt: "2",
  },
  {
    userID: "2",
    nickname: "2",
    email: "2",
    avatar: "2",
    userRole: USER_ROLE.VIEWER,
    userStatus: USER_STATUS.OK,
    createdAt: "2",
    updatedAt: "2",
  },
]
export const List: FC<ListProps> = (props) => {
  const { userListData = userData, removeTeamMembers } = props
  const data = useMemo(
    () => {
      if (!Array.isArray(userListData) || userListData.length === 0) {
        return []
      }
      return userListData.map((item) => {
        return {
          userInfo: {
            nickname: item.nickname,
            avatar: item.avatar,
            email: item.email,
          },
          permissions: {
            userRole: item.userRole,
            email: item.email,
          },
          actions: {
            userRole: item.userRole,
            email: item.email,
          },
        }
      })
    },

    // () => [
    //   {
    //     id: 1,
    //     name: {
    //       img: "xxxx",
    //       name: "xxxx",
    //       email: "xxxx",
    //     },
    //     company: "Ameliorated explicit open system",
    //   },
    //   {
    //     id: 2,
    //     name: {
    //       img: "xxxx",
    //       name: "xxxx",
    //       email: "xxxx",
    //     },
    //     company: "Customizable explicit solution",
    //   },
    //   {
    //     id: 3,
    //     name: {
    //       img: "xxxx",
    //       name: "xxxx",
    //       email: "xxxx",
    //     },
    //     company: "Proactive mission-critical open architecture",
    //   },
    //   {
    //     id: 4,
    //     name: {
    //       img: "xxxx",
    //       name: "xxxx",
    //       email: "xxxx",
    //     },
    //     company: "De-engineered bi-directional hardware",
    //   },
    //   {
    //     id: 5,
    //     name: {
    //       img: "xxxx",
    //       name: "xxxx",
    //       email: "xxxx",
    //     },
    //     company: "Customer-focused client-server budgetary management",
    //   },
    //   {
    //     id: 6,
    //     name: {
    //       img: "xxxx",
    //       name: "xxxx",
    //       email: "xxxx",
    //     },
    //     company: "Distributed interactive monitoring",
    //   },
    //   {
    //     id: 7,
    //     name: {
    //       img: "xxxx",
    //       name: "xxxx",
    //       email: "xxxx",
    //     },
    //     company: "Synchronised context-sensitive implementation",
    //   },
    //   {
    //     id: 8,
    //     name: {
    //       img: "xxxx",
    //       name: "xxxx",
    //       email: "xxxx",
    //     },
    //     company: "User-friendly responsive hardware",
    //   },
    //   {
    //     id: 9,
    //     name: {
    //       img: "xxxx",
    //       name: "xxxx",
    //       email: "xxxx",
    //     },
    //     company: "Compatible upward-trending system engine",
    //   },
    //   {
    //     id: 10,
    //     name: {
    //       img: "xxxx",
    //       name: "xxxx",
    //       email: "xxxx",
    //     },
    //     company: "Cloned scalable website",
    //   },
    //   {
    //     id: 11,
    //     name: {
    //       img: "xxxx",
    //       name: "xxxx",
    //       email: "xxxx",
    //     },
    //     company: "User-friendly responsive hardware",
    //   },
    //   {
    //     id: 12,
    //     name: {
    //       img: "xxxx",
    //       name: "xxxx",
    //       email: "xxxx",
    //     },
    //     company: "Compatible upward-trending system engine",
    //   },
    //   {
    //     id: 13,
    //     name: {
    //       img: "xxxx",
    //       name: "xxxx",
    //       email: "xxxx",
    //     },
    //     company: "Cloned scalable website",
    //   },
    //   {
    //     id: 13,
    //     name: {
    //       img: "xxxx",
    //       name: "xxxx",
    //       email: "xxxx",
    //     },
    //     company: "Cloned scalable website",
    //   },
    //   {
    //     id: 13,
    //     name: {
    //       img: "xxxx",
    //       name: "xxxx",
    //       email: "xxxx",
    //     },
    //     company: "Cloned scalable website",
    //   },
    //   {
    //     id: 13,
    //     name: {
    //       img: "xxxx",
    //       name: "xxxx",
    //       email: "xxxx",
    //     },
    //     company: "Cloned scalable website",
    //   },
    //   {
    //     id: 13,
    //     name: {
    //       img: "xxxx",
    //       name: "xxxx",
    //       email: "xxxx",
    //     },
    //     company: "Cloned scalable website",
    //   },
    //   {
    //     id: 13,
    //     name: {
    //       img: "xxxx",
    //       name: "xxxx",
    //       email: "xxxx",
    //     },
    //     company: "Cloned scalable website",
    //   },
    //   {
    //     id: 13,
    //     name: {
    //       img: "xxxx",
    //       name: "xxxx",
    //       email: "xxxx",
    //     },
    //     company: "Cloned scalable website",
    //   },
    //   {
    //     id: 13,
    //     name: {
    //       img: "xxxx",
    //       name: "xxxx",
    //       email: "xxxx",
    //     },
    //     company: "Cloned scalable website",
    //   },
    //   {
    //     id: 13,
    //     name: {
    //       img: "xxxx",
    //       name: "xxxx",
    //       email: "xxxx",
    //     },
    //     company: "Cloned scalable website",
    //   },
    //   {
    //     id: 13,
    //     name: {
    //       img: "xxxx",
    //       name: "xxxx",
    //       email: "xxxx",
    //     },
    //     company: "Cloned scalable website",
    //   },
    //   {
    //     id: 13,
    //     name: {
    //       img: "xxxx",
    //       name: "xxxx",
    //       email: "xxxx",
    //     },
    //     company: "Cloned scalable website",
    //   },
    //   {
    //     id: 13,
    //     name: {
    //       img: "xxxx",
    //       name: "xxxx",
    //       email: "xxxx",
    //     },
    //     company: "Cloned scalable website",
    //   },
    //   {
    //     id: 13,
    //     name: {
    //       img: "xxxx",
    //       name: "xxxx",
    //       email: "xxxx",
    //     },
    //     company: "Cloned scalable website",
    //   },
    // ],
    [],
  )

  const columns = useMemo(
    () => [
      {
        id: "userInfo",
        header: "userInfo",
        accessorKey: "userInfo",
        cell: (props: Record<string, any>) => {
          const value = props.getValue()
          return (
            <NameSpace
              name={value?.nickname}
              avatar={value?.avatar}
              email={value?.email}
            />
          )
        },
      },
      {
        id: "permissions",
        header: "permissions",
        accessorKey: "permissions",
        cell: (props: Record<string, any>) => {
          const value = props.getValue()
          const options = geSmallThenTargetRole(value.userRole, false, [
            USER_ROLE.OWNER,
            USER_ROLE.CUSTOM,
          ]).map((role) => {
            return USER_ROLE[role]
          })
          return <Select value={USER_ROLE[value.userRole]} options={options} />
        },
      },
      {
        id: "action",
        header: " ",
        accessorKey: "actions",
        enableSorting: false,
        cell: (props: Record<string, any>) => {
          const value = props.getValue()
          return (
            <div
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <Button colorScheme="grayBlue" w="32px">
                <MoreIcon />
              </Button>
            </div>
          )
        },
      },
    ],
    [],
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
