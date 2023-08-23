import { RoleSelector } from "@illa-public/role-selector"
import { useUpgradeModal } from "@illa-public/upgrade-modal"
import { USER_ROLE } from "@illa-public/user-data"
import { isBiggerThanTargetRole } from "@illa-public/user-role-utils"
import { FC, useCallback, useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import {
  Button,
  DropList,
  DropListItem,
  Dropdown,
  Input,
  Skeleton,
  SortIcon,
  getColor,
  useMergeValue,
  useMessage,
} from "@illa-design/react"
import { InviteLinkProps } from "../interface"
import {
  disableInviteLink,
  enableInviteLink,
  getInviteLink,
  renewInviteLink,
} from "../service"
import {
  closeInviteLinkContainerStyle,
  inviteLinkContainer,
  inviteLinkCopyContainer,
  inviteLinkLabelStyle,
  inviteLinkMenuButtonStyle,
  inviteLinkMenuContainer,
  secretLinkStyle,
} from "./style"

export const InviteLinkPC: FC<InviteLinkProps> = (props) => {
  const {
    defaultAllowInviteLink,
    defaultInviteUserRole,
    onInviteLinkStateChange,
    teamID,
    currentUserRole,
    onCopyInviteLink,
    redirectUrl,
    defaultBalance,
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
  const [currentInviteLink, setCurrentInviteLink] = useState<string>("")
  const [getLinkLoading, setGetLinkLoading] = useState(false)

  // initial invite link
  useEffect(() => {
    if (!allowInviteLink) {
      return
    }
    let controller = new AbortController()
    const getInviteLinkRequest = async () => {
      setGetLinkLoading(true)
      try {
        const data = await getInviteLink(
          teamID,
          inviteUserRole,
          controller.signal,
        )
        setCurrentInviteLink(data.data.inviteLink)
      } catch (e) {
        message.error({
          content: t("user_management.modal.link.fail"),
        })
      } finally {
        setGetLinkLoading(false)
      }
    }
    getInviteLinkRequest()
    return () => {
      controller.abort()
    }
  }, [currentUserRole, teamID, allowInviteLink, inviteUserRole, message, t])

  const renewInviteLinkRequest = useCallback(
    async (teamID: string, userRole: USER_ROLE) => {
      setGetLinkLoading(true)
      try {
        const data = await renewInviteLink(teamID, userRole)
        setCurrentInviteLink(data.data.inviteLink)
      } catch (e) {
        message.error({
          content: t("user_management.modal.link.fail"),
        })
      } finally {
        setGetLinkLoading(false)
      }
      setInviteUserRole(userRole)
    },
    [message, setInviteUserRole, t],
  )

  const enableInviteLinkRequest = useCallback(
    async (teamID: string) => {
      setGetLinkLoading(true)
      try {
        await enableInviteLink(teamID)
        setAllowInviteLink(true)
        onInviteLinkStateChange?.(true)
      } catch (e) {
        message.error({
          content: t("user_management.modal.link.turn_on_fail"),
        })
      } finally {
        setGetLinkLoading(false)
      }
    },
    [message, onInviteLinkStateChange, setAllowInviteLink, t],
  )

  const disableInviteLinkRequest = useCallback(
    async (teamID: string) => {
      setGetLinkLoading(true)
      try {
        await disableInviteLink(teamID)
        setAllowInviteLink(false)
        onInviteLinkStateChange?.(false)
      } catch (error) {
        message.error({
          content: t("user_management.modal.link.turn_off_fail"),
        })
      } finally {
        setGetLinkLoading(false)
      }
    },
    [message, onInviteLinkStateChange, setAllowInviteLink, t],
  )

  return (
    <div css={inviteLinkContainer}>
      <div css={inviteLinkMenuContainer}>
        <div css={inviteLinkLabelStyle}>
          {t("user_management.modal.link.invite_title")}
        </div>
        {allowInviteLink && (
          <Dropdown
            trigger="click"
            position="bottom-end"
            dropList={
              <DropList>
                <DropListItem
                  key={t("user_management.modal.link.update")}
                  value={t("user_management.modal.link.update")}
                  title={t("user_management.modal.link.update")}
                  onClick={async () => {
                    await renewInviteLinkRequest(teamID, inviteUserRole)
                  }}
                />
                <DropListItem
                  key={t("user_management.modal.link.turn_off")}
                  value={t("user_management.modal.link.turn_off")}
                  title={t("user_management.modal.link.turn_off")}
                  onClick={async () => {
                    await disableInviteLinkRequest(teamID)
                  }}
                />
              </DropList>
            }
          >
            <div css={inviteLinkMenuButtonStyle}>
              <SortIcon />
            </div>
          </Dropdown>
        )}
      </div>
      {allowInviteLink ? (
        <div css={inviteLinkCopyContainer}>
          <Input
            flexShrink="1"
            flexGrow="1"
            w="unset"
            readOnly
            colorScheme="techPurple"
            value={
              getLinkLoading ? (
                <Skeleton text={{ rows: 1, width: 280 }} opac={0.5} animation />
              ) : (
                currentInviteLink
              )
            }
            suffix={
              <RoleSelector
                inline
                currentUserRole={currentUserRole}
                value={inviteUserRole}
                onClickItem={async (role) => {
                  if (
                    isBiggerThanTargetRole(role, USER_ROLE.VIEWER, false) &&
                    defaultBalance === 0
                  ) {
                    upgradeModal({
                      modalType: "upgrade",
                    })
                  } else {
                    await renewInviteLinkRequest(teamID, role)
                  }
                }}
              />
            }
          />
          <Button
            ml="8px"
            w="80px"
            colorScheme={getColor("grayBlue", "02")}
            loading={getLinkLoading}
            onClick={() => {
              const newUrl = new URL(currentInviteLink)
              newUrl.searchParams.set("redirectUrl", redirectUrl)
              onCopyInviteLink?.(newUrl.href)
            }}
          >
            {!getLinkLoading ? t("user_management.modal.link.copy") : undefined}
          </Button>
        </div>
      ) : (
        <div css={closeInviteLinkContainerStyle}>
          <div css={secretLinkStyle}>
            {t("user_management.modal.link.description")}
          </div>
          <Button
            variant="text"
            size="small"
            loading={getLinkLoading}
            colorScheme="techPurple"
            onClick={async () => {
              await enableInviteLinkRequest(teamID)
            }}
          >
            {t("user_management.modal.link.turn_on")}
          </Button>
        </div>
      )}
    </div>
  )
}

InviteLinkPC.displayName = "InviteLinkPC"