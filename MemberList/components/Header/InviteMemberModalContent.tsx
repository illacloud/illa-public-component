import {
  Avatar,
  Button,
  CloseIcon,
  Divider,
  DropList,
  DropListItem,
  Dropdown,
  Input,
  InputTag,
  Loading,
  Skeleton,
  Switch,
  useMessage,
} from "@illa-design/react"
import copy from "copy-to-clipboard"
import {
  FC,
  MouseEvent,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react"
import { useTranslation } from "react-i18next"
import { AuthShown, canAuthShow } from "@/illa-public-component/AuthShown"
import { SHOW_RULES } from "@/illa-public-component/AuthShown/interface"
import { ReactComponent as SettingIcon } from "@/illa-public-component/MemberList/assets/icon/setting.svg"
import {
  AppPublicContentProps,
  InviteListItemProps,
  InviteListProps,
  InviteMemberByEmailProps,
  InviteMemberByLinkProps,
  InviteMemberModalContentProps,
  InviteMemberModalProps,
} from "@/illa-public-component/MemberList/components/Header/interface"
import {
  appPublicWrapperStyle,
  applyHiddenStyle,
  applyTabLabelStyle,
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
  modalTabWrapperStyle,
  modalTitleStyle,
  modalWithMaskWrapperStyle,
  modalWrapperStyle,
  nicknameStyle,
  publicLabelStyle,
  publicLinkStyle,
  settingIconStyle,
  subBodyTitleWrapperStyle,
  subBodyWrapperStyle,
  subtitleStyle,
  urlAreaStyle,
} from "@/illa-public-component/MemberList/components/Header/style"
import { inviteByEmailResponse } from "@/illa-public-component/MemberList/interface"
import { ILLA_MIXPANEL_EVENT_TYPE } from "@/illa-public-component/MixpanelUtils/interface"
import { MixpanelTrackContext } from "@/illa-public-component/MixpanelUtils/mixpanelContext"
import RoleSelect from "@/illa-public-component/RoleSelect"
import { canManage, canManageApp } from "@/illa-public-component/UserRoleUtils"
import {
  ACTION_MANAGE,
  ATTRIBUTE_GROUP,
  USER_ROLE,
} from "@/illa-public-component/UserRoleUtils/interface"

const EMAIL_REGX =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

export const InviteListItem: FC<InviteListItemProps> = (props) => {
  const {
    email,
    userRole,
    userAvatar,
    teamMemberID,
    currentUserRole,
    changeMembersRole,
  } = props
  const handleChangeRole = useCallback(
    (value: USER_ROLE) => {
      changeMembersRole(teamMemberID, value)
    },
    [teamMemberID, changeMembersRole],
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
  const { inviteList, currentUserRole, changeMembersRole } = props
  return (
    <div css={inviteListWrapperStyle}>
      {inviteList?.map((item) => (
        <InviteListItem
          key={item.email}
          email={item.email}
          emailStatus={item.emailStatus}
          userAvatar={item.userAvatar}
          userRole={item.userRole}
          userID={item.userID}
          teamMemberID={item.teamMemberID}
          currentUserRole={currentUserRole}
          changeMembersRole={changeMembersRole}
        />
      ))}
    </div>
  )
}

export const InviteMemberModal: FC<InviteMemberModalProps> = (props) => {
  const {
    hasApp,
    userListData,
    currentUserRole,
    allowInviteByLink,
    allowEditorManageTeamMember,
    allowViewerManageTeamMember,
    handleCloseModal,
    changeTeamMembersRole,
    inviteByEmail,
    renewInviteLink,
    fetchInviteLink,
    configInviteLink,
    maskClosable,
    appLink,
    isAppPublic,
    isCloudVersion,
    updateAppPublicConfig,
    appID,
    teamName,
    userNickname,
    from,
  } = props
  const { track } = useContext(MixpanelTrackContext)
  const { t } = useTranslation()

  const canSetPublic = canManageApp(
    currentUserRole,
    allowEditorManageTeamMember,
    allowViewerManageTeamMember,
  )

  const canEditApp = canManage(
    currentUserRole,
    ATTRIBUTE_GROUP.APP,
    ACTION_MANAGE.EDIT_APP,
  )

  const [activeTab, setActiveTab] = useState(canSetPublic ? 0 : 1)

  const tabs = [
    {
      id: 0,
      label: t("user_management.modal.tab.invite"),
      hidden: !canSetPublic,
    },
    {
      id: 1,
      label: t("user_management.modal.tab.public"),
      hidden: !canEditApp,
    },
  ]

  const handleClickMask = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      e.stopPropagation()
      maskClosable && handleCloseModal()
    },
    [maskClosable, handleCloseModal],
  )

  const handleTabClick = useCallback((id: number) => {
    setActiveTab(id)
  }, [])

  useEffect(() => {
    if (hasApp && appID) {
      track?.(ILLA_MIXPANEL_EVENT_TYPE.SHOW, {
        element: "invite_modal_public_tab",
        parameter5: appID,
      })
      track?.(ILLA_MIXPANEL_EVENT_TYPE.SHOW, {
        element: "invite_modal_invite_tab",
        parameter5: appID,
      })
    }
  }, [appID, hasApp, track])

  if (hasApp) {
    return (
      <div css={modalWithMaskWrapperStyle}>
        <div css={modalWrapperStyle}>
          <header css={modalHeaderWrapperStyle}>
            <div css={modalTabWrapperStyle}>
              {tabs.map((tab) => {
                const { id, label, hidden } = tab
                const isActive = id === activeTab
                if (hidden) return null

                return (
                  <span
                    key={`tab-${id}`}
                    css={applyTabLabelStyle(isActive)}
                    onClick={() => {
                      if (id === 1) {
                        track?.(ILLA_MIXPANEL_EVENT_TYPE.CLICK, {
                          element: "invite_modal_public_tab",
                          parameter5: appID,
                        })
                      }
                      handleTabClick(id)
                    }}
                  >
                    {label}
                  </span>
                )
              })}
            </div>
            <span
              css={closeIconHotSpotStyle}
              onClick={() => {
                track?.(
                  ILLA_MIXPANEL_EVENT_TYPE.CLICK,
                  {
                    element: "invite_modal_close",
                    parameter5: appID,
                  },
                  "both",
                )
                handleCloseModal()
              }}
            >
              <CloseIcon />
            </span>
          </header>
          <Divider />
          {activeTab === 0 && (
            <InviteMemberModalContent
              isCloudVersion={isCloudVersion}
              userListData={userListData}
              currentUserRole={currentUserRole}
              allowInviteByLink={allowInviteByLink}
              inviteByEmail={inviteByEmail}
              renewInviteLink={renewInviteLink}
              fetchInviteLink={fetchInviteLink}
              teamName={teamName}
              userNickname={userNickname}
              from={from}
              configInviteLink={configInviteLink}
              changeTeamMembersRole={changeTeamMembersRole}
              appID={appID}
            />
          )}
          {activeTab === 1 && (
            <AppPublicContent
              appLink={appLink}
              teamName={teamName}
              userNickname={userNickname}
              isAppPublic={isAppPublic}
              updateAppPublicConfig={updateAppPublicConfig}
              appID={appID}
            />
          )}
        </div>
        <div css={maskStyle} onClick={handleClickMask} />
      </div>
    )
  }

  return (
    <div css={modalWithMaskWrapperStyle}>
      <div css={modalWrapperStyle}>
        <header css={modalHeaderWrapperStyle}>
          <h3 css={modalTitleStyle}>
            {t("user_management.modal.title.invite_members")}
          </h3>
          <span
            css={closeIconHotSpotStyle}
            onClick={() => {
              track?.(
                ILLA_MIXPANEL_EVENT_TYPE.CLICK,
                {
                  element: "invite_modal_close",
                },
                "both",
              )
              handleCloseModal()
            }}
          >
            <CloseIcon />
          </span>
        </header>
        <Divider />
        <InviteMemberModalContent
          userListData={userListData}
          currentUserRole={currentUserRole}
          allowInviteByLink={allowInviteByLink}
          inviteByEmail={inviteByEmail}
          teamName={teamName}
          from={from}
          userNickname={userNickname}
          renewInviteLink={renewInviteLink}
          fetchInviteLink={fetchInviteLink}
          configInviteLink={configInviteLink}
          changeTeamMembersRole={changeTeamMembersRole}
        />
      </div>
      <div css={maskStyle} onClick={handleClickMask} />
    </div>
  )
}

