import { USER_ROLE } from "@illa-public/public-types"
import { RoleSelector } from "@illa-public/role-selector"
import { useUpgradeModal } from "@illa-public/upgrade-modal"
import {
  isBiggerThanTargetRole,
  isSmallThanTargetRole,
} from "@illa-public/user-role-utils"
import { isCloudVersion } from "@illa-public/utils"
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
    excludeUserRole,
    defaultAllowInviteLink,
    defaultInviteUserRole,
    onInviteLinkStateChange,
    teamID,
    currentUserRole,
    onCopyInviteLink,
    redirectURL,
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
          redirectURL,
          window.customDomain,
          controller.signal,
        )
        const inviteURL = new URL(data.data.inviteLink)
        if (!isCloudVersion) {
          inviteURL.host = window.location.host
        }
        setCurrentInviteLink(inviteURL.toString())
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
        message.error({
          content: t("user_management.modal.link.fail"),
        })
      } finally {
        setGetLinkLoading(false)
      }
      setInviteUserRole(userRole)
    },
    [message, redirectURL, setInviteUserRole, t],
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

  return isSmallThanTargetRole(USER_ROLE.ADMIN, currentUserRole, false) &&
    !allowInviteLink ? null : (
    <div css={inviteLinkContainer}>
      {(allowInviteLink ||
        (!allowInviteLink &&
          isBiggerThanTargetRole(USER_ROLE.ADMIN, currentUserRole))) && (
        <div css={inviteLinkMenuContainer}>
          <div css={inviteLinkLabelStyle}>
            {t("user_management.modal.link.invite_title")}
          </div>
          {allowInviteLink &&
            isBiggerThanTargetRole(USER_ROLE.ADMIN, currentUserRole) && (
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
      )}
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
                <Skeleton
                  text={{ rows: 1 }}
                  opac={0.5}
                  animation
                  flexGrow="1"
                />
              ) : (
                currentInviteLink
              )
            }
            suffix={
              <RoleSelector
                inline
                currentUserRole={currentUserRole}
                excludeUserRole={excludeUserRole}
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
            }
          />
          <Button
            ml="8px"
            w="80px"
            colorScheme={getColor("grayBlue", "02")}
            loading={getLinkLoading}
            onClick={() => {
              if (
                isBiggerThanTargetRole(
                  USER_ROLE.VIEWER,
                  inviteUserRole,
                  false,
                ) &&
                defaultBalance === 0
              ) {
                upgradeModal({
                  modalType: "upgrade",
                  from: "invite_by_link",
                })
                return
              }
              const newUrl = new URL(currentInviteLink)
              if (redirectURL !== "") {
                newUrl.searchParams.set("redirectURL", redirectURL)
              }
              onCopyInviteLink?.(newUrl.href)
            }}
          >
            {!getLinkLoading ? t("user_management.modal.link.copy") : undefined}
          </Button>
        </div>
      ) : (
        isBiggerThanTargetRole(USER_ROLE.ADMIN, currentUserRole) && (
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
        )
      )}
    </div>
  )
}

InviteLinkPC.displayName = "InviteLinkPC"
