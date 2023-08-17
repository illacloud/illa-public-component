import copy from "copy-to-clipboard"
import { FC, useCallback, useContext, useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { Button, Loading, useMessage } from "@illa-design/react"
import { AuthShown } from "@/illa-public-component/AuthShown"
import { SHOW_RULES } from "@/illa-public-component/AuthShown/interface"
import { ILLA_MIXPANEL_EVENT_TYPE } from "@/illa-public-component/MixpanelUtils/interface"
import { MixpanelTrackContext } from "@/illa-public-component/MixpanelUtils/mixpanelContext"
import { InviteByLinkProps } from "@/illa-public-component/MobileMember/InviteModalMobile/interface"
import {
  applyLinkStyle,
  inviteByLinkStyle,
  inviteOffWrapperStyle,
  inviteWrapperStyle,
  linkIconStyle,
  linkLinkButtonStyle,
  roleSelectStyle,
  turnOffLinkStyle,
  turnOnLinkButtonStyle,
} from "@/illa-public-component/MobileMember/InviteModalMobile/style"
import UserRoleSelect from "@/illa-public-component/MobileMember/UserRoleSelect"
import { USER_ROLE } from "@/illa-public-component/UserRoleUtils/interface"
import { ReactComponent as LinkOffIcon } from "./assets/link-off.svg"
import { ReactComponent as LinkIcon } from "./assets/link.svg"

const InviteByLink: FC<InviteByLinkProps> = (props) => {
  const {
    currentUserRole,
    inviteLinkEnabled,
    fetchInviteLink,
    configInviteLink,
    teamName,
    userNickname,
  } = props
  const { t } = useTranslation()
  const message = useMessage()
  const [inviteLink, setInviteLink] = useState("")
  const [inviteRole, setInviteRole] = useState<USER_ROLE>(USER_ROLE.VIEWER)
  const [fetchInviteLinkError, setFetchInviteLinkError] = useState(false)
  const [loading, setLoading] = useState(false)
  const [turnOnLoading, setTurnOnLoading] = useState(false)
  const [turnOffLoading, setTurnOffLoading] = useState(false)
  const { track } = useContext(MixpanelTrackContext)

  const fetchInviteLinkHandler = useCallback(
    async (userRole: USER_ROLE) => {
      setInviteRole(userRole)
      setLoading(true)
      try {
        const linkConfig = await fetchInviteLink(userRole)
        if (
          linkConfig &&
          linkConfig.inviteLink &&
          linkConfig.userRole != undefined
        ) {
          setInviteLink(linkConfig.inviteLink)
          setFetchInviteLinkError(false)
        } else {
          setFetchInviteLinkError(true)
        }
      } catch (e) {
        setFetchInviteLinkError(true)
      }
      setLoading(false)
    },
    [fetchInviteLink],
  )

  useEffect(() => {
    if (inviteLinkEnabled) {
      fetchInviteLinkHandler(inviteRole)
    }
  }, [fetchInviteLinkHandler, inviteLinkEnabled, inviteRole])

  useEffect(() => {
    !inviteLinkEnabled &&
      track?.(
        ILLA_MIXPANEL_EVENT_TYPE.SHOW,
        {
          element: "invite_link_on",
        },
        "both",
      )
  }, [inviteLinkEnabled, track])

  useEffect(() => {
    inviteLink &&
      track?.(
        ILLA_MIXPANEL_EVENT_TYPE.SHOW,
        {
          element: "invite_link",
          parameter1: inviteRole,
        },
        "both",
      )
  }, [inviteRole, inviteLink, track])

  const handleClickCopyInviteLink = () => {
    track?.(
      ILLA_MIXPANEL_EVENT_TYPE.CLICK,
      {
        element: "invite_link_copy",
        parameter1: inviteRole,
      },
      "both",
    )
    const copyReturned = copy(
      t("user_management.modal.custom_copy_text", {
        userName: userNickname,
        teamName: teamName,
        inviteLink: inviteLink,
      }),
    )
    if (copyReturned) {
      message.success({
        content: t("user_management.modal.link.copied_suc"),
      })
    } else {
      message.error({
        content: t("user_management.modal.link.failed_to_copy"),
      })
    }
  }

  const handleClickTurnOffInviteLink = () => {
    if (turnOffLoading) return
    setTurnOffLoading(true)
    configInviteLink(false)
      .catch(() => {
        message.error({
          content: t("user_management.modal.link.turn_off_fail"),
        })
      })
      .finally(() => {
        setTurnOffLoading(false)
      })
  }

  const handleClickTurnOnInviteLink = () => {
    track?.(
      ILLA_MIXPANEL_EVENT_TYPE.CLICK,
      {
        element: "invite_link_on",
        parameter1: inviteRole,
      },
      "both",
    )
    setTurnOnLoading(true)
    configInviteLink(true)
      .catch(() => {
        message.error({
          content: t("user_management.modal.link.turn_on_fail"),
        })
      })
      .finally(() => {
        setTurnOnLoading(false)
      })
  }

  return (
    <div css={inviteByLinkStyle}>
      {inviteLinkEnabled ? (
        <div css={inviteWrapperStyle}>
          <LinkIcon css={linkIconStyle} />
          <UserRoleSelect
            css={roleSelectStyle}
            value={inviteRole}
            userRole={currentUserRole}
            onChange={fetchInviteLinkHandler}
          />
          <div css={applyLinkStyle(fetchInviteLinkError)}>
            {loading || turnOffLoading ? (
              <Loading colorScheme="techPurple" />
            ) : fetchInviteLinkError ? (
              t("user_management.modal.link.fail")
            ) : (
              inviteLink
            )}
          </div>
          <Button
            _css={linkLinkButtonStyle}
            fullWidth
            colorScheme="techPurple"
            loading={loading}
            onClick={handleClickCopyInviteLink}
          >
            {t("user_management.modal.link.copy")}
          </Button>
          <AuthShown
            currentUserRole={currentUserRole}
            allowRoles={[USER_ROLE.OWNER, USER_ROLE.ADMIN]}
            rules={SHOW_RULES.EQUAL}
          >
            <div css={turnOffLinkStyle} onClick={handleClickTurnOffInviteLink}>
              {t("user_management.modal.link.turn_off")}
            </div>
          </AuthShown>
        </div>
      ) : (
        <div css={inviteOffWrapperStyle}>
          <LinkOffIcon css={linkIconStyle} />
          <Button
            _css={turnOnLinkButtonStyle}
            fullWidth
            colorScheme="techPurple"
            loading={turnOnLoading}
            onClick={handleClickTurnOnInviteLink}
          >
            {t("user_management.modal.link.turn_on")}
          </Button>
        </div>
      )}
    </div>
  )
}

InviteByLink.displayName = "InviteByLink"

export default InviteByLink
