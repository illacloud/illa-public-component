import {
  DropList,
  DropListItem,
  Dropdown,
  Switch,
  useMessage,
  useModal,
} from "@illa-design/react"
import { FC, MouseEvent, useCallback } from "react"
import { useTranslation } from "react-i18next"
import { AuthShown } from "@/illa-public-component/AuthShown"
import { SHOW_RULES } from "@/illa-public-component/AuthShown/interface"
import { MoreActionProps } from "@/illa-public-component/MemberList/components/Header/interface"
import { allowEditorOrViewerInviteWrapperStyle } from "@/illa-public-component/MemberList/components/Header/style"
import { USER_ROLE } from "@/illa-public-component/UserRoleUtils/interface"

const stopPropagation = (e: MouseEvent) => {
  e.stopPropagation()
}
export const MoreAction: FC<MoreActionProps> = (props) => {
  const {
    children,
    currentUserID,
    currentUserRole,
    currentTeamMemberID,
    hasApp,
    allowEditorManageTeamMember,
    allowViewerManageTeamMember,
    updateTeamPermissionConfig,
    removeTeamMembers,
    removeTeam,
    isCloudVersion,
  } = props
  const modal = useModal()
  const message = useMessage()
  const { t } = useTranslation()

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
            .then((res) => {
              if (res) {
                message.success({
                  content: t("team_setting.mes.delete_suc"),
                })
              }
            })
            .catch((e) => {
              message.error({
                content: t("team_setting.mes.delete_fail"),
              })
            })
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
          removeTeamMembers(currentTeamMemberID)
            .then((res) => {
              if (res) {
                message.success({
                  content: t("team_setting.mes.leave_suc"),
                })
              }
            })
            .catch((e) => {
              message.error({
                content: t("team_setting.mes.leave_fail"),
              })
            })
        },
      })
    }
  }, [
    currentTeamMemberID,
    currentUserRole,
    removeTeamMembers,
    removeTeam,
    message,
    modal,
    t,
  ])

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
        <DropList
          onClickItem={(key) => {
            handleClickDropList(key as string)
          }}
        >
          <AuthShown
            currentUserRole={currentUserRole}
            allowRoles={[USER_ROLE.OWNER, USER_ROLE.ADMIN]}
            rules={SHOW_RULES.EQUAL}
          >
            <DropListItem key="1" value="1">
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
          {isCloudVersion ? (
            <DropListItem key="leaveTeam" value="leaveTeam">
              {currentUserRole === USER_ROLE.OWNER
                ? t("team_setting.left_panel.delete")
                : t("team_setting.left_panel.leave")}
            </DropListItem>
          ) : currentUserRole !== USER_ROLE.OWNER ? (
            <DropListItem key="leaveTeam" value="leaveTeam">
              {t("team_setting.left_panel.leave")}
            </DropListItem>
          ) : null}
        </DropList>
      }
    >
      {children}
    </Dropdown>
  )
}