export const AppPublicContent: FC<AppPublicContentProps> = (props) => {
  const {
    appLink,
    isAppPublic,
    appID,
    updateAppPublicConfig,
    teamName,
    userNickname,
  } = props
  const { t } = useTranslation()
  const { track } = useContext(MixpanelTrackContext)

  const message = useMessage()
  const [loading, setLoading] = useState(false)

  const handleClickCopy = useCallback(() => {
    if (!appLink) return
    const copyReturned = copy(
      t("user_management.modal.custom_copy_text_public", {
        teamName,
        userName: userNickname,
        inviteLink: appLink,
      }),
    )
    if (copyReturned) {
      message.success({
        content: t("copied"),
      })
    } else {
      message.error({
        content: t("copy_failed"),
      })
    }
  }, [appLink, message, t, teamName, userNickname])

  const switchAppPublic = async (value: boolean) => {
    if (loading) return
    setLoading(true)
    try {
      const success = await updateAppPublicConfig?.(value)
      if (success) {
        message.success({
          content: t("user_management.modal.message.make_public_suc"),
        })
        setLoading(false)
        return
      }
      message.error({
        content: t("user_management.modal.message.make_public_failed"),
      })
    } catch (e) {
      message.error({
        content: t("user_management.modal.message.make_public_failed"),
      })
    }
    setLoading(false)
  }
  useEffect(() => {
    track?.(ILLA_MIXPANEL_EVENT_TYPE.SHOW, {
      element: "invite_modal_public_switch",
      parameter4: isAppPublic ? "on" : "off",
      parameter5: appID,
    })
  }, [appID, isAppPublic, track])

  useEffect(() => {
    if (isAppPublic) {
      track?.(ILLA_MIXPANEL_EVENT_TYPE.SHOW, {
        element: "invite_modal_public_copy",
        parameter5: appID,
      })
      // showPublicCopyReport && showPublicCopyReport()
    }
  }, [appID, isAppPublic, track])

  return (
    <div css={appPublicWrapperStyle}>
      <div css={publicLabelStyle}>
        <span>{t("user_management.modal.link.make_public_title")}</span>
        {loading ? (
          <Loading colorScheme="techPurple" />
        ) : (
          <Switch
            checked={isAppPublic ?? false}
            colorScheme="black"
            onChange={switchAppPublic}
            onClick={() => {
              track?.(ILLA_MIXPANEL_EVENT_TYPE.CLICK, {
                element: "invite_modal_public_switch",
                parameter4: isAppPublic ? "on" : "off",
                parameter5: appID,
              })
            }}
          />
        )}
      </div>
      {isAppPublic && (
        <div css={publicLinkStyle}>
          <Input
            _css={emailInputStyle}
            value={appLink}
            colorScheme="techPurple"
            readOnly
          />
          <Button
            w="100%"
            h="32px"
            ov="hidden"
            colorScheme="black"
            disabled={!appLink}
            onClick={() => {
              handleClickCopy()
              track?.(ILLA_MIXPANEL_EVENT_TYPE.CLICK, {
                element: "invite_modal_public_copy",
                parameter5: appID,
              })
            }}
          >
            {t("user_management.modal.link.copy")}
          </Button>
        </div>
      )}
    </div>
  )
}

