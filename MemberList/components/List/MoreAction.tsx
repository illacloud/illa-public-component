import {
  Button,
  DropList,
  DropListItem,
  Dropdown,
  MoreIcon,
  useMessage,
  useModal,
} from "@illa-design/react"
import { FC, useCallback, useContext, useEffect, useMemo } from "react"
import { useTranslation } from "react-i18next"
import { AuthShown } from "@/illa-public-component/AuthShown"
import { SHOW_RULES } from "@/illa-public-component/AuthShown/interface"
import { MoreActionProps } from "@/illa-public-component/MemberList/components/List/interface"
import { moreActionWrapper } from "@/illa-public-component/MemberList/components/List/style"
import { ILLA_MIXPANEL_EVENT_TYPE } from "@/illa-public-component/MixpanelUtils/interface"
import { MixpanelTrackContext } from "@/illa-public-component/MixpanelUtils/mixpanelContext"
import { isSmallThanTargetRole } from "@/illa-public-component/UserRoleUtils"
import {
  USER_ROLE,
  USER_STATUS,
} from "@/illa-public-component/UserRoleUtils/interface"

export const MoreAction: FC<MoreActionProps> = (props) => {
  const {
    currentUserRole,
    userRole,
    userStatus,
    userID,
    teamMemberID,
    currentUserID,
    removeTeamMembers,
    changeTeamMembersRole,
    name,
    email,
  } = props

  const { track } = useContext(MixpanelTrackContext)

  const modal = useModal()
  const message = useMessage()
  const { t } = useTranslation()

  const disabled = useMemo(() => {
    return (
      userID === currentUserID ||
      isSmallThanTargetRole(userRole, currentUserRole, false)
    )
  }, [userID, currentUserID, userRole, currentUserRole])

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
          const result = await removeTeamMembers(teamMemberID)
          if (result) {
            message.success({
              content: t("user_management.mes.remove_suc"),
            })
          } else {
            message.error({
              content: t("user_management.mes.remove_fail"),
            })
          }
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
  }, [modal, t, name, email, track, removeTeamMembers, teamMemberID, message])

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
        await changeTeamMembersRole(teamMemberID, USER_ROLE.OWNER)
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
  }, [modal, t, track, changeTeamMembersRole, teamMemberID])

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
        >
          <MoreIcon />
        </Button>
      </Dropdown>
    </div>
  )
}

MoreAction.displayName = "MemberListMoreAction"
