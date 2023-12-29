import { USER_ROLE } from "@illa-public/public-types"
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
  let defTab = "public"

  if (
    props.canInvite &&
    isBiggerThanTargetRole(USER_ROLE.VIEWER, props.currentUserRole, false)
  ) {
    defTab = "edit"
  } else if (
    props.canInvite &&
    USER_ROLE.VIEWER === props.currentUserRole &&
    props.isDeployed
  ) {
    defTab = "use"
  } else if (
    props.canPublic &&
    (isBiggerThanTargetRole(USER_ROLE.VIEWER, props.currentUserRole) ||
      props.defaultAppContribute ||
      props.defaultAppPublic)
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
      enableOnFormTags={[]}
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
            isBiggerThanTargetRole(
              USER_ROLE.VIEWER,
              props.currentUserRole,
              false,
            ) && (
              <TabPane
                title={t("user_management.modal.title.invite_to_edit")}
                key="edit"
              />
            )}
          {props.canInvite && props.isDeployed && (
            <TabPane
              title={t("user_management.modal.title.invite_to_use")}
              key="use"
            />
          )}
          {props.canPublic &&
            (isBiggerThanTargetRole(
              USER_ROLE.VIEWER,
              props.userRoleForThisApp,
              false,
            ) ||
              props.defaultAppContribute ||
              props.defaultAppPublic) &&
            isCloudVersion && (
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
        {activeTab === "edit" && props.canInvite && (
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
            />
            <InviteByEmailPC
              itemID={props.appID}
              excludeUserRole={[USER_ROLE.VIEWER]}
              redirectURL={props.editRedirectURL}
              onBalanceChange={props.onBalanceChange}
              defaultInviteUserRole={USER_ROLE.EDITOR}
              teamID={props.teamID}
              currentUserRole={props.currentUserRole}
              defaultBalance={props.defaultBalance}
              onInvitedChange={props.onInvitedChange}
            />
          </>
        )}
        {activeTab === "use" && props.canInvite && (
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
            />
            <InviteByEmailPC
              itemID={props.appID}
              excludeUserRole={[]}
              redirectURL={props.useRedirectURL}
              onBalanceChange={props.onBalanceChange}
              defaultInviteUserRole={USER_ROLE.VIEWER}
              teamID={props.teamID}
              currentUserRole={props.currentUserRole}
              defaultBalance={props.defaultBalance}
              onInvitedChange={props.onInvitedChange}
            />
          </>
        )}
        {props.canPublic && activeTab === "public" && isCloudVersion && (
          <AppPublicPC
            appDesc={props.appDesc}
            appName={props.appName}
            onAppInfoUpdate={props.onAppInfoUpdate}
            title={props.title}
            hidePublic={false}
            canUseBillingFeature={props.canUseBillingFeature}
            defaultAppPublic={props.defaultAppPublic}
            defaultAppContribute={props.defaultAppContribute}
            defaultPublishWithAIAgent={props.defaultPublishWithAIAgent}
            appID={props.appID}
            userRoleForThisApp={props.userRoleForThisApp}
            ownerTeamIdentify={props.ownerTeamIdentify}
            onAppPublic={props.onAppPublic}
            onAppContribute={props.onAppContribute}
            onCopyPublicLink={props.onCopyPublicLink}
            onCopyContributeLink={props.onCopyContributeLink}
            ownerTeamID={props.ownerTeamID}
            onShare={props.onShare}
          />
        )}
      </div>
    </Modal>
  )
}

ShareAppPC.defaultProps = {
  canPublic: true,
}

ShareAppPC.displayName = "ShareAppPC"
