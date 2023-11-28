import { AuthShown, SHOW_RULES } from "@illa-public/auth-shown"
import { ERROR_FLAG, isILLAAPiError } from "@illa-public/illa-net"
import {
  ILLA_MIXPANEL_EVENT_TYPE,
  MixpanelTrackContext,
} from "@illa-public/mixpanel-utils"
import { USER_ROLE } from "@illa-public/public-types"
import { getCurrentTeamInfo, teamActions } from "@illa-public/user-data"
import { isCloudVersion } from "@illa-public/utils"
import { FC, MouseEvent, useCallback, useContext, useState } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import {
  Button,
  DropList,
  DropListItem,
  Dropdown,
  MoreIcon,
  Switch,
  useMessage,
  useModal,
} from "@illa-design/react"
import {
  fetchRemoveTeamMember,
  fetchUpdateTeamPermissionConfig,
} from "../../../service"
import { IPcMoreActionProps } from "./interface"
import {
  allowEditorOrViewerInviteWrapperStyle,
  moreActionTextStyle,
} from "./style"

const stopPropagation = (e: MouseEvent) => {
  e.stopPropagation()
}
export const MoreAction: FC<IPcMoreActionProps> = (props) => {
  const { afterLeaveTeam } = props
  const modal = useModal()
  const message = useMessage()
  const { t } = useTranslation()
  const { track } = useContext(MixpanelTrackContext)
  const currentTeamInfo = useSelector(getCurrentTeamInfo)!
  const {
    myRole: currentUserRole,
    teamMemberID: currentTeamMemberID,
    id: currentTeamID,
  } = currentTeamInfo
  const {
    blockRegister,
    allowEditorManageTeamMember,
    allowViewerManageTeamMember,
  } = currentTeamInfo.permission
  const [allowInviteLoading, setAllowInviteLoading] = useState(false)
  const [blockRegisterLoading, setBlockRegisterLoading] = useState(false)
  const dispatch = useDispatch()

  const handleClickDeleteOrLeaveTeam = useCallback(() => {
    track?.(
      ILLA_MIXPANEL_EVENT_TYPE.CLICK,
      {
        element: "leave",
      },
      "both",
    )
    modal.show({
      id: "leaveTeam",
      title: t("team_setting.leave_modal.title"),
      children: t("team_setting.leave_modal.description"),
      okText: t("team_setting.leave_modal.leave"),
      cancelText: t("team_setting.leave_modal.cancel"),
      okButtonProps: {
        colorScheme: "red",
      },
      afterOpen: () => {
        track?.(
          ILLA_MIXPANEL_EVENT_TYPE.SHOW,
          {
            element: "leave_modal",
          },
          "both",
        )
      },
      onOk: async () => {
        track?.(
          ILLA_MIXPANEL_EVENT_TYPE.CLICK,
          {
            element: "leave_modal_leave",
          },
          "both",
        )
        try {
          await fetchRemoveTeamMember(currentTeamID, currentTeamMemberID)
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
          afterLeaveTeam?.()
        } catch (e) {
          if (isILLAAPiError(e)) {
            switch (e.data.errorFlag) {
              case ERROR_FLAG.ERROR_FLAG_CAN_NOT_REMOVE_TEAM_MEMBER_BECAUSE_APPSUMO_BUYER:
                message.error({
                  content: t("billing.message.appsumo.leave"),
                })
                break
              case ERROR_FLAG.ERROR_FLAG_CAN_NOT_REMOVE_OWNER_FROM_TEAM:
                location.reload()
                break
              default:
                message.error({
                  content: t("team_setting.mes.leave_fail"),
                })
                break
            }
          }
        }
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
  }, [
    afterLeaveTeam,
    currentTeamID,
    currentTeamMemberID,
    message,
    modal,
    t,
    track,
  ])

  const handleChangeInviteByEditor = async (value: boolean) => {
    track?.(
      ILLA_MIXPANEL_EVENT_TYPE.CLICK,
      {
        element: "allow_manage",
        parameter2: value ? "on" : "off",
      },
      "both",
    )
    try {
      setAllowInviteLoading(true)
      await fetchUpdateTeamPermissionConfig(currentTeamID, {
        allowEditorManageTeamMember: value,
        allowViewerManageTeamMember: value,
      })
      dispatch(
        teamActions.updateTeamMemberPermissionReducer({
          teamID: currentTeamID,
          newPermission: {
            allowEditorManageTeamMember: value,
            allowViewerManageTeamMember: value,
          },
        }),
      )
    } catch (e) {
    } finally {
      setAllowInviteLoading(false)
    }
  }

  const handleChangeRegister = async (value: boolean) => {
    setBlockRegisterLoading(true)
    try {
      await fetchUpdateTeamPermissionConfig(currentTeamID, {
        blockRegister: !value,
      })
      dispatch(
        teamActions.updateTeamMemberPermissionReducer({
          teamID: currentTeamID,
          newPermission: {
            blockRegister: !value,
          },
        }),
      )
    } catch (e) {
    } finally {
      setBlockRegisterLoading(false)
    }
  }

  return (
    <>
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
          <DropList>
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
                  <span css={moreActionTextStyle}>
                    {t("user_management.settings.allow_editors_invite")}
                  </span>
                  <Switch
                    colorScheme="techPurple"
                    onClick={stopPropagation}
                    onChange={handleChangeInviteByEditor}
                    disabled={allowInviteLoading}
                    checked={
                      allowEditorManageTeamMember && allowViewerManageTeamMember
                    }
                  />
                </div>
              </DropListItem>
            </AuthShown>
            {!isCloudVersion && (
              <AuthShown
                currentUserRole={currentUserRole}
                allowRoles={[USER_ROLE.OWNER, USER_ROLE.ADMIN]}
                rules={SHOW_RULES.EQUAL}
              >
                <DropListItem key="2" value="2">
                  <div
                    css={allowEditorOrViewerInviteWrapperStyle}
                    onClick={stopPropagation}
                  >
                    <span css={moreActionTextStyle}>
                      {t("user_management.settings.allow_register")}
                    </span>
                    <Switch
                      colorScheme="techPurple"
                      onClick={stopPropagation}
                      onChange={handleChangeRegister}
                      checked={!blockRegister}
                      disabled={blockRegisterLoading}
                    />
                  </div>
                </DropListItem>
              </AuthShown>
            )}
            {isCloudVersion && currentUserRole !== USER_ROLE.OWNER ? (
              <DropListItem
                key="leaveTeam"
                value="leaveTeam"
                onClick={handleClickDeleteOrLeaveTeam}
              >
                {t("team_setting.left_panel.leave")}
              </DropListItem>
            ) : null}
          </DropList>
        }
      >
        <Button w="32px" leftIcon={<MoreIcon />} colorScheme="grayBlue" />
      </Dropdown>
    </>
  )
}
