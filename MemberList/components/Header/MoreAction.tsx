import { DropList, Dropdown, Switch, useModal } from "@illa-design/react"
import { FC, MouseEvent, useCallback, useMemo } from "react"
import { MoreActionProps } from "@/illa-public-component/MemberList/components/Header/interface"
import { allowEditorOrViewerInviteWrapperStyle } from "@/illa-public-component/MemberList/components/Header/style"
import { USER_ROLE } from "@/store/userInfo/userInfoState"

const DropListItem = DropList.Item

const stopPropagation = (e: MouseEvent) => {
  e.stopPropagation()
}
export const MoreAction: FC<MoreActionProps> = (props) => {
  const {
    children,
    currentUserID,
    currentUserRole,
    hasApp,
    updateTeamPermissionConfig,
    removeTeamMembers,
  } = props
  const modal = useModal()

  const canShowLeaveTeam = useMemo(() => {
    if (currentUserRole === USER_ROLE.OWNER) {
      return !hasApp
    }
    return true
  }, [currentUserRole, hasApp])

  const handleSwitchChange = useCallback(
    async (value: boolean) => {
      try {
        await updateTeamPermissionConfig(value)
      } catch (e) {
        console.error(e)
      }
    },
    [updateTeamPermissionConfig],
  )

  const handleClickItem = useCallback(() => {
    if (currentUserRole === USER_ROLE.OWNER) {
      modal.show({
        title: "Are you sure you want to delete this team?",
        children:
          "The team domain will be unavailable after deletion, and all members will be removed from this team.",
        okText: "Confirm",
        cancelText: "Cancel",
        okButtonProps: {
          colorScheme: "red",
        },
        onOk: () => {
          removeTeamMembers(currentUserID)
        },
      })
    } else {
      modal.show({
        title: "Are you sure you want to leave this team?",
        children:
          "You will not be able to access any team resources after leaving.",
        okText: "Leave",
        cancelText: "Cancel",
        okButtonProps: {
          colorScheme: "red",
        },
        onOk: () => {
          removeTeamMembers(currentUserID)
        },
      })
    }
  }, [currentUserID, currentUserRole, modal, removeTeamMembers])

  const handleClickDropList = useCallback(
    (key: string) => {
      if (key === "leaveTeam") {
        handleClickItem()
      }
    },
    [handleClickItem],
  )

  return (
    <Dropdown
      trigger="click"
      position="bottom"
      dropList={
        <DropList onClickItem={handleClickDropList}>
          <DropListItem key="1">
            <div
              css={allowEditorOrViewerInviteWrapperStyle}
              onClick={stopPropagation}
            >
              <span>Allow editors and viewers to invite members.</span>
              <Switch onClick={stopPropagation} onChange={handleSwitchChange} />
            </div>
          </DropListItem>
          {canShowLeaveTeam && (
            <DropListItem key="leaveTeam">
              {currentUserRole === USER_ROLE.OWNER
                ? "Delete team"
                : "Leave team"}
            </DropListItem>
          )}
        </DropList>
      }
    >
      {children}
    </Dropdown>
  )
}
