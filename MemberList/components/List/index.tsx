import { Table } from "@illa-design/react"
import { FC, useContext, useMemo } from "react"
import { useTranslation } from "react-i18next"
import { MoreAction } from "@/illa-public-component/MemberList/components/List/MoreAction"
import { NameSpace } from "@/illa-public-component/MemberList/components/List/NameSpace"
import { ListProps } from "@/illa-public-component/MemberList/components/List/interface"
import {
  cardStyle,
  listBodyStyle,
  listWrapperStyle,
} from "@/illa-public-component/MemberList/components/List/style"
import {
  SUBSCRIBE_PLAN,
  SUBSCRIPTION_CYCLE,
} from "@/illa-public-component/MemberList/interface"
import RoleSelect from "@/illa-public-component/RoleSelect"
import { UpgradeCloudContext } from "@/illa-public-component/UpgradeCloudProvider"
import { UsageCard } from "@/illa-public-component/UsageCard"
import { canManagePayment } from "@/illa-public-component/UserRoleUtils"
import { USER_ROLE } from "@/illa-public-component/UserRoleUtils/interface"

export const List: FC<ListProps> = (props) => {
  const {
    isCloudVersion,
    userListData,
    currentUserID,
    currentUserRole,
    currentTeamLicense,
    totalTeamLicense,
    removeTeamMembers,
    changeTeamMembersRole,
  } = props

  const { t } = useTranslation()

  const { handleLicenseDrawerVisible } = useContext(UpgradeCloudContext)

  const hasPaymentManagementPermission = useMemo(() => {
    return canManagePayment(
      currentUserRole,
      totalTeamLicense?.teamLicenseAllPaid,
    )
  }, [currentUserRole, totalTeamLicense?.teamLicenseAllPaid])

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

  const columns = useMemo(
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
              onChange={async (userRole: USER_ROLE) => {
                await changeTeamMembersRole(value.teamMemberID, userRole)
              }}
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
      removeTeamMembers,
      t,
    ],
  )

  const openDrawer = () => {
    handleLicenseDrawerVisible(true, {
      type: "license",
      subscribeInfo: {
        quantity: currentTeamLicense.cancelAtPeriodEnd
          ? 1
          : currentTeamLicense.volume,
        cycle: currentTeamLicense.cycle || SUBSCRIPTION_CYCLE.MONTHLY,
        plan: SUBSCRIBE_PLAN.TEAM_LICENSE_PLUS,
        currentPlan: currentTeamLicense.plan,
        cancelAtPeriodEnd: currentTeamLicense?.cancelAtPeriodEnd,
      },
    })
  }

  return (
    <div css={listWrapperStyle}>
      {isCloudVersion && hasPaymentManagementPermission ? (
        <UsageCard
          css={cardStyle}
          type="License"
          current={totalTeamLicense.volume - totalTeamLicense.balance}
          total={totalTeamLicense.volume}
          buttonColorScheme="grayBlue"
          buttonVariant="outline"
          onClick={openDrawer}
        />
      ) : null}
      {data?.length ? (
        <Table
          data={data}
          columns={columns}
          css={listBodyStyle}
          pinedHeader
          tableLayout="auto"
          h="100%"
          customCellPadding="14px 16px"
          clickOutsideToResetRowSelect
        />
      ) : null}
    </div>
  )
}
