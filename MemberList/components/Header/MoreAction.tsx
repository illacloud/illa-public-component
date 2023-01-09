import { DropList, Dropdown, Switch, useModal } from "@illa-design/react"
import { FC, MouseEvent, useCallback, useMemo } from "react"
import { useTranslation } from "react-i18next"
import { AuthShown } from "@/illa-public-component/AuthShown"
import { SHOW_RULES } from "@/illa-public-component/AuthShown/interface"
import { MoreActionProps } from "@/illa-public-component/MemberList/components/Header/interface"
import { allowEditorOrViewerInviteWrapperStyle } from "@/illa-public-component/MemberList/components/Header/style"
import { USER_ROLE } from "@/illa-public-component/UserRoleUtils/interface"

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

  const { t } = useTranslation()

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
        id: "deleteTeam",
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
        id: "leaveTeam",
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
          <AuthShown
            currentUserRole={currentUserRole}
            allowRoles={[USER_ROLE.OWNER, USER_ROLE.ADMIN]}
            rules={SHOW_RULES.EQUAL}
          >
            <DropListItem key="1">
              <div
                css={allowEditorOrViewerInviteWrapperStyle}
                onClick={stopPropagation}
              >
                <span>
                  {t("user_management.settings.allow_editors_invite")}
                </span>
                <Switch
                  onClick={stopPropagation}
                  onChange={handleSwitchChange}
                />
              </div>
            </DropListItem>
          </AuthShown>
          {canShowLeaveTeam && (
            <DropListItem key="leaveTeam">
              {currentUserRole === USER_ROLE.OWNER
                ? t("team_setting.left_panel.delete")
                : t("team_setting.left_panel.leave")}
            </DropListItem>
          )}
        </DropList>
      }
    >
      {children}
    </Dropdown>
  )
}
