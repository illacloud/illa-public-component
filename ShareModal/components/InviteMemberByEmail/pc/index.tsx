import { InviteList, MemberListContext } from "@illa-public/member-list"
import {
  ILLA_MIXPANEL_EVENT_TYPE,
  MixpanelTrackContext,
} from "@illa-public/mixpanel-utils"
import RoleSelect from "@illa-public/role-select"
import { UpgradeCloudContext } from "@illa-public/upgrade-cloud-provider"
import { USER_ROLE } from "@illa-public/user-data"
import { FC, useCallback, useContext, useMemo, useState } from "react"
import { useTranslation } from "react-i18next"
import { Button, InputTag, useMessage } from "@illa-design/react"
import { InviteMemberByEmailProps, inviteByEmailResponse } from "../interface"
import {
  applyHiddenStyle,
  applyInviteCountStyle,
  emailInputStyle,
  inviteEmailWrapperStyle,
  remainInviteCountStyle,
  subBodyTitleWrapperStyle,
  subBodyWrapperStyle,
  subtitleStyle,
} from "./style"

const EMAIL_REGX =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

export const InviteMemberByEmailPC: FC<InviteMemberByEmailProps> = (props) => {
  const {
    currentUserRole,
    userListData,
    appID,
    inviteByEmail,
    changeTeamMembersRole,
    inviteToEditApp,
  } = props
  const { track } = useContext(MixpanelTrackContext)

  const { t } = useTranslation()
  const message = useMessage()

  const { totalTeamLicense, isCloudVersion } = useContext(MemberListContext)
  const { handleUpgradeModalVisible } = useContext(UpgradeCloudContext)

  const [loading, setLoading] = useState(false)
  const [inviteEmails, setInviteEmails] = useState<string[]>([])
  const [inputEmailValue, setInputEmailValue] = useState("")
  const [inviteMemberList, setInviteMemberList] = useState<
    inviteByEmailResponse[]
  >([])
  const [inviteRole, setInviteRole] = useState<USER_ROLE>(
    inviteToEditApp ? USER_ROLE.EDITOR : USER_ROLE.VIEWER,
  )

  const remainInviteCount = useMemo(() => {
    if (!isCloudVersion) return 0
    const needLicenseList = inviteMemberList.filter((item) => {
      return item.userRole !== USER_ROLE.VIEWER
    })
    return totalTeamLicense.balance - needLicenseList.length
  }, [totalTeamLicense?.balance, inviteMemberList, isCloudVersion])

  const userSelectFilterRole = useMemo(
    () =>
      inviteToEditApp
        ? [USER_ROLE.OWNER, USER_ROLE.VIEWER, USER_ROLE.CUSTOM]
        : [USER_ROLE.OWNER, USER_ROLE.CUSTOM],
    [inviteToEditApp],
  )

  const checkEmail = useCallback(
    (email: string) => {
      if (
        isCloudVersion &&
        (inviteRole === USER_ROLE.VIEWER
          ? remainInviteCount < 0
          : remainInviteCount < inviteEmails.length + 1)
      ) {
        handleUpgradeModalVisible(true, "add-license")
        return false
      }
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
    [
      isCloudVersion,
      userListData,
      inviteEmails,
      inviteMemberList,
      inviteRole,
      remainInviteCount,
      handleUpgradeModalVisible,
      message,
      t,
    ],
  )

  const checkRemainCount = useCallback(() => {
    if (!isCloudVersion) return true
    if (
      inviteRole === USER_ROLE.VIEWER
        ? remainInviteCount < 0
        : remainInviteCount < inviteEmails.length + 1
    ) {
      handleUpgradeModalVisible(true, "add-license")
      return false
    }
    return true
  }, [
    isCloudVersion,
    inviteRole,
    remainInviteCount,
    inviteEmails,
    handleUpgradeModalVisible,
  ])

  const handleChangeInviteRoleByEmail = useCallback(
    (value: USER_ROLE) => {
      setInviteRole(value)
      if (isCloudVersion && inviteEmails.length) {
        if (
          value === USER_ROLE.VIEWER
            ? remainInviteCount < 0
            : remainInviteCount < inviteEmails.length
        ) {
          handleUpgradeModalVisible(true, "add-license")
          setInviteEmails((prev) => {
            return prev.slice(0, remainInviteCount)
          })
        }
      }
    },
    [
      isCloudVersion,
      inviteEmails.length,
      remainInviteCount,
      handleUpgradeModalVisible,
    ],
  )

  const handleValidateInputValue = useCallback(
    (inputValue: string, values: any[]) => {
      if (!inputValue) return false
      if (!checkEmail(inputValue)) {
        return false
      }
      if (!checkRemainCount()) {
        return false
      }
      return values?.every((item) => item?.value !== inputValue)
    },
    [checkEmail, checkRemainCount],
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
        for (let index = 0; index < values.length; index++) {
          let item = values[index].trim()

          if (!item.length) continue

          if (inviteEmails.find((email) => email == item)) {
            message.error({
              content: t("user_management.modal.email.duplicate", {
                email: item,
              }),
            })
            continue
          }

          if (checkEmail(item) && checkRemainCount()) {
            setInviteEmails((prev) => [...prev, item])
          }
        }
        setInputEmailValue("")
      }
    },
    [inviteEmails, message, t, checkEmail, checkRemainCount],
  )

  const handleBlurInputValue = useCallback(() => {
    if (!inputEmailValue) return
    if (checkEmail(inputEmailValue) && checkRemainCount()) {
      setInviteEmails([...inviteEmails, inputEmailValue])
      setInputEmailValue("")
    }
  }, [inputEmailValue, inviteEmails, checkEmail, checkRemainCount])

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
      .finally(() => {
        setLoading(false)
      })
  }, [inviteByEmail, inviteEmails, inviteRole, message, t])

  const handleChangeInviteMemberRole = useCallback(
    (teamMemberID: string, userRole: USER_ROLE) => {
      return changeTeamMembersRole(teamMemberID, userRole).then((res) => {
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
        }
      })
    },
    [changeTeamMembersRole],
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
              filterRole={userSelectFilterRole}
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
      {isCloudVersion && (
        <div css={remainInviteCountStyle}>
          {t("user_management.modal.tips.license_insufficient") + " "}
          <span css={applyInviteCountStyle(remainInviteCount)}>
            {remainInviteCount}
          </span>
        </div>
      )}
      <InviteList
        changeMembersRole={handleChangeInviteMemberRole}
        inviteList={inviteMemberList}
        currentUserRole={currentUserRole}
      />
    </div>
  )
}

InviteMemberByEmailPC.displayName = "InviteMemberByEmailPC"
