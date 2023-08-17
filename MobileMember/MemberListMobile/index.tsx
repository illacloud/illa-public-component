import {
  FC,
  HTMLAttributes,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react"
import { useTranslation } from "react-i18next"
import { Button, Loading } from "@illa-design/react"
import { Avatar } from "@/illa-public-component/Avatar"
import {
  SUBSCRIBE_PLAN,
  SUBSCRIPTION_CYCLE,
} from "@/illa-public-component/MemberList/interface"
import { ILLA_MIXPANEL_EVENT_TYPE } from "@/illa-public-component/MixpanelUtils/interface"
import { MixpanelTrackContext } from "@/illa-public-component/MixpanelUtils/mixpanelContext"
import InviteModalMobile from "@/illa-public-component/MobileMember/InviteModalMobile"
import {
  MemberListCommonProps,
  MemberListMobileProps,
} from "@/illa-public-component/MobileMember/MemberListMobile/interface"
import {
  avatarStyle,
  emailStyle,
  firstLineStyle,
  headerStyle,
  inviteBtnStyle,
  listItemStyle,
  listWrapperStyle,
  loadingStyle,
  nameStyle,
  onlyNameStyle,
  pendingStatusTextStyle,
  userInfoStyle,
  wrapperStyle,
} from "@/illa-public-component/MobileMember/MemberListMobile/style"
import UserRoleSelect from "@/illa-public-component/MobileMember/UserRoleSelect"
import { UpgradeCloudContext } from "@/illa-public-component/UpgradeCloudProvider"
import { UsageCard } from "@/illa-public-component/UsageCard"
import { canManagePayment } from "@/illa-public-component/UserRoleUtils"
import {
  USER_ROLE,
  USER_STATUS,
} from "@/illa-public-component/UserRoleUtils/interface"

export interface MemberListItemProps
  extends HTMLAttributes<HTMLDivElement>,
    Pick<MemberListCommonProps, "currentUserRole"> {
  email: string
  name?: string
  userId: string
  currentUserID?: string
  teamMemberID: string
  userRole: USER_ROLE
  userStatus?: USER_STATUS
  userAvatar?: string
  changeMembersRole: (userID: string, userRole: USER_ROLE) => void
}

export const MemberListItem: FC<MemberListItemProps> = (props) => {
  const {
    email,
    name,
    userId,
    teamMemberID,
    userRole,
    userStatus,
    userAvatar,
    currentUserID,
    currentUserRole,
    changeMembersRole,
    ...otherProps
  } = props

  const handleRoleChange = useCallback(
    (userRole: USER_ROLE) => {
      changeMembersRole(teamMemberID, userRole)
    },
    [teamMemberID, changeMembersRole],
  )

  return (
    <div css={listItemStyle} {...otherProps}>
      <div css={userInfoStyle}>
        <Avatar
          css={avatarStyle}
          id={userId}
          name={name}
          avatarUrl={userAvatar}
        />
        {name ? (
          <div>
            <div css={firstLineStyle}>
              <span css={nameStyle}>{name}</span>
              {userId === currentUserID && " (You)"}
              {userStatus === USER_STATUS.PENDING && (
                <span css={pendingStatusTextStyle}>{" (Pending)"}</span>
              )}
            </div>
            <div css={emailStyle}>{email}</div>
          </div>
        ) : userStatus ? (
          <div css={firstLineStyle}>
            <span css={nameStyle}>{email} </span>
            {userStatus === USER_STATUS.PENDING && (
              <span css={pendingStatusTextStyle}>(Pending)</span>
            )}
          </div>
        ) : (
          <div css={firstLineStyle}>
            <span css={onlyNameStyle}>{email}</span>
          </div>
        )}
      </div>
      <UserRoleSelect
        value={userRole}
        userRole={currentUserRole}
        onChange={handleRoleChange}
        disabled={userId === currentUserID}
      />
    </div>
  )
}

export const MemberListMobile: FC<MemberListMobileProps> = (props) => {
  const {
    className,
    loading,
    userListData,
    modalVisible,
    setModalVisible,
    currentUserID,
    currentUserRole,
    inviteLinkEnabled,
    inviteByEmail,
    fetchInviteLink,
    configInviteLink,
    teamName,
    currentTeamLicense,
    totalTeamLicense,
    userNickname,
    changeTeamMembersRole,
    onSubscribe,
  } = props
  const { t } = useTranslation()
  const [activeTab, setActiveTab] = useState(1)
  const { track } = useContext(MixpanelTrackContext)
  const { handleLicenseDrawerVisible, handleUpgradeModalVisible } =
    useContext(UpgradeCloudContext)

  const hasPaymentManagementPermission = useMemo(() => {
    return canManagePayment(
      currentUserRole,
      totalTeamLicense?.teamLicenseAllPaid,
    )
  }, [currentUserRole, totalTeamLicense?.teamLicenseAllPaid])

  useEffect(() => {
    track?.(
      ILLA_MIXPANEL_EVENT_TYPE.SHOW,
      {
        element: "invite_button",
        parameter4: inviteLinkEnabled ? "not_disable" : "disable",
      },
      "both",
    )
  }, [inviteLinkEnabled, track])

  const onInviteClick = () => {
    track?.(
      ILLA_MIXPANEL_EVENT_TYPE.CLICK,
      {
        element: "invite_button",
      },
      "both",
    )
    if (totalTeamLicense?.teamLicenseAllPaid) {
      setModalVisible(true)
    } else if (totalTeamLicense.balance < 0) {
      handleUpgradeModalVisible(true, "add-license")
    } else {
      handleUpgradeModalVisible(true, "upgrade")
    }
  }

  const openDrawer = () => {
    handleLicenseDrawerVisible(true, {
      type: "license",
      subscribeInfo: {
        quantity: currentTeamLicense.cancelAtPeriodEnd
          ? 1
          : currentTeamLicense.volume ?? 1,
        cycle: currentTeamLicense.cycle || SUBSCRIPTION_CYCLE.MONTHLY,
        plan: SUBSCRIBE_PLAN.TEAM_LICENSE_PREMIUM,
        currentPlan: currentTeamLicense.plan,
        cancelAtPeriodEnd: currentTeamLicense?.cancelAtPeriodEnd,
      },
      onSubscribeCallback: onSubscribe,
    })
  }

  return (
    <div css={wrapperStyle} className={className}>
      <h1 css={headerStyle}>{t("user_management.page.member")}</h1>
      {loading ? (
        <Loading css={loadingStyle} colorScheme="techPurple" />
      ) : (
        <div css={listWrapperStyle}>
          {hasPaymentManagementPermission ? (
            <UsageCard
              type="License"
              current={totalTeamLicense.volume - totalTeamLicense.balance}
              total={totalTeamLicense.volume}
              buttonColorScheme="grayBlue"
              buttonVariant="outline"
              actionDes={
                currentTeamLicense?.cycle === SUBSCRIPTION_CYCLE.YEARLY
                  ? t(`billing.license_price_new.yearly`, { price: "$200" })
                  : t(`billing.license_price_new.monthly`, { price: "$20" })
              }
              isMobile
              onClick={openDrawer}
            />
          ) : null}
          {userListData?.map((member) => {
            return (
              <MemberListItem
                key={member.teamMemberID}
                userId={member.userID}
                teamMemberID={member.teamMemberID}
                name={member.nickname}
                email={member.email}
                userRole={member.userRole}
                userStatus={member.userStatus}
                userAvatar={member.avatar}
                currentUserID={currentUserID}
                currentUserRole={currentUserRole}
                changeMembersRole={changeTeamMembersRole}
              />
            )
          })}
        </div>
      )}
      <Button
        _css={inviteBtnStyle}
        fullWidth
        colorScheme="techPurple"
        onClick={onInviteClick}
      >
        {t("homepage.workspace.invite")}
      </Button>
      <InviteModalMobile
        teamName={teamName}
        userNickname={userNickname}
        userListData={userListData}
        activeTab={activeTab}
        visible={modalVisible}
        currentUserRole={currentUserRole}
        inviteByEmail={inviteByEmail}
        inviteLinkEnabled={inviteLinkEnabled}
        fetchInviteLink={fetchInviteLink}
        configInviteLink={configInviteLink}
        onCancel={() => {
          setModalVisible(false)
        }}
        onChangeTab={setActiveTab}
        changeTeamMembersRole={changeTeamMembersRole}
      />
    </div>
  )
}

MemberListMobile.displayName = "MemberListMobile"
