import { AuthShown, SHOW_RULES } from "@illa-public/auth-shown"
import {
  ILLA_MIXPANEL_EVENT_TYPE,
  MixpanelTrackContext,
} from "@illa-public/mixpanel-utils"
import { USER_ROLE, USER_STATUS } from "@illa-public/public-types"
import {
  FREE_TEAM_LIMIT_TYPE,
  handleFreeTeamLimitError,
} from "@illa-public/upgrade-modal"
import { teamActions } from "@illa-public/user-data"
import { isSmallThanTargetRole } from "@illa-public/user-role-utils"
import { FC, useCallback, useContext, useEffect, useMemo } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch } from "react-redux"
import {
  Button,
  DropList,
  DropListItem,
  Dropdown,
  MoreIcon,
  useMessage,
  useModal,
} from "@illa-design/react"
import {
  fetchChangeTeamMemberRole,
  fetchRemoveTeamMember,
} from "../../../service"
import { MoreActionProps } from "./interface"
import { moreActionWrapper } from "./style"

export const MoreAction: FC<MoreActionProps> = (props) => {
  const {
    currentUserRole,
    userRole,
    userStatus,
    teamMemberID,
    currentUserID,
    name,
    email,
    teamID,
  } = props

  const { track } = useContext(MixpanelTrackContext)
  const dispatch = useDispatch()

  const modal = useModal()
  const message = useMessage()
  const { t } = useTranslation()

  const disabled = useMemo(() => {
    return (
      teamMemberID === currentUserID ||
      isSmallThanTargetRole(userRole, currentUserRole, false)
    )
  }, [teamMemberID, currentUserID, userRole, currentUserRole])

  const handleClickRemoveMember = useCallback(() => {
    modal.show({
      id: "removeMember",
      title: t("user_management.remove_modal.title", {
        username: name ? name : email,
      }),
      children: t("user_management.remove_modal.description"),
      okText: t("user_management.remove_modal.remove"),
      cancelText: t("user_management.remove_modal.cancel"),
      okButtonProps: {
        colorScheme: "red",
      },
      onOk: async () => {
        track?.(
          ILLA_MIXPANEL_EVENT_TYPE.CLICK,
          {
            element: "remove_modal_remove",
          },
          "both",
        )
        try {
          await fetchRemoveTeamMember(teamID, teamMemberID)
          dispatch(teamActions.deleteMemberListReducer(teamMemberID))
          message.success({
            content: t("user_management.mes.remove_suc"),
          })
        } catch (e) {
          message.error({
            content: t("user_management.mes.remove_fail"),
          })
          console.error(e)
        }
      },
      onCancel: () => {
        track?.(
          ILLA_MIXPANEL_EVENT_TYPE.CLICK,
          {
            element: "remove_modal_cancel",
          },
          "both",
        )
      },
    })
    track?.(
      ILLA_MIXPANEL_EVENT_TYPE.SHOW,
      {
        element: "remove_modal",
      },
      "both",
    )
  }, [dispatch, email, message, modal, name, t, teamID, teamMemberID, track])

  const handleClickTransOwner = useCallback(() => {
    modal.show({
      id: "transOwner",
      title: t("user_management.transfer_modal.title"),
      children: t("user_management.transfer_modal.description"),
      okText: t("user_management.transfer_modal.transfer"),
      cancelText: t("user_management.transfer_modal.cancel"),
      okButtonProps: {
        colorScheme: "red",
      },
      onOk: async () => {
        track?.(
          ILLA_MIXPANEL_EVENT_TYPE.CLICK,
          {
            element: "transfer_modal_transfer",
          },
          "both",
        )
        try {
          await fetchChangeTeamMemberRole(teamID, teamMemberID, USER_ROLE.OWNER)

          dispatch(
            teamActions.updateTransUserRoleReducer({
              teamMemberID: teamMemberID,
            }),
          )
          message.success({
            content: t("user_management.mes.transfer_suc"),
          })
        } catch (e) {
          const res = handleFreeTeamLimitError(
            e,
            FREE_TEAM_LIMIT_TYPE.TRANSFER_OWNER,
          )
          if (res) return
          message.error({
            content: t("user_management.mes.transfer_fail"),
          })
        }
      },
      onCancel: () => {
        track?.(
          ILLA_MIXPANEL_EVENT_TYPE.CLICK,
          {
            element: "transfer_modal_cancel",
          },
          "both",
        )
      },
    })
    track?.(
      ILLA_MIXPANEL_EVENT_TYPE.SHOW,
      {
        element: "transfer_modal",
      },
      "both",
    )
  }, [modal, t, track, teamID, teamMemberID, dispatch, message])

  useEffect(() => {
    if (!disabled) {
      track?.(
        ILLA_MIXPANEL_EVENT_TYPE.SHOW,
        {
          element: "more_by_member",
        },
        "both",
      )
    }
  }, [disabled, track])

  return disabled ? null : (
    <div css={moreActionWrapper}>
      <Dropdown
        position="bottom-end"
        trigger="click"
        onVisibleChange={(visible) => {
          if (visible) {
            if (
              currentUserRole === USER_ROLE.OWNER &&
              userStatus !== USER_STATUS.PENDING
            ) {
              track?.(
                ILLA_MIXPANEL_EVENT_TYPE.SHOW,
                {
                  element: "transfer",
                },
                "both",
              )
            }
            track?.(
              ILLA_MIXPANEL_EVENT_TYPE.SHOW,
              {
                element: "remove",
              },
              "both",
            )
          }
        }}
        dropList={
          <DropList>
            {userRole !== USER_ROLE.OWNER &&
              userStatus !== USER_STATUS.PENDING && (
                <AuthShown
                  currentUserRole={currentUserRole}
                  allowRoles={[USER_ROLE.OWNER]}
                  rules={SHOW_RULES.EQUAL}
                >
                  <DropListItem
                    key="trans"
                    value="trans"
                    onClick={() => {
                      track?.(
                        ILLA_MIXPANEL_EVENT_TYPE.CLICK,
                        {
                          element: "transfer",
                        },
                        "both",
                      )
                      handleClickTransOwner()
                    }}
                  >
                    {t("user_management.page.transfer")}
                  </DropListItem>
                </AuthShown>
              )}
            <AuthShown
              currentUserRole={currentUserRole}
              allowRoles={[userRole]}
              rules={SHOW_RULES.BIGGER}
            >
              <DropListItem
                key="remove"
                value="remove"
                onClick={() => {
                  track?.(
                    ILLA_MIXPANEL_EVENT_TYPE.CLICK,
                    {
                      element: "remove",
                    },
                    "both",
                  )
                  handleClickRemoveMember()
                }}
              >
                {t("user_management.page.remove")}
              </DropListItem>
            </AuthShown>
          </DropList>
        }
      >
        <Button
          variant="text"
          colorScheme="grayBlue"
          w="32px"
          disabled={disabled}
          leftIcon={<MoreIcon />}
        />
      </Dropdown>
    </div>
  )
}

MoreAction.displayName = "MemberListMoreAction"