export const InviteMemberByLink: FC<InviteMemberByLinkProps> = (props) => {
  const {
    isCloudVersion,
    currentUserRole,
    allowInviteByLink,
    appID,
    userNickname,
    teamName,
    renewInviteLink,
    fetchInviteLink,
    configInviteLink,
    from,
  } = props

  const { track } = useContext(MixpanelTrackContext)
  const { t } = useTranslation()
  const message = useMessage()

  const [inviteLink, setInviteLink] = useState("")
  const [inviteLinkRole, setInviteLinkRole] = useState<USER_ROLE>(
    USER_ROLE.VIEWER,
  )
  const [loading, setLoading] = useState(false)
  const [fetchInviteLinkError, setFetchInviteLinkError] = useState(false)
  const [turnOnLoading, setTurnOnLoading] = useState(false)
  const cacheInviteLink = useRef(inviteLink)

  // replace url href to location.href

  const replaceHref = (link: string) => {
    const url = new URL(link)
    return `${location.origin}${url.search}`
  }

  const fetchInviteLinkHandler = useCallback(
    async (userRole: USER_ROLE, isRenew: boolean = false) => {
      setLoading(true)
      try {
        const linkConfig = isRenew
          ? await renewInviteLink(userRole)
          : await fetchInviteLink(userRole)
        if (
          linkConfig &&
          linkConfig.inviteLink &&
          linkConfig.userRole != undefined
        ) {
          const link = isCloudVersion
            ? linkConfig.inviteLink
            : replaceHref(linkConfig.inviteLink)
          setInviteLink(link)
          setInviteLinkRole(linkConfig.userRole)
          setFetchInviteLinkError(false)
        } else {
          setFetchInviteLinkError(true)
        }
      } catch (e) {
        setFetchInviteLinkError(true)
      }
      setLoading(false)
    },
    [fetchInviteLink, renewInviteLink, isCloudVersion],
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
    await fetchInviteLinkHandler(inviteLinkRole, true)
  }, [inviteLinkRole, fetchInviteLinkHandler])

  const handleClickConfigInviteLink = useCallback(async () => {
    try {
      const isAllowed = await configInviteLink(!allowInviteByLink)
      if (isAllowed) {
        await fetchInviteLinkHandler(inviteLinkRole)
      }
    } catch (e) {
      console.error(e)
      const errorMessage = allowInviteByLink
        ? t("user_management.modal.link.turn_off_fail")
        : t("user_management.modal.link.turn_on_fail")
      message.error({
        content: errorMessage,
      })
    }
  }, [
    allowInviteByLink,
    configInviteLink,
    fetchInviteLinkHandler,
    inviteLinkRole,
    message,
    t,
  ])

  const handleClickTurnOnInviteLink = useCallback(() => {
    setTurnOnLoading(true)
    canAuthShow(
      currentUserRole,
      [USER_ROLE.ADMIN, USER_ROLE.OWNER],
      SHOW_RULES.EQUAL,
    ) &&
      track?.(
        ILLA_MIXPANEL_EVENT_TYPE.CLICK,
        {
          element: "invite_link_on",
          parameter5: appID,
        },
        "both",
      )
    handleClickConfigInviteLink().finally(() => {
      setTurnOnLoading(false)
    })
  }, [appID, currentUserRole, handleClickConfigInviteLink, track])

  const handleClickCopyInviteLink = useCallback(() => {
    track?.(
      ILLA_MIXPANEL_EVENT_TYPE.CLICK,
      {
        element: "invite_link_copy",
        parameter1: inviteLinkRole,
        parameter5: appID,
      },
      "both",
    )
    const copyReturned = copy(
      from === "cloud_dashboard"
        ? t("user_management.modal.custom_copy_text", {
            userName: userNickname,
            teamName: teamName,
            inviteLink: inviteLink,
          })
        : t("user_management.modal.custom_copy_text_app_invite", {
            userName: userNickname,
            teamName: teamName,
            inviteLink: inviteLink,
          }),
    )
    if (copyReturned) {
      message.success({
        content: t("copied"),
      })
    } else {
      message.error({
        content: t("copy_failed"),
      })
    }
  }, [
    appID,
    from,
    inviteLink,
    inviteLinkRole,
    message,
    t,
    teamName,
    track,
    userNickname,
  ])

  useEffect(() => {
    !allowInviteByLink &&
      canAuthShow(
        currentUserRole,
        [USER_ROLE.ADMIN, USER_ROLE.OWNER],
        SHOW_RULES.EQUAL,
      )
  }, [allowInviteByLink, appID, currentUserRole, track])

  useEffect(() => {
    !allowInviteByLink &&
      track?.(
        ILLA_MIXPANEL_EVENT_TYPE.SHOW,
        { element: "invite_link_on", parameter5: appID },
        "both",
      )
  }, [allowInviteByLink, appID, track])

  useEffect(() => {
    if (inviteLink && inviteLink !== cacheInviteLink.current) {
      track?.(
        ILLA_MIXPANEL_EVENT_TYPE.SHOW,
        {
          element: "invite_link",
          parameter1: inviteLinkRole,
          parameter5: appID,
        },
        "both",
      )
      cacheInviteLink.current = inviteLink
    }
  }, [inviteLinkRole, inviteLink, track, appID])

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
            triggerProps={{ zIndex: 2 }}
            dropList={
              <DropList>
                <DropListItem
                  key="reset"
                  value="reset"
                  onClick={() => {
                    canAuthShow(
                      currentUserRole,
                      [USER_ROLE.ADMIN, USER_ROLE.OWNER],
                      SHOW_RULES.EQUAL,
                    ) &&
                      track?.(
                        ILLA_MIXPANEL_EVENT_TYPE.CLICK,
                        {
                          element: "invite_link_update",
                          parameter1: inviteLinkRole,
                          parameter5: appID,
                        },
                        "both",
                      )
                    handleClickRenewInviteLink()
                  }}
                >
                  {t("user_management.modal.link.update")}
                </DropListItem>
                <DropListItem
                  key="turnOff"
                  value="turnOff"
                  onClick={() => {
                    canAuthShow(
                      currentUserRole,
                      [USER_ROLE.ADMIN, USER_ROLE.OWNER],
                      SHOW_RULES.EQUAL,
                    ) &&
                      track?.(
                        ILLA_MIXPANEL_EVENT_TYPE.CLICK,
                        {
                          element: "invite_link_close",
                          parameter5: appID,
                        },
                        "both",
                      )
                    handleClickConfigInviteLink()
                  }}
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
      ) : (
        <p css={inviteLinkWhenClosedStyle}>
          {t("user_management.modal.link.description")}
          <Button
            variant="text"
            colorScheme="techPurple"
            size="small"
            loading={turnOnLoading}
            onClick={handleClickTurnOnInviteLink}
          >
            {t("user_management.modal.link.turn_on")}
          </Button>
        </p>
      )}
    </div>
  )
}

