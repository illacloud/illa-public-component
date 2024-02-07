import { USER_ROLE } from "@illa-public/public-types"
import { RoleSelector } from "@illa-public/role-selector"
import { useUpgradeModal } from "@illa-public/upgrade-modal"
import { isBiggerThanTargetRole } from "@illa-public/user-role-utils"
import { FC, useCallback, useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { Button, useMergeValue, useMessage } from "@illa-design/react"
import DisableInviteIcon from "../../../asset/DisableInviteLink.svg?react"
import InviteIcon from "../../../asset/InviteLink.svg?react"
import { InviteLinkProps } from "../interface"
import {
  disableInviteLink,
  enableInviteLink,
  getInviteLink,
  renewInviteLink,
} from "../service"
import {
  disInviteLinkContainer,
  inviteButtonStyle,
  inviteLinkContainer,
  inviteLinkHeaderStyle,
  inviteOptionsStyle,
  roleSelectorStyle,
} from "./style"

export const InviteLinkMobile: FC<InviteLinkProps> = (props) => {
  const {
    excludeUserRole,
    defaultAllowInviteLink,
    defaultInviteUserRole,
    onInviteLinkStateChange,
    teamID,
    currentUserRole,
    onCopyInviteLink,
    defaultBalance,
    redirectURL,
  } = props

  const [inviteUserRole, setInviteUserRole] = useMergeValue(
    defaultInviteUserRole,
    {
      defaultValue: defaultInviteUserRole,
    },
  )

  const [allowInviteLink, setAllowInviteLink] = useMergeValue(
    defaultAllowInviteLink,
    {
      defaultValue: defaultAllowInviteLink,
    },
  )

  const message = useMessage()

  const upgradeModal = useUpgradeModal()

  const { t } = useTranslation()
  const [currentInviteLink, setCurrentInviteLink] = useState("")
  const [getLinkLoading, setGetLinkLoading] = useState(false)
  const [enableInviteLoading, setEnableInviteLoading] = useState(false)

  // initial invite link
  useEffect(() => {
    if (!allowInviteLink) {
      return
    }
    setGetLinkLoading(true)
    let controller = new AbortController()
    const getInviteLinkRequest = async () => {
      try {
        const data = await getInviteLink(
          teamID,
          inviteUserRole,
          redirectURL,
          window.customDomain,
          controller.signal,
        )
        setCurrentInviteLink(data.data.inviteLink)
      } catch (e) {
        message.error({ content: t("user_management.modal.link.fail") })
      } finally {
        setGetLinkLoading(false)
      }
    }
    getInviteLinkRequest()
    return () => {
      controller.abort()
    }
  }, [
    currentUserRole,
    teamID,
    allowInviteLink,
    inviteUserRole,
    message,
    t,
    redirectURL,
  ])

  const renewInviteLinkRequest = useCallback(
    async (teamID: string, userRole: USER_ROLE) => {
      setGetLinkLoading(true)
      try {
        const data = await renewInviteLink(
          teamID,
          redirectURL,
          userRole,
          window.customDomain,
        )
        setCurrentInviteLink(data.data.inviteLink)
      } catch (e) {
        message.error({ content: t("user_management.modal.link.fail") })
      } finally {
        setGetLinkLoading(false)
      }
      setInviteUserRole(userRole)
    },
    [message, redirectURL, setInviteUserRole, t],
  )

  const enableInviteLinkRequest = useCallback(
    async (teamID: string) => {
      setEnableInviteLoading(true)
      try {
        await enableInviteLink(teamID)
        setAllowInviteLink(true)
        onInviteLinkStateChange?.(true)
      } catch (e) {
        message.error({
          content: t("user_management.modal.link.turn_on_fail"),
        })
      } finally {
        setEnableInviteLoading(false)
      }
    },
    [message, onInviteLinkStateChange, setAllowInviteLink, t],
  )

  const disableInviteLinkRequest = useCallback(
    async (teamID: string) => {
      setEnableInviteLoading(true)
      try {
        await disableInviteLink(teamID)
        setAllowInviteLink(false)
        onInviteLinkStateChange?.(false)
      } catch (error) {
        message.error({
          content: t("user_management.modal.link.turn_off_fail"),
        })
      } finally {
        setEnableInviteLoading(false)
      }
    },
    [message, onInviteLinkStateChange, setAllowInviteLink, t],
  )

  return (
    <>
      {allowInviteLink ? (
        <div css={inviteLinkContainer}>
          <div css={inviteLinkHeaderStyle}>
            <InviteIcon />
            <div css={roleSelectorStyle}>
              <RoleSelector
                withoutTips
                excludeUserRole={excludeUserRole}
                currentUserRole={currentUserRole}
                value={inviteUserRole}
                onClickItem={async (role) => {
                  if (
                    isBiggerThanTargetRole(USER_ROLE.VIEWER, role, false) &&
                    defaultBalance === 0
                  ) {
                    upgradeModal({
                      modalType: "upgrade",
                      from: "invite_by_link",
                    })
                  } else {
                    await renewInviteLinkRequest(teamID, role)
                  }
                }}
              />
            </div>
          </div>
          <div css={inviteOptionsStyle}>
            <Button
              _css={inviteButtonStyle}
              colorScheme="techPurple"
              fullWidth
              loading={getLinkLoading}
              disabled={enableInviteLoading}
              onClick={() => {
                const newUrl = new URL(currentInviteLink)
                newUrl.searchParams.set("redirectURL", redirectURL)
                onCopyInviteLink?.(newUrl.href)
              }}
            >
              {t("user_management.modal.link.copy")}
            </Button>
            <Button
              _css={inviteButtonStyle}
              colorScheme="grayBlue"
              variant="text"
              fullWidth
              loading={enableInviteLoading}
              disabled={getLinkLoading}
              onClick={() => {
                disableInviteLinkRequest(teamID)
              }}
            >
              {t("user_management.modal.link.turn_off")}
            </Button>
          </div>
        </div>
      ) : (
        <div css={disInviteLinkContainer}>
          <DisableInviteIcon />
          <Button
            _css={inviteButtonStyle}
            colorScheme="techPurple"
            fullWidth
            loading={enableInviteLoading}
            disabled={getLinkLoading}
            onClick={() => {
              enableInviteLinkRequest(teamID)
            }}
          >
            {t("user_management.modal.link.turn_on")}
          </Button>
        </div>
      )}
    </>
  )
}

InviteLinkMobile.displayName = "InviteLinkMobile"
