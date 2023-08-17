import { RoleSelector } from "@illa-public/roleselector"
import { USER_ROLE } from "@illa-public/user-data"
import copy from "copy-to-clipboard"
import { FC, useCallback, useContext, useEffect, useState } from "react"
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
import { InviteModalContext } from "../../../context"
import {
  disableInviteLink,
  enableInviteLink,
  getInviteLink,
  renewInviteLink,
} from "../../service"
import { InviteLinkProps } from "./interface"
import {
  closeInviteLinkContainerStyle,
  inviteLinkContainer,
  inviteLinkCopyContainer,
  inviteLinkLabelStyle,
  inviteLinkMenuButtonStyle,
  inviteLinkMenuContainer,
  secretLinkStyle,
} from "./style"

export const InviteLink: FC<InviteLinkProps> = (props) => {
  const {
    defaultAllowInviteLink,
    redirectPage,
    defaultInviteUserRole,
    onInviteLinkStateChange,
  } = props

  const { teamID, currentUserRole } = useContext(InviteModalContext)

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

  const { t } = useTranslation()
  const [currentInviteLink, setCurrentInviteLink] = useState("")
  const [getLinkLoading, setGetLinkLoading] = useState(false)

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
          redirectPage,
          controller.signal,
        )
        setCurrentInviteLink(data.data.inviteLink)
      } finally {
        setGetLinkLoading(false)
      }
    }
    getInviteLinkRequest()
    return () => {
      controller.abort()
    }
  }, [currentUserRole, redirectPage, teamID, allowInviteLink, inviteUserRole])

  const renewInviteLinkRequest = useCallback(
    async (teamID: string, userRole: USER_ROLE, redirectPage?: string) => {
      setGetLinkLoading(true)
      try {
        const data = await renewInviteLink(teamID, userRole, redirectPage)
        setCurrentInviteLink(data.data.inviteLink)
      } finally {
        setGetLinkLoading(false)
      }
      setInviteUserRole(userRole)
    },
    [setInviteUserRole],
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
        <div css={inviteLinkLabelStyle}>InviteLink</div>
        {allowInviteLink && (
          <Dropdown
            trigger="click"
            position="bottom-end"
            dropList={
              <DropList>
                <DropListItem
                  key="Reset invite links"
                  value="Reset invite links"
                  title="Reset invite links"
                  onClick={async () => {
                    await renewInviteLinkRequest(
                      teamID,
                      inviteUserRole,
                      redirectPage,
                    )
                  }}
                />
                <DropListItem
                  key="Turn off invite links"
                  value="Turn off invite links"
                  title="Turn off invite links"
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
                currentUserRole={currentUserRole}
                value={inviteUserRole}
                onClickItem={async (role) => {
                  await renewInviteLinkRequest(teamID, role, redirectPage)
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
              copy(currentInviteLink)
              message.success({
                content: t("copied"),
              })
            }}
          >
            {!getLinkLoading ? "Copy" : undefined}
          </Button>
        </div>
      ) : (
        <div css={closeInviteLinkContainerStyle}>
          <div css={secretLinkStyle}>
            Share a secret link people can use to join your team.
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
            Turn on invite links.
          </Button>
        </div>
      )}
    </div>
  )
}

InviteLink.displayName = "InviteLink"