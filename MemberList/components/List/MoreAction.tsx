import {
  Button,
  DropList,
  Dropdown,
  MoreIcon,
  useMessage,
  useModal,
} from "@illa-design/react"
import { FC, useCallback } from "react"
import { useTranslation } from "react-i18next"
import { AuthShown } from "@/illa-public-component/AuthShown"
import { SHOW_RULES } from "@/illa-public-component/AuthShown/interface"
import { MoreActionProps } from "@/illa-public-component/MemberList/components/List/interface"
import { moreActionWrapper } from "@/illa-public-component/MemberList/components/List/style"
import { isSmallThanTargetRole } from "@/illa-public-component/UserRoleUtils"
import { USER_ROLE } from "@/illa-public-component/UserRoleUtils/interface"

export const MoreAction: FC<MoreActionProps> = (props) => {
  const {
    currentUserRole,
    userRole,
    userID,
    currentUserID,
    removeTeamMembers,
    changeTeamMembersRole,
    name,
  } = props

  const modal = useModal()
  const message = useMessage()
  const { t } = useTranslation()

  const handleClickRemoveMember = useCallback(() => {
    modal.show({
      id: "removeMember",
      title: t("user_management.remove_modal.title", { username: name }),
      children: t("user_management.remove_modal.description"),
      okText: t("user_management.remove_modal.remove"),
      cancelText: t("user_management.remove_modal.cancel"),
      okButtonProps: {
        colorScheme: "red",
      },
      onOk: async () => {
        try {
          const result = await removeTeamMembers(userID)
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
  }, [message, modal, name, removeTeamMembers, t, userID])

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
          const result = await changeTeamMembersRole(userID, USER_ROLE.OWNER)
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
  }, [changeTeamMembersRole, currentUserID, message, modal, t])

  return (
    <div css={moreActionWrapper}>
      <Dropdown
        position="bottom"
        trigger="click"
        dropList={
          <DropList>
            {userRole !== USER_ROLE.OWNER && (
              <AuthShown
                currentUserRole={currentUserRole}
                allowRoles={[USER_ROLE.OWNER]}
                rules={SHOW_RULES.EQUAL}
              >
                <DropList.Item key="trans" onClick={handleClickTransOwner}>
                  {t("user_management.page.transfer")}
                </DropList.Item>
              </AuthShown>
            )}
            <AuthShown
              currentUserRole={currentUserRole}
              allowRoles={[userRole]}
              rules={SHOW_RULES.BIGGER}
            >
              <DropList.Item key="remove" onClick={handleClickRemoveMember}>
                {t("user_management.page.remove")}
              </DropList.Item>
            </AuthShown>
          </DropList>
        }
      >
        <Button
          colorScheme="grayBlue"
          w="32px"
          disabled={isSmallThanTargetRole(userRole, currentUserRole, false)}
        >
          <MoreIcon />
        </Button>
      </Dropdown>
    </div>
  )
}

MoreAction.displayName = "MemberListMoreAction"
