import RoleSelect from "@illa-public/role-select"
import copy from "copy-to-clipboard"
import { FC, useCallback, useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { Button, Skeleton, useMessage } from "@illa-design/react"
import {
  applyHiddenStyle,
  fakerInputStyle,
  urlAreaStyle,
} from "@/illa-public-component/MemberList/components/Header/style"
import {
  REDIRECT_PAGE_TYPE,
  fetchInviteLinkResponse,
} from "@/illa-public-component/MemberList/interface"
import { USER_ROLE } from "@/illa-public-component/UserRoleUtils/interface"
import {
  labelStyle,
  linkWrapperStyle,
  mediaGroupStyle,
} from "@/illa-public-market-component/ShareToSocialMedia/pc/style"

export interface InviteByLinkProps {
  currentUserRole: USER_ROLE
  teamName: string
  userNickname: string
  fetchInviteLink: (
    userRole: USER_ROLE,
    redirectPage?: REDIRECT_PAGE_TYPE,
  ) => Promise<fetchInviteLinkResponse>
}

const defaultRole = USER_ROLE.VIEWER
const InviteByLink: FC<InviteByLinkProps> = (props) => {
  const message = useMessage()
  const { t } = useTranslation()
  const { teamName, userNickname, currentUserRole, fetchInviteLink } = props
  const [inviteLink, setInviteLink] = useState("")
  const [inviteLinkRole, setInviteLinkRole] = useState<USER_ROLE>(defaultRole)
  const [loading, setLoading] = useState(false)
  const [fetchInviteLinkError, setFetchInviteLinkError] = useState(false)

  const handleClickCopyInviteLink = useCallback(() => {
    const copyReturned = copy(
      t("user_management.modal.custom_copy_text_app_invite", {
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
  }, [inviteLink, teamName, userNickname, message, t])

  const fetchInviteLinkHandler = useCallback(
    async (userRole: USER_ROLE) => {
      setLoading(true)
      try {
        const linkConfig = await fetchInviteLink(userRole)
        const link = linkConfig.inviteLink
        setInviteLink(link)
        setInviteLinkRole(linkConfig.userRole)
        setFetchInviteLinkError(false)
      } catch (e) {
        setFetchInviteLinkError(true)
      }
      setLoading(false)
    },
    [fetchInviteLink],
  )

  const handleChangeInviteLinkRole = useCallback(
    async (value: any) => {
      setInviteLinkRole(value)
      await fetchInviteLinkHandler(value)
    },
    [fetchInviteLinkHandler],
  )

  useEffect(() => {
    fetchInviteLinkHandler(defaultRole)
  }, [fetchInviteLinkHandler])

  return (
    <div css={mediaGroupStyle}>
      <div css={labelStyle}>{t("Share with link")}</div>
      <div css={linkWrapperStyle}>
        <div css={fakerInputStyle}>
          <span css={urlAreaStyle(fetchInviteLinkError)}>
            {loading ? (
              <Skeleton text={{ rows: 1, width: 280 }} opac={0.5} animation />
            ) : fetchInviteLinkError ? (
              t("user_management.modal.link.fail")
            ) : (
              inviteLink
            )}
          </span>
          <RoleSelect
            value={inviteLinkRole}
            userRole={currentUserRole}
            filterRole={[USER_ROLE.OWNER, USER_ROLE.CUSTOM]}
            onChange={handleChangeInviteLinkRole}
          />
        </div>
        <Button
          w="100%"
          h="32px"
          ov="hidden"
          colorScheme="black"
          loading={loading}
          onClick={handleClickCopyInviteLink}
        >
          <span css={applyHiddenStyle(loading)}>
            {t("user_management.modal.link.copy")}
          </span>
        </Button>
      </div>
    </div>
  )
}

InviteByLink.displayName = "InviteByLink"

export default InviteByLink