export const InviteMemberByEmail: FC<InviteMemberByEmailProps> = (props) => {
  const {
    currentUserRole,
    userListData,
    appID,
    inviteByEmail,
    changeTeamMembersRole,
  } = props
  const { track } = useContext(MixpanelTrackContext)

  const { t } = useTranslation()
  const message = useMessage()

  const [loading, setLoading] = useState(false)
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
          content: t("user_management.modal.email.notmail", {
            email: email,
          }),
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
    [checkEmail],
  )

  const handlePressEnter = useCallback(() => {
    setInputEmailValue("")
  }, [])

  const handleInputValueChange = useCallback(
    (value: string) => {
      value = value.trim()
      setInputEmailValue(value)
      if (value.includes(",")) {
        const values = value.split(",")
        values.forEach((item) => {
          item = item.trim()
          if (!item.length) return
          if (inviteEmails.find((email) => email == item)) {
            message.error({
              content: t("user_management.modal.email.duplicate", {
                email: item,
              }),
            })
            return
          }
          if (checkEmail(item)) {
            setInviteEmails((prev) => [...prev, item])
          }
        })
        setInputEmailValue("")
      }
    },
    [inviteEmails, checkEmail, message, t],
  )

  const handleBlurInputValue = useCallback(() => {
    if (!inputEmailValue) return
    if (checkEmail(inputEmailValue)) {
      setInviteEmails([...inviteEmails, inputEmailValue])
      setInputEmailValue("")
    }
  }, [inputEmailValue, inviteEmails, checkEmail])

  const handleClickInviteButton = useCallback(() => {
    const requests = inviteEmails.map((email) => {
      return inviteByEmail(email, inviteRole)
    })
    setLoading(true)
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
      .finally(() => {
        setLoading(false)
      })
  }, [inviteByEmail, inviteEmails, inviteRole, message, t])

  const handleChangeInviteMemberRole = useCallback(
    (teamMemberID: string, userRole: USER_ROLE) => {
      return changeTeamMembersRole(teamMemberID, userRole)
        .then((res) => {
          if (res) {
            setInviteMemberList((prev) => {
              const index = prev.findIndex(
                (item) => item.teamMemberID === teamMemberID,
              )
              if (index !== -1) {
                prev[index].userRole = userRole
              }
              return [...prev]
            })
          } else {
            message.error({
              content: t("user_management.mes.change_role_fail"),
            })
          }
        })
        .catch((e) => {
          console.error(e)
          message.error({
            content: t("user_management.mes.change_role_fail"),
          })
        })
    },
    [changeTeamMembersRole, message, t],
  )

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
          alignItems="start"
          colorScheme={"techPurple"}
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
          onChange={(value: any) => {
            setInviteEmails(value as string[])
          }}
          onPressEnter={handlePressEnter}
          onInputChange={handleInputValueChange}
          onBlur={handleBlurInputValue}
        />
        <Button
          w="100%"
          h="32px"
          ov="hidden"
          colorScheme="black"
          loading={loading}
          disabled={!(Array.isArray(inviteEmails) && inviteEmails.length > 0)}
          onClick={() => {
            track?.(
              ILLA_MIXPANEL_EVENT_TYPE.CLICK,
              {
                element: "invite_email_button",
                parameter1: inviteRole,
                parameter2: inviteEmails.length,
                parameter5: appID,
              },
              "both",
            )
            handleClickInviteButton()
          }}
        >
          <span css={applyHiddenStyle(loading)}>
            {t("user_management.modal.email.invite")}
          </span>
        </Button>
      </div>
      <InviteList
        changeMembersRole={handleChangeInviteMemberRole}
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
    isCloudVersion,
    changeTeamMembersRole,
    currentUserRole,
    allowInviteByLink,
    renewInviteLink,
    fetchInviteLink,
    configInviteLink,
    inviteByEmail,
    userListData,
    appID,
    userNickname,
    teamName,
    from,
  } = props

  return (
    <div css={modalBodyWrapperStyle}>
      <InviteMemberByLink
        from={from}
        isCloudVersion={isCloudVersion}
        currentUserRole={currentUserRole}
        allowInviteByLink={allowInviteByLink}
        appID={appID}
        userNickname={userNickname}
        teamName={teamName}
        configInviteLink={configInviteLink}
        fetchInviteLink={fetchInviteLink}
        renewInviteLink={renewInviteLink}
      />
      <InviteMemberByEmail
        userListData={userListData}
        currentUserRole={currentUserRole}
        appID={appID}
        inviteByEmail={inviteByEmail}
        changeTeamMembersRole={changeTeamMembersRole}
      />
    </div>
  )
}

InviteMemberModalContent.displayName = "InviteMemberModal"
