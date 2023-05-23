import { FC, MouseEvent, useCallback, useContext } from "react"
import { useTranslation } from "react-i18next"
import {
  DropList,
  DropListItem,
  Dropdown,
  Switch,
  useMessage,
  useModal,
} from "@illa-design/react"
import { AuthShown } from "@/illa-public-component/AuthShown"
import { SHOW_RULES } from "@/illa-public-component/AuthShown/interface"
import { MoreActionProps } from "@/illa-public-component/MemberList/components/Header/interface"
import { allowEditorOrViewerInviteWrapperStyle } from "@/illa-public-component/MemberList/components/Header/style"
import { ILLA_MIXPANEL_EVENT_TYPE } from "@/illa-public-component/MixpanelUtils/interface"
import { MixpanelTrackContext } from "@/illa-public-component/MixpanelUtils/mixpanelContext"
import { USER_ROLE } from "@/illa-public-component/UserRoleUtils/interface"

const stopPropagation = (e: MouseEvent) => {
  e.stopPropagation()
}
export const MoreAction: FC<MoreActionProps> = (props) => {
  const {
    children,
    currentUserRole,
    currentTeamMemberID,
    allowEditorManageTeamMember,
    allowViewerManageTeamMember,
    updateTeamPermissionConfig,
    removeTeamMembers,
    removeTeam,
    isCloudVersion,
    userNumber,
  } = props
  const modal = useModal()
  const message = useMessage()
  const { t } = useTranslation()
  const { track } = useContext(MixpanelTrackContext)

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
          track?.(
            ILLA_MIXPANEL_EVENT_TYPE.CLICK,
            {
              element: "delete_modal_delete",
              parameter1: "delete_select",
              parameter4: userNumber,
            },
            "team_id",
          )
          removeTeam()
            .then((res) => {
              if (res) {
                message.success({
                  content: t("team_setting.mes.delete_suc"),
                })
              }
            })
            .catch(() => {
              message.error({
                content: t("team_setting.mes.delete_fail"),
              })
            })
        },
        onCancel: () => {
          track?.(
            ILLA_MIXPANEL_EVENT_TYPE.CLICK,
            {
              element: "delete_modal_cancel",
            },
            "team_id",
          )
        },
      })
      track?.(
        ILLA_MIXPANEL_EVENT_TYPE.SHOW,
        {
          element: "delete_modal",
          parameter1: "delete_select",
          parameter4: userNumber,
        },
        "team_id",
      )
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
          track?.(
            ILLA_MIXPANEL_EVENT_TYPE.CLICK,
            {
              element: "leave_modal_leave",
            },
            "both",
          )
          removeTeamMembers(currentTeamMemberID)
            .then((res) => {
              if (res) {
                message.success({
                  content: t("team_setting.mes.leave_suc"),
                })
                track?.(
                  ILLA_MIXPANEL_EVENT_TYPE.REQUEST,
                  {
                    element: "delete",
                    parameter1: "delete_select",
                  },
                  "team_id",
                )
              }
            })
            .catch(() => {
              message.error({
                content: t("team_setting.mes.leave_fail"),
              })
            })
        },
        onCancel: () => {
          track?.(
            ILLA_MIXPANEL_EVENT_TYPE.CLICK,
            {
              element: "leave_modal_cancel",
            },
            "both",
          )
        },
      })
      track?.(
        ILLA_MIXPANEL_EVENT_TYPE.SHOW,
        {
          element: "leave_modal",
        },
        "both",
      )
    }
  }, [
    currentUserRole,
    track,
    userNumber,
    modal,
    t,
    removeTeam,
    message,
    removeTeamMembers,
    currentTeamMemberID,
  ])

  const handleClickDropList = useCallback(
    (key: string) => {
      if (key === "leaveTeam") {
        handleClickItem()
      }
    },
    [handleClickItem],
  )

  const handleClickDeleteOrLeaveTeam = useCallback(() => {
    switch (currentUserRole) {
      case USER_ROLE.OWNER: {
        track?.(
          ILLA_MIXPANEL_EVENT_TYPE.CLICK,
          {
            element: "delete",
            parameter1: "delete_select",
            parameter2: userNumber,
          },
          "team_id",
        )
        break
      }
      default: {
        track?.(
          ILLA_MIXPANEL_EVENT_TYPE.CLICK,
          {
            element: "leave",
          },
          "both",
        )
      }
    }
  }, [currentUserRole, track, userNumber])

  return (
    <Dropdown
      trigger="click"
      position="bottom-end"
      triggerProps={{
        zIndex: 2,
      }}
      onVisibleChange={(show: boolean) => {
        if (show) {
          track?.(
            ILLA_MIXPANEL_EVENT_TYPE.SHOW,
            {
              element: "more",
            },
            "both",
          )
          track?.(
            ILLA_MIXPANEL_EVENT_TYPE.SHOW,
            {
              element: "allow_manage",
              parameter2:
                allowEditorManageTeamMember && allowViewerManageTeamMember
                  ? "on"
                  : "off",
            },
            "both",
          )
        }
      }}
      dropList={
        <DropList
          onClickItem={(key: any) => {
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
                  onChange={(value: boolean) => {
                    handleSwitchChange(value)
                    track?.(
                      ILLA_MIXPANEL_EVENT_TYPE.CLICK,
                      {
                        element: "allow_manage",
                        parameter2: value ? "on" : "off",
                      },
                      "both",
                    )
                  }}
                  checked={
                    allowEditorManageTeamMember && allowViewerManageTeamMember
                  }
                />
              </div>
            </DropListItem>
          </AuthShown>
          {isCloudVersion ? (
            <DropListItem
              key="leaveTeam"
              value="leaveTeam"
              onClick={handleClickDeleteOrLeaveTeam}
            >
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
