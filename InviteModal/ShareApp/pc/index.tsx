import { USER_ROLE } from "@illa-public/user-data"
import { isBiggerThanTargetRole } from "@illa-public/user-role-utils"
import { isCloudVersion } from "@illa-public/utils"
import { FC, useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { CloseIcon, Modal, TabPane, Tabs } from "@illa-design/react"
import { AppPublicPC } from "../../component/AppPublic/pc"
import { InviteByEmailPC } from "../../component/InviteByEmail/pc"
import { InviteLinkPC } from "../../component/InviteLink/pc"
import { ShareAppPage, ShareAppProps } from "../interface"
import {
  closeIconStyle,
  contentContainerStyle,
  headerContainerStyle,
} from "./style"

export const ShareAppPC: FC<ShareAppProps> = (props) => {
  let defTab = "use"

  if (
    props.canInvite &&
    isBiggerThanTargetRole(USER_ROLE.VIEWER, props.currentUserRole, false)
  ) {
    defTab = "edit"
  } else if (props.canInvite && USER_ROLE.VIEWER === props.currentUserRole) {
    defTab = "use"
  } else if (
    isBiggerThanTargetRole(USER_ROLE.VIEWER, props.currentUserRole) ||
    props.defaultAppContribute ||
    props.defaultAppPublic
  ) {
    defTab = "public"
  }

  const [activeTab, setActiveTab] = useState(props.defaultTab ?? defTab)

  useEffect(() => {
    if (props.defaultTab === undefined) {
      return
    } else {
      setActiveTab(props.defaultTab)
    }
  }, [props.defaultTab])

  const { t } = useTranslation()

  return (
    <Modal
      withoutLine={false}
      withoutPadding
      w="498px"
      onCancel={() => {
        props.onClose?.()
      }}
      footer={false}
      maskClosable={false}
      visible={true}
    >
      <div css={headerContainerStyle}>
        <Tabs
          activeKey={activeTab}
          variant="text"
          colorScheme="grayBlue"
          withoutBorderLine
          onChange={(activeKey) => {
            setActiveTab(activeKey as ShareAppPage)
          }}
        >
          {props.canInvite &&
            props.canUseBillingFeature &&
            isBiggerThanTargetRole(
              USER_ROLE.VIEWER,
              props.currentUserRole,
              false,
            ) && (
              <TabPane title={t("new_share.title.invite_to_edit")} key="edit" />
            )}
          {props.canInvite && props.canUseBillingFeature && (
            <TabPane
              title={t("user_management.modal.title.invite_to_use")}
              key="use"
            />
          )}
          {(isBiggerThanTargetRole(
            USER_ROLE.VIEWER,
            props.userRoleForThisApp,
            false,
          ) ||
            props.defaultAppContribute ||
            props.defaultAppPublic) && (
            <TabPane
              title={t("user_management.modal.tab.public")}
              key="public"
            />
          )}
        </Tabs>
        <div
          css={closeIconStyle}
          onClick={() => {
            props.onClose?.()
          }}
        >
          <CloseIcon />
        </div>
      </div>
      <div css={contentContainerStyle}>
        {activeTab === "edit" &&
          props.canInvite &&
          props.canUseBillingFeature && (
            <>
              <InviteLinkPC
                excludeUserRole={[USER_ROLE.VIEWER]}
                redirectURL={props.editRedirectURL}
                defaultBalance={props.defaultBalance}
                defaultInviteUserRole={USER_ROLE.EDITOR}
                defaultAllowInviteLink={props.defaultAllowInviteLink}
                teamID={props.teamID}
                currentUserRole={props.currentUserRole}
                onInviteLinkStateChange={props.onInviteLinkStateChange}
                onCopyInviteLink={props.onCopyEditInviteLink}
                hasPaymentManagementPermission={
                  props.hasPaymentManagementPermission
                }
              />
              <InviteByEmailPC
                excludeUserRole={[USER_ROLE.VIEWER]}
                redirectURL={props.editRedirectURL}
                onBalanceChange={props.onBalanceChange}
                defaultInviteUserRole={USER_ROLE.EDITOR}
                teamID={props.teamID}
                currentUserRole={props.currentUserRole}
                defaultBalance={props.defaultBalance}
                hasPaymentManagementPermission={
                  props.hasPaymentManagementPermission
                }
              />
            </>
          )}
        {activeTab === "use" &&
          props.canInvite &&
          props.canUseBillingFeature && (
            <>
              <InviteLinkPC
                excludeUserRole={[]}
                redirectURL={props.useRedirectURL}
                defaultBalance={props.defaultBalance}
                defaultInviteUserRole={USER_ROLE.VIEWER}
                defaultAllowInviteLink={props.defaultAllowInviteLink}
                teamID={props.teamID}
                currentUserRole={props.currentUserRole}
                onInviteLinkStateChange={props.onInviteLinkStateChange}
                onCopyInviteLink={props.onCopyUseInviteLink}
                hasPaymentManagementPermission={
                  props.hasPaymentManagementPermission
                }
              />
              <InviteByEmailPC
                excludeUserRole={[]}
                redirectURL={props.useRedirectURL}
                onBalanceChange={props.onBalanceChange}
                defaultInviteUserRole={USER_ROLE.VIEWER}
                teamID={props.teamID}
                currentUserRole={props.currentUserRole}
                defaultBalance={props.defaultBalance}
                hasPaymentManagementPermission={
                  props.hasPaymentManagementPermission
                }
              />
            </>
          )}
        {activeTab === "public" && isCloudVersion && (
          <AppPublicPC
            canUseBillingFeature={props.canUseBillingFeature}
            defaultAppPublic={props.defaultAppPublic}
            defaultAppContribute={props.defaultAppContribute}
            appID={props.appID}
            userRoleForThisApp={props.userRoleForThisApp}
            ownerTeamIdentify={props.ownerTeamIdentify}
            onAppPublic={props.onAppPublic}
            onAppContribute={props.onAppContribute}
            onCopyPublicLink={props.onCopyPublicLink}
            onCopyContributeLink={props.onCopyContributeLink}
            ownerTeamID={props.ownerTeamID}
            hasPaymentManagementPermission={
              props.hasPaymentManagementPermission
            }
          />
        )}
      </div>
    </Modal>
  )
}

ShareAppPC.displayName = "ShareAppPC"
