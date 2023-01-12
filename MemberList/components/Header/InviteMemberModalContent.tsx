import {
  Avatar,
  Button,
  CloseIcon,
  Divider,
  DropList,
  Dropdown,
  InputTag,
  Skeleton,
  useMessage,
} from "@illa-design/react"
import copy from "copy-to-clipboard"
import { FC, MouseEvent, useCallback, useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { AuthShown } from "@/illa-public-component/AuthShown"
import { SHOW_RULES } from "@/illa-public-component/AuthShown/interface"
import { ReactComponent as SettingIcon } from "@/illa-public-component/MemberList/assets/icon/setting.svg"
import {
  InviteListItemProps,
  InviteListProps,
  InviteMemberByEmailProps,
  InviteMemberByLinkProps,
  InviteMemberModalContentProps,
  InviteMemberModalProps,
} from "@/illa-public-component/MemberList/components/Header/interface"
import {
  avatarAndNameWrapperStyle,
  closeIconHotSpotStyle,
  emailInputStyle,
  fakerInputStyle,
  inviteAvatarStyle,
  inviteEmailWrapperStyle,
  inviteLinkWhenClosedStyle,
  inviteLinkWrapperStyle,
  inviteListTitleWrapperStyle,
  inviteListWrapperStyle,
  maskStyle,
  modalBodyWrapperStyle,
  modalHeaderWrapperStyle,
  modalTitleStyle,
  modalWithMaskWrapperStyle,
  modalWrapperStyle,
  nicknameStyle,
  settingIconStyle,
  subBodyTitleWrapperStyle,
  subBodyWrapperStyle,
  subtitleStyle,
  turnOnInviteLinkButtonStyle,
  urlAreaStyle,
} from "@/illa-public-component/MemberList/components/Header/style"
import { inviteByEmailResponse } from "@/illa-public-component/MemberList/interface"
import RoleSelect from "@/illa-public-component/RoleSelect"
import { USER_ROLE } from "@/illa-public-component/UserRoleUtils/interface"

const DropListItem = DropList.Item

const EMAIL_REGX =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

export const InviteListItem: FC<InviteListItemProps> = (props) => {
  const { email, userRole, userAvatar, currentUserRole, inviteByEmail } = props
  const { t } = useTranslation()
  const handleChangeRole = useCallback(
    async (value: USER_ROLE) => {
      try {
        const res = await inviteByEmail(email, value)
        if (!res) {
        }
      } catch (e) {
        console.error(e)
      }
    },
    [email, inviteByEmail],
  )

  return (
    <div css={inviteListTitleWrapperStyle}>
      <div css={avatarAndNameWrapperStyle}>
        {userAvatar ? (
          <Avatar src={userAvatar} />
        ) : (
          <div css={inviteAvatarStyle} />
        )}
        <span css={nicknameStyle}>{email}</span>
      </div>
      <RoleSelect
        value={userRole}
        userRole={currentUserRole}
        onChange={handleChangeRole}
      />
    </div>
  )
}

export const InviteList: FC<InviteListProps> = (props) => {
  const { inviteList, currentUserRole, inviteByEmail } = props
  return (
    <div css={inviteListWrapperStyle}>
      {inviteList?.map((item) => (
        <InviteListItem
          key={item.email}
          email={item.email}
          emailStatus={item.emailStatus}
          userAvatar={item.userAvatar}
          userRole={item.userRole}
          currentUserRole={currentUserRole}
          inviteByEmail={inviteByEmail}
        />
      ))}
    </div>
  )
}

export const InviteMemberModal: FC<InviteMemberModalProps> = (props) => {
  const {
    userListData,
    currentUserRole,
    allowInviteByLink,
    handleCloseModal,
    changeTeamMembersRole,
    inviteByEmail,
    renewInviteLink,
    fetchInviteLink,
    configInviteLink,
    maskClosable,
  } = props
  const { t } = useTranslation()
  const handleClickMask = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      e.stopPropagation()
      maskClosable && handleCloseModal()
    },
    [maskClosable, handleCloseModal],
  )
  return (
    <div css={modalWithMaskWrapperStyle}>
      <div css={modalWrapperStyle}>
        <header css={modalHeaderWrapperStyle}>
          <h3 css={modalTitleStyle}>
            {t("user_management.modal.title.invite_members")}
          </h3>
          <span css={closeIconHotSpotStyle} onClick={handleCloseModal}>
            <CloseIcon />
          </span>
        </header>
        <Divider />
        <InviteMemberModalContent
          userListData={userListData}
          currentUserRole={currentUserRole}
          allowInviteByLink={allowInviteByLink}
          inviteByEmail={inviteByEmail}
          renewInviteLink={renewInviteLink}
          fetchInviteLink={fetchInviteLink}
          configInviteLink={configInviteLink}
        />
      </div>
      <div css={maskStyle} onClick={handleClickMask} />
    </div>
  )
}

