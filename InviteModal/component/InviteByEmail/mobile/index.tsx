import { Avatar } from "@illa-public/avatar"
import { ERROR_FLAG, isILLAAPiError } from "@illa-public/illa-net"
import { RoleSelector } from "@illa-public/role-selector"
import { useUpgradeModal } from "@illa-public/upgrade-modal"
import { USER_ROLE } from "@illa-public/user-data"
import { isBiggerThanTargetRole } from "@illa-public/user-role-utils"
import { FC, KeyboardEvent, useCallback, useState } from "react"
import { useTranslation } from "react-i18next"
import { Input, Loading, useMergeValue, useMessage } from "@illa-design/react"
import { EMAIL_FORMAT } from "../../../utils"
import { InviteByEmailProps, InvitedUser } from "../interface"
import { changeUserRoleByTeamMemberID, inviteByEmail } from "../service"
import {
  applyLicenseNumberStyle,
  avatarContainerStyle,
  emailInputStyle,
  inviteByEmailContainerStyle,
  inviteByEmailInputContainerStyle,
  inviteByEmailTitleStyle,
  inviteListContainerStyle,
  licenseContainerStyle,
  licenseLabelStyle,
  loadingStyle,
  nicknameStyle,
} from "./style"

export const InviteByEmailMobile: FC<InviteByEmailProps> = (props) => {
  const {
    defaultInviteUserRole,
    defaultBalance,
    teamID,
    currentUserRole,
    onBalanceChange,
  } = props

  const message = useMessage()
  const upgradeModal = useUpgradeModal()
  const { t } = useTranslation()

  const [inviteUserRole, setInviteUserRole] = useMergeValue(
    defaultInviteUserRole,
    {
      defaultValue: defaultInviteUserRole,
    },
  )

  const [currentBalance, setCurrentBalance] = useMergeValue(defaultBalance, {
    defaultValue: defaultBalance,
  })

  const [alreadyInvited, setAlreadyInvited] = useState<InvitedUser[]>([])

  const [inviting, setInviting] = useState(false)

  const [currentValue, setCurrentValue] = useState<string>()

  const handleValidateEmail = useCallback((value: string) => {
    if (value.length > 0 && EMAIL_FORMAT.test(value)) {
      return true
    } else {
      return false
    }
  }, [])

  const handleInvite = useCallback(
    async (e: KeyboardEvent<HTMLInputElement>) => {
      if (!currentValue) return
      e.currentTarget.blur()
      if (
        (isBiggerThanTargetRole(USER_ROLE.EDITOR, inviteUserRole) &&
          currentBalance === 0) ||
        currentBalance < 0
      ) {
        upgradeModal({
          modalType: "upgrade",
        })
        return
      }
      if (!handleValidateEmail(currentValue)) {
        return message.error({
          content: t("user_management.modal.email.not_mail"),
        })
      } else if (alreadyInvited.find((item) => item.email === currentValue)) {
        return message.error({
          content: t("user_management.modal.email.invited"),
        })
      }
      setInviting(true)
      const finalInviteUserList: InvitedUser[] = [...alreadyInvited]
      try {
        const invitedUserResp = await inviteByEmail(
          teamID,
          currentValue,
          inviteUserRole,
        )
        const currentIndex = finalInviteUserList.findIndex(
          (item) => item.email === currentValue,
        )
        const user = {
          email: currentValue,
          userRole: inviteUserRole,
          teamMemberID: invitedUserResp.data.teamMemberID,
        }
        if (currentIndex !== -1) {
          finalInviteUserList[currentIndex] = user
        } else {
          finalInviteUserList.push(user)
        }
        setCurrentValue("")
        message.success({ content: t("user_management.mes.invite_suc") })
      } catch (e) {
        if (isILLAAPiError(e)) {
          if (e.data.errorFlag === ERROR_FLAG.ERROR_FLAG_EMAIL_ALREADY_USED) {
            message.error({
              content: t("user_management.modal.email.invited"),
            })
          }
        } else {
          message.error({
            content: t("user_management.mes.invite_fail"),
          })
        }
      }
      if (isBiggerThanTargetRole(USER_ROLE.EDITOR, inviteUserRole)) {
        setCurrentBalance(currentBalance - 1)
        onBalanceChange(currentBalance - 1)
      }
      setAlreadyInvited(finalInviteUserList)
      setInviting(false)
    },
    [
      alreadyInvited,
      currentBalance,
      currentValue,
      handleValidateEmail,
      inviteUserRole,
      message,
      onBalanceChange,
      setCurrentBalance,
      t,
      teamID,
      upgradeModal,
    ],
  )

  return (
    <div css={inviteByEmailContainerStyle}>
      <span css={inviteByEmailTitleStyle}>
        {t("user_management.modal.email.invite_title")}
      </span>
      <div css={inviteByEmailInputContainerStyle}>
        <Input
          flexShrink="1"
          _css={emailInputStyle}
          readOnly={inviting}
          flexGrow="1"
          size="large"
          variant="fill"
          value={currentValue}
          onChange={(value) => {
            setCurrentValue(value)
          }}
          onPressEnter={handleInvite}
          w="unset"
          colorScheme="techPurple"
          placeholder={t("user_management.modal.email.placeholder")}
          suffix={
            <RoleSelector
              inline
              currentUserRole={currentUserRole}
              value={inviteUserRole}
              onClickItem={async (role) => {
                setInviteUserRole(role)
              }}
            />
          }
        />
      </div>
      <div css={licenseContainerStyle}>
        <div css={licenseLabelStyle}>
          {t("user_management.modal.tips.license_insufficient")}
        </div>
        <div
          css={applyLicenseNumberStyle(!!currentBalance && currentBalance > 0)}
        >
          {currentBalance ?? 0}
        </div>
      </div>
      {inviting ? (
        <div css={loadingStyle}>
          <Loading colorScheme="techPurple" />
        </div>
      ) : (
        <div css={inviteListContainerStyle}>
          {alreadyInvited.map((user) => {
            return (
              <div key={user.email} css={avatarContainerStyle}>
                <Avatar name={user.email} />
                <div css={nicknameStyle}>{user.email}</div>
                <RoleSelector
                  currentUserRole={currentUserRole}
                  value={user.userRole}
                  onClickItem={async (item) => {
                    setInviting(true)
                    try {
                      await changeUserRoleByTeamMemberID(
                        teamID,
                        user.teamMemberID,
                        item,
                      )
                      const index = alreadyInvited.findIndex(
                        (u) => u.email === user.email,
                      )
                      if (index != -1) {
                        const newAlreadyInvited = [...alreadyInvited]
                        newAlreadyInvited[index].userRole = item
                        setAlreadyInvited(newAlreadyInvited)
                      }
                    } catch (e) {
                      message.error({
                        content: "error",
                      })
                    } finally {
                      setInviting(false)
                    }
                  }}
                />
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

InviteByEmailMobile.displayName = "InviteByEmailMobile"
