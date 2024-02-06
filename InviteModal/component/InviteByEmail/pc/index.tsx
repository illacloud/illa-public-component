import { Avatar } from "@illa-public/avatar"
import { ERROR_FLAG, isILLAAPiError } from "@illa-public/illa-net"
import {
  ILLA_MIXPANEL_EVENT_TYPE,
  MixpanelTrackContext,
} from "@illa-public/mixpanel-utils"
import { USER_ROLE } from "@illa-public/public-types"
import { RoleSelector } from "@illa-public/role-selector"
import { useUpgradeModal } from "@illa-public/upgrade-modal"
import { isBiggerThanTargetRole } from "@illa-public/user-role-utils"
import { EMAIL_FORMAT, isCloudVersion } from "@illa-public/utils"
import { FC, useContext, useState } from "react"
import { useTranslation } from "react-i18next"
import {
  Button,
  InputTag,
  getColor,
  useMergeValue,
  useMessage,
} from "@illa-design/react"
import { InviteByEmailProps, InvitedUser } from "../interface"
import { changeUserRoleByTeamMemberID, inviteByEmail } from "../service"
import {
  applyLicenseNumberStyle,
  avatarContainerStyle,
  inviteByEmailContainerStyle,
  inviteByEmailInputContainerStyle,
  inviteByEmailLabelStyle,
  inviteListContainerStyle,
  licenseContainerStyle,
  licenseLabelStyle,
  nicknameStyle,
  roleSelectContainerStyle,
} from "./style"

export const InviteByEmailPC: FC<InviteByEmailProps> = (props) => {
  const {
    excludeUserRole,
    defaultInviteUserRole,
    defaultBalance,
    teamID,
    onBalanceChange,
    redirectURL,
    currentUserRole,
    onInvitedChange,
    itemID,
  } = props

  const message = useMessage()

  const { t } = useTranslation()

  const upgradeModal = useUpgradeModal()
  const { track } = useContext(MixpanelTrackContext)

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

  const [currentValue, setCurrentValue] = useState<string[]>([])

  return (
    <div css={inviteByEmailContainerStyle}>
      <div css={inviteByEmailLabelStyle}>
        {t("user_management.modal.email.invite_title")}
      </div>
      <div css={inviteByEmailInputContainerStyle}>
        <InputTag
          saveOnBlur
          flexShrink="1"
          readOnly={inviting}
          flexGrow="1"
          value={currentValue}
          onChange={(value) => {
            setCurrentValue(value as string[])
          }}
          w="unset"
          colorScheme="techPurple"
          validate={(value) => {
            if (value.length === 0) {
              return true
            }
            const suc = value.length > 0 && EMAIL_FORMAT.test(value)
            if (!suc) {
              message.error({
                content: t("user_management.modal.email.not_mail"),
              })
            }
            return suc
          }}
          suffix={
            <div css={roleSelectContainerStyle}>
              <RoleSelector
                inline
                currentUserRole={currentUserRole}
                excludeUserRole={excludeUserRole}
                value={inviteUserRole}
                onClickItem={async (role) => {
                  setInviteUserRole(role)
                }}
              />
            </div>
          }
        />
        <Button
          ml="8px"
          w="80px"
          h="32px"
          flexShrink="0"
          disabled={currentValue.length === 0}
          colorScheme={getColor("grayBlue", "02")}
          loading={inviting}
          onClick={async () => {
            track?.(ILLA_MIXPANEL_EVENT_TYPE.CLICK, {
              element: "share_modal_send",
              parameter5: itemID,
            })
            if (
              isBiggerThanTargetRole(USER_ROLE.EDITOR, inviteUserRole) &&
              currentBalance < currentValue.length
            ) {
              upgradeModal({
                modalType: "add-license",
                from: "invite_by_email",
              })
              return
            }
            setInviting(true)
            const finalInviteUserList: InvitedUser[] = [...alreadyInvited]
            for (let i = 0; i < currentValue.length; i++) {
              try {
                const invitedUserResp = await inviteByEmail(
                  teamID,
                  currentValue[i],
                  inviteUserRole,
                  redirectURL,
                  window.customDomain,
                )
                const currentIndex = finalInviteUserList.findIndex(
                  (item) => item.email === currentValue[i],
                )
                const user = {
                  email: currentValue[i],
                  userRole: inviteUserRole,
                  teamMemberID: invitedUserResp.data.teamMemberID,
                }
                if (currentIndex !== -1) {
                  finalInviteUserList[currentIndex] = user
                } else {
                  finalInviteUserList.push(user)
                }
                setCurrentValue([])
              } catch (e) {
                if (isILLAAPiError(e)) {
                  if (
                    e.data.errorFlag ===
                    ERROR_FLAG.ERROR_FLAG_EMAIL_ALREADY_USED
                  ) {
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
            }
            if (isBiggerThanTargetRole(USER_ROLE.EDITOR, inviteUserRole)) {
              setCurrentBalance(currentBalance - currentValue.length)
              onBalanceChange(currentBalance - currentValue.length)
            }
            onInvitedChange(finalInviteUserList)
            setAlreadyInvited(finalInviteUserList)
            setInviting(false)
          }}
        >
          {!inviting ? t("user_management.modal.email.invite") : undefined}
        </Button>
      </div>
      {isCloudVersion && (
        <div css={licenseContainerStyle}>
          <div css={licenseLabelStyle}>
            {t("user_management.modal.tips.license_insufficient")}
          </div>
          <div css={applyLicenseNumberStyle(currentBalance > 0)}>
            {currentBalance}
          </div>
        </div>
      )}
      {alreadyInvited.length > 0 && (
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
                        onInvitedChange?.(newAlreadyInvited)
                      }
                      message.success({
                        content: t("user_management.mes.invite_suc"),
                      })
                    } catch (e) {
                      message.error({
                        content: t("user_management.mes.change_role_fail"),
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

InviteByEmailPC.displayName = "InviteByEmailPC"