export const InviteMemberByLink: FC<InviteMemberByLinkProps> = (props) => {
  const {
    currentUserRole,
    allowInviteByLink,
    renewInviteLink,
    fetchInviteLink,
    configInviteLink,
  } = props
  const { t } = useTranslation()
  const message = useMessage()

  const [inviteLink, setInviteLink] = useState("")
  const [inviteLinkRole, setInviteLinkRole] = useState<USER_ROLE>(
    USER_ROLE.VIEWER,
  )

  const [fetchInviteLinkError, setFetchInviteLinkError] = useState(false)

  const fetchInviteLinkHandler = useCallback(
    async (userRole: USER_ROLE, isRenew: boolean = false) => {
      try {
        const linkConfig = isRenew
          ? await renewInviteLink(userRole)
          : await fetchInviteLink(userRole)
        if (
          linkConfig &&
          linkConfig.inviteLink &&
          linkConfig.userRole != undefined
        ) {
          setInviteLink(linkConfig.inviteLink)
          setInviteLinkRole(linkConfig.userRole)
          setFetchInviteLinkError(false)
        } else {
          setFetchInviteLinkError(true)
        }
      } catch (e) {
        setFetchInviteLinkError(true)
      }
    },
    [fetchInviteLink, renewInviteLink],
  )

  useEffect(() => {
    if (allowInviteByLink) {
      fetchInviteLinkHandler(USER_ROLE.VIEWER)
    }
  }, [allowInviteByLink, fetchInviteLinkHandler])

  const handleChangeInviteLinkRole = useCallback(
    async (value: any) => {
      setInviteLinkRole(value)
      await fetchInviteLinkHandler(value)
    },
    [fetchInviteLinkHandler],
  )

  const handleClickRenewInviteLink = useCallback(async () => {
    await fetchInviteLinkHandler(USER_ROLE.VIEWER, true)
  }, [fetchInviteLinkHandler])

  const handleClickConfigInviteLink = useCallback(async () => {
    try {
      const isAllowed = await configInviteLink(!allowInviteByLink)
      if (isAllowed) {
        await fetchInviteLinkHandler(inviteLinkRole)
      }
    } catch (e) {
      console.error(e)
    }
  }, [
    allowInviteByLink,
    configInviteLink,
    fetchInviteLinkHandler,
    inviteLinkRole,
  ])

  const handleClickCopyInviteLink = useCallback(() => {
    const copyReturned = copy(inviteLink)
    if (copyReturned) {
      message.success({
        content: t("copied"),
      })
    } else {
      message.error({
        content: t("copy_failed"),
      })
    }
  }, [inviteLink, message, t])

  return (
    <div css={subBodyWrapperStyle}>
      <div css={subBodyTitleWrapperStyle}>
        <h4 css={subtitleStyle}>
          {t("user_management.modal.link.invite_title")}
        </h4>
        {allowInviteByLink && (
          <Dropdown
            trigger="click"
            position="bottom-end"
            dropList={
              <DropList>
                <DropListItem key="reset" onClick={handleClickRenewInviteLink}>
                  {t("user_management.modal.link.update")}
                </DropListItem>
                <DropListItem
                  key="turnOff"
                  onClick={handleClickConfigInviteLink}
                >
                  {t("user_management.modal.link.turn_off")}
                </DropListItem>
              </DropList>
            }
          >
            <span css={settingIconStyle}>
              <AuthShown
                currentUserRole={currentUserRole}
                allowRoles={[USER_ROLE.ADMIN, USER_ROLE.OWNER]}
                rules={SHOW_RULES.EQUAL}
              >
                <SettingIcon />
              </AuthShown>
            </span>
          </Dropdown>
        )}
      </div>
      {allowInviteByLink ? (
        <div css={inviteLinkWrapperStyle}>
          <div css={fakerInputStyle}>
            <span css={urlAreaStyle(fetchInviteLinkError)}>
              {!fetchInviteLinkError && !inviteLink && (
                <Skeleton text={{ rows: 1, width: 280 }} animation />
              )}
              {fetchInviteLinkError
                ? t("user_management.modal.link.fail")
                : inviteLink}
            </span>
            <RoleSelect
              value={inviteLinkRole}
              userRole={currentUserRole}
              onChange={handleChangeInviteLinkRole}
            />
          </div>
          <Button
            size="large"
            h="40px"
            colorScheme="black"
            onClick={handleClickCopyInviteLink}
          >
            {t("user_management.modal.link.copy")}
          </Button>
        </div>
      ) : (
        <p css={inviteLinkWhenClosedStyle}>
          {t("user_management.modal.link.description")}
          <span
            css={turnOnInviteLinkButtonStyle}
            onClick={handleClickConfigInviteLink}
          >
            {t("user_management.modal.link.turn_on")}
          </span>
        </p>
      )}
    </div>
  )
}

