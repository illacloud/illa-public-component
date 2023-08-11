import { isSmallThanTargetRole } from "@illa-public/user-role-utils"
import { FC, useContext, useEffect, useMemo } from "react"
import { useTranslation } from "react-i18next"
import { CloseIcon, Drawer, DrawerProps } from "@illa-design/react"
import { ILLA_MIXPANEL_EVENT_TYPE } from "@/illa-public-component/MixpanelUtils/interface"
import { MixpanelTrackContext } from "@/illa-public-component/MixpanelUtils/mixpanelContext"
import InviteByEmail from "@/illa-public-component/MobileMember/InviteModalMobile/InviteByEmail"
import InviteByLink from "@/illa-public-component/MobileMember/InviteModalMobile/InviteByLink"
import {
  applyTabTitleItemStyle,
  closeIconContainerStyle,
  closeIconStyle,
  contentStyle,
  inviteModalStyle,
  tabTitleStyle,
} from "@/illa-public-component/MobileMember/InviteModalMobile/style"
import { MemberListCommonProps } from "@/illa-public-component/MobileMember/MemberListMobile/interface"
import { USER_ROLE } from "@/illa-public-component/UserRoleUtils/interface"
import { pxToRem } from "@/style"

interface InviteModalMobileProps
  extends DrawerProps,
    Pick<
      MemberListCommonProps,
      | "userListData"
      | "inviteByEmail"
      | "currentUserRole"
      | "fetchInviteLink"
      | "configInviteLink"
      | "changeTeamMembersRole"
      | "userNickname"
      | "teamName"
    > {
  inviteLinkEnabled?: boolean
  activeTab: number
  onChangeTab: (currentTabId: number) => void
}

const InviteModalMobile: FC<InviteModalMobileProps> = (props) => {
  const {
    activeTab,
    userListData,
    inviteLinkEnabled,
    onCancel,
    onChangeTab,
    currentUserRole,
    inviteByEmail,
    fetchInviteLink,
    configInviteLink,
    changeTeamMembersRole,
    visible,
    teamName,
    userNickname,
    ...otherProps
  } = props
  const { t } = useTranslation()
  const { track } = useContext(MixpanelTrackContext)

  const disabledInvite = useMemo(() => {
    return (
      !inviteLinkEnabled &&
      isSmallThanTargetRole(USER_ROLE.ADMIN, currentUserRole)
    )
  }, [currentUserRole, inviteLinkEnabled])

  const tabs = [
    {
      id: 0,
      label: t("user_management.modal.link.invite_title"),
      disabled: disabledInvite,
      content: (
        <InviteByLink
          currentUserRole={currentUserRole}
          teamName={teamName}
          userNickname={userNickname}
          inviteLinkEnabled={inviteLinkEnabled}
          fetchInviteLink={fetchInviteLink}
          configInviteLink={configInviteLink}
        />
      ),
    },
    {
      id: 1,
      label: t("user_management.modal.email.invite_title"),
      content: (
        <InviteByEmail
          userListData={userListData}
          currentUserRole={currentUserRole}
          inviteByEmail={inviteByEmail}
          changeTeamMembersRole={changeTeamMembersRole}
          closeInviteModal={onCancel}
        />
      ),
    },
  ]

  const onCloseClick = () => {
    track?.(
      ILLA_MIXPANEL_EVENT_TYPE.CLICK,
      {
        element: "invite_modal_close",
      },
      "both",
    )
    onCancel && onCancel()
  }

  useEffect(() => {
    visible &&
      track?.(
        ILLA_MIXPANEL_EVENT_TYPE.SHOW,
        {
          element: "invite_modal",
        },
        "both",
      )
  }, [track, visible])

  return (
    <Drawer
      _css={inviteModalStyle}
      w="100%"
      bdRadius={`${pxToRem(24)} ${pxToRem(24)}  0 0`}
      placement="bottom"
      maskClosable={false}
      closable={false}
      footer={false}
      autoFocus={false}
      onCancel={onCancel}
      visible={visible}
      {...otherProps}
    >
      <CloseIcon
        css={closeIconStyle}
        onClick={onCloseClick}
        containerStyle={closeIconContainerStyle}
      />
      <div css={contentStyle}>
        <div css={tabTitleStyle}>
          {tabs.map((tab) => {
            const { id, label, disabled } = tab
            const isActive = id === activeTab
            return (
              <div
                key={tab.id}
                css={applyTabTitleItemStyle(isActive, disabled)}
                onClick={() => {
                  if (!disabled) {
                    onChangeTab(id)
                  }
                }}
              >
                {label}
              </div>
            )
          })}
        </div>
        {tabs[activeTab].content}
      </div>
    </Drawer>
  )
}

InviteModalMobile.displayName = "InviteModalMobile"

export default InviteModalMobile
