import { Input, Spin, useMessage } from "@illa-design/react"
import { FC, useCallback, useContext, useMemo, useRef, useState } from "react"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import { EMAIL_FORMAT } from "@/constants/regExp"
import { inviteByEmailResponse } from "@/illa-public-component/MemberList/interface"
import { InviteByEmailProps } from "@/illa-public-component/MobileMember/InviteModalMobile/interface"
import {
  applyInviteByEmailWrapperStyle,
  applyInviteCountStyle,
  emailAreaStyle,
  emailInputStyle,
  inviteListTitleStyle,
  inviteListWrapperStyle,
} from "@/illa-public-component/MobileMember/InviteModalMobile/style"
import { MemberListItem } from "@/illa-public-component/MobileMember/MemberListMobile"
import { MemberListCommonProps } from "@/illa-public-component/MobileMember/MemberListMobile/interface"
import UserRoleSelect from "@/illa-public-component/MobileMember/UserRoleSelect"
import { UpgradeCloudContext } from "@/illa-public-component/UpgradeCloudProvider"
import { errorMsgStyle } from "@/illa-public-component/User/login/components/MobileLogin/style"
import { USER_ROLE } from "@/illa-public-component/UserRoleUtils/interface"
import { getCurrentTeamTotalLicense } from "@/redux/team/teamSelector"

export interface InviteListProps
  extends Pick<MemberListCommonProps, "currentUserRole"> {
  inviteList?: inviteByEmailResponse[]
  changeMembersRole: (userID: string, userRole: USER_ROLE) => void
}

export interface InviteEmailFields {
  email: string
}

export const InviteList: FC<InviteListProps> = (props) => {
  const { inviteList, currentUserRole, changeMembersRole } = props

  if (!inviteList?.length) {
    return null
  }

  return (
    <div css={inviteListWrapperStyle}>
      {inviteList?.map((item) => (
        <MemberListItem
          key={item.userID}
          name={item.name}
          userId={item.userID}
          email={item.email}
          userAvatar={item.userAvatar}
          userRole={item.userRole}
          teamMemberID={item.teamMemberID}
          currentUserRole={currentUserRole}
          changeMembersRole={changeMembersRole}
        />
      ))}
    </div>
  )
}

const InviteByEmail: FC<InviteByEmailProps> = (props) => {
  const {
    currentUserRole,
    userListData,
    autoHeight,
    inviteByEmail,
    changeTeamMembersRole,
    closeInviteModal,
  } = props
  const { t } = useTranslation()
  const message = useMessage()
  const formRef = useRef<HTMLFormElement>(null)
  const { control, formState, handleSubmit, reset } =
    useForm<InviteEmailFields>({
      mode: "onSubmit",
      criteriaMode: "firstError",
    })
  const totalTeamLicense = useSelector(getCurrentTeamTotalLicense)
  const { handleUpgradeModalVisible } = useContext(UpgradeCloudContext)

  const [inviteRole, setInviteRole] = useState<USER_ROLE>(USER_ROLE.VIEWER)
  const [inviteMemberList, setInviteMemberList] = useState<
    inviteByEmailResponse[]
  >([])
  const [loading, setLoading] = useState<boolean>(false)

  const remainInviteCount = useMemo(() => {
    const needLicenseList = inviteMemberList.filter((item) => {
      return item.userRole !== USER_ROLE.VIEWER
    })
    if (!totalTeamLicense) {
      return 0
    }
    return totalTeamLicense.balance - needLicenseList.length
  }, [inviteMemberList, totalTeamLicense])

  const checkRemainCount = useCallback(() => {
    if (
      inviteRole === USER_ROLE.VIEWER
        ? remainInviteCount < 0
        : remainInviteCount < 1
    ) {
      closeInviteModal?.()
      handleUpgradeModalVisible(true, "add-license")
      return false
    }
    return true
  }, [
    inviteRole,
    remainInviteCount,
    closeInviteModal,
    handleUpgradeModalVisible,
  ])

  const handleInviteByEmail: SubmitHandler<InviteEmailFields> = async (
    data,
  ) => {
    if (loading) return
    if (!checkRemainCount()) return
    const email = data.email
    setLoading(true)
    reset({ email: "" })
    inviteByEmail(email, inviteRole)
      .then((results) => {
        message.success({
          content: t("user_management.mes.invite_suc"),
        })
        setInviteMemberList((prev) => [...prev, results])
      })
      .catch(() => {
        message.error({
          content: t("user_management.mes.invite_fail"),
        })
      })
      .finally(() => {
        setLoading(false)
      })
  }

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
    <Spin
      _css={applyInviteByEmailWrapperStyle(autoHeight)}
      colorScheme="techPurple"
      loading={loading}
    >
      <form
        css={emailAreaStyle}
        ref={formRef}
        onSubmit={handleSubmit(handleInviteByEmail)}
      >
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              // error={!!formState?.errors.email}
              _css={emailInputStyle}
              variant="fill"
              colorScheme="techPurple"
              autoFocus={false}
              suffix={
                <UserRoleSelect
                  value={inviteRole}
                  userRole={currentUserRole}
                  onChange={setInviteRole}
                />
              }
              placeholder={t("user_management.modal.email.placeholder")}
              onPressEnter={(e) => {
                e.currentTarget.blur()
                formRef.current?.requestSubmit()
              }}
            />
          )}
          rules={{
            pattern: {
              value: EMAIL_FORMAT,
              message: t("user_management.modal.invalid_email"),
            },
            validate: (value) => {
              return [...userListData, ...inviteMemberList].find(
                (item) => item.email === value,
              )
                ? t("user_management.modal.email.in_list")
                : true
            },
          }}
        />
        {formState?.errors.email && (
          <div css={errorMsgStyle}>{formState?.errors.email?.message}</div>
        )}
      </form>
      <div css={inviteListTitleStyle}>
        {t("user_management.modal.tips.license_insufficient") + " "}
        <span css={applyInviteCountStyle(remainInviteCount)}>
          {remainInviteCount}
        </span>
      </div>
      <InviteList
        inviteList={inviteMemberList}
        currentUserRole={currentUserRole}
        changeMembersRole={handleChangeInviteMemberRole}
      />
    </Spin>
  )
}

InviteByEmail.displayName = "InviteByEmail"

export default InviteByEmail
