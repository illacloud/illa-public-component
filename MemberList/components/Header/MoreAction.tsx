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
    allowEditorManageTeamMember,
    allowViewerManageTeamMember,
    updateTeamPermissionConfig,
    removeTeamMembers,
    removeTeam,
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
        await updateTeamPermissionConfig(value, value)
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
        title: t("team_setting.delete_modal.title"),
        children: t("team_setting.delete_modal.desctiption"),
        okText: t("team_setting.delete_modal.delete"),
        cancelText: t("team_setting.delete_modal.cancel"),
        okButtonProps: {
          colorScheme: "red",
        },
        onOk: () => {
          removeTeam()
        },
      })
    } else {
      modal.show({
        id: "leaveTeam",
        title: t("team_setting.leave_modal.title"),
        children: t("team_setting.leave_modal.description"),
        okText: t("team_setting.leave_modal.leave"),
        cancelText: t("team_setting.leave_modal.cancel"),
        okButtonProps: {
          colorScheme: "red",
        },
        onOk: () => {
          removeTeamMembers(currentUserID)
        },
      })
    }
  }, [currentUserID, currentUserRole, modal, removeTeamMembers, removeTeam])

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
      position="bottom-end"
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
                  colorScheme="techPurple"
                  onClick={stopPropagation}
                  onChange={handleSwitchChange}
                  checked={
                    allowEditorManageTeamMember && allowViewerManageTeamMember
                  }
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