export const InviteMemberByEmail: FC<InviteMemberByEmailProps> = (props) => {
  const { currentUserRole, inviteByEmail, userListData } = props

  const { t } = useTranslation()
  const message = useMessage()

  const [inviteRole, setInviteRole] = useState<USER_ROLE>(USER_ROLE.VIEWER)
  const [inviteEmails, setInviteEmails] = useState<string[]>([])
  const [inputEmailValue, setInputEmailValue] = useState("")
  const [inviteMemberList, setInviteMemberList] = useState<
    inviteByEmailResponse[]
  >([])

  const handleChangeInviteRoleByEmail = useCallback((value: any) => {
    setInviteRole(value)
  }, [])

  const checkEmail = useCallback(
    (email: string) => {
      if (
        [...userListData, ...inviteMemberList].find(
          (item) => item.email === email,
        )
      ) {
        message.error({
          content: t("user_management.modal.email.in_list"),
        })
      } else if (!EMAIL_REGX.test(email)) {
        message.error({
          content: `${email} is not email`,
        })
      } else {
        return true
      }
    },
    [userListData, inviteMemberList, message, t],
  )

  const handleValidateInputValue = useCallback(
    (inputValue: string, values: any[]) => {
      if (!inputValue) return false
      if (!checkEmail(inputValue)) {
        return false
      }
      return values?.every((item) => item?.value !== inputValue)
    },
    [inviteMemberList, userListData],
  )

  const handlePressEnter = useCallback(() => {
    setInputEmailValue("")
  }, [])

  const handleInputValueChange = useCallback(
    (value: string) => {
      setInputEmailValue(value)
      if (value[value.length - 1] === ",") {
        const finalValue = value.slice(0, -1)
        if (checkEmail(finalValue)) {
          setInviteEmails([...inviteEmails, value.slice(0, -1)])
        }
        setInputEmailValue("")
      }
    },
    [inviteEmails],
  )

  const handleBlurInputValue = useCallback(() => {
    if (!inputEmailValue) return
    if (checkEmail(inputEmailValue)) {
      setInviteEmails([...inviteEmails, inputEmailValue])
      setInputEmailValue("")
    }
  }, [inputEmailValue, inviteEmails])

  const handleClickInviteButton = useCallback(() => {
    const requests = inviteEmails.map((email) => {
      return inviteByEmail(email, inviteRole)
    })
    Promise.all(requests)
      .then((results) => {
        message.success({
          content: t("user_management.mes.invite_suc"),
        })
        setInviteMemberList((prev) => [...prev, ...results])
        setInviteEmails([])
      })
      .catch(() => {
        message.error({
          content: t("user_management.mes.invite_fail"),
        })
      })
  }, [inviteByEmail, inviteEmails, inviteRole, message, t])

  return (
    <div css={subBodyWrapperStyle}>
      <div css={subBodyTitleWrapperStyle}>
        <h4 css={subtitleStyle}>
          {t("user_management.modal.email.invite_title")}
        </h4>
      </div>
      <div css={inviteEmailWrapperStyle}>
        <InputTag
          _css={emailInputStyle}
          size="large"
          borderColor={"techPurple"}
          suffix={
            <RoleSelect
              value={inviteRole}
              userRole={currentUserRole}
              onChange={handleChangeInviteRoleByEmail}
            />
          }
          value={inviteEmails}
          inputValue={inputEmailValue}
          validate={handleValidateInputValue}
          onChange={setInviteEmails}
          onPressEnter={handlePressEnter}
          onInputChange={handleInputValueChange}
          onBlur={handleBlurInputValue}
        />
        <Button
          size="large"
          h="40px"
          colorScheme="black"
          disabled={!(Array.isArray(inviteEmails) && inviteEmails.length > 0)}
          onClick={handleClickInviteButton}
        >
          {t("user_management.modal.email.invite")}
        </Button>
      </div>
      <InviteList
        inviteByEmail={inviteByEmail}
        inviteList={inviteMemberList}
        currentUserRole={currentUserRole}
      />
    </div>
  )
}

export const InviteMemberModalContent: FC<InviteMemberModalContentProps> = (
  props,
) => {
  const {
    currentUserRole,
    allowInviteByLink,
    renewInviteLink,
    fetchInviteLink,
    configInviteLink,
    inviteByEmail,
    userListData,
  } = props

  return (
    <div css={modalBodyWrapperStyle}>
      <InviteMemberByLink
        currentUserRole={currentUserRole}
        allowInviteByLink={allowInviteByLink}
        configInviteLink={configInviteLink}
        fetchInviteLink={fetchInviteLink}
        renewInviteLink={renewInviteLink}
      />
      <InviteMemberByEmail
        userListData={userListData}
        currentUserRole={currentUserRole}
        inviteByEmail={inviteByEmail}
      />
    </div>
  )
}

InviteMemberModalContent.displayName = "InviteMemberModal"
