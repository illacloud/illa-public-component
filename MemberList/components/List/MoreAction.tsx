import {
  Button,
  DropList,
  DropListItem,
  Dropdown,
  MoreIcon,
  useMessage,
  useModal,
} from "@illa-design/react"
import { FC, useCallback, useMemo } from "react"
import { useTranslation } from "react-i18next"
import { AuthShown } from "@/illa-public-component/AuthShown"
import { SHOW_RULES } from "@/illa-public-component/AuthShown/interface"
import { MoreActionProps } from "@/illa-public-component/MemberList/components/List/interface"
import { moreActionWrapper } from "@/illa-public-component/MemberList/components/List/style"
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
    })
  }, [message, modal, name, email, removeTeamMembers, t, teamMemberID])

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
        try {
          const result = await changeTeamMembersRole(
            teamMemberID,
            USER_ROLE.OWNER,
          )
          if (result) {
            message.success({
              content: t("user_management.mes.transfer_suc"),
            })
          } else {
            message.error({
              content: t("user_management.mes.transfer_fail"),
            })
          }
        } catch (e) {
          message.error({
            content: t("user_management.mes.transfer_fail"),
          })
          console.error(e)
        }
      },
    })
  }, [changeTeamMembersRole, teamMemberID, message, modal, t])

  return disabled ? null : (
    <div css={moreActionWrapper}>
      <Dropdown
        position="bottom-end"
        trigger="click"
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
                    onClick={handleClickTransOwner}
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
                onClick={handleClickRemoveMember}
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
