import { USER_ROLE } from "@illa-public/user-data"
import { isBiggerThanTargetRole } from "@illa-public/user-role-utils"
import { FC, useState } from "react"
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
  const [activeTab, setActiveTab] = useState<ShareAppPage>(
    isBiggerThanTargetRole(USER_ROLE.VIEWER, props.currentUserRole, false)
      ? "edit"
      : "use",
  )

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
          {props.canInvite && (
            <TabPane title={t("new_share.title.invite_to_edit")} key="edit" />
          )}
          <TabPane
            title={t("user_management.modal.title.invite_to_use")}
            key="use"
          />
          {isBiggerThanTargetRole(
            USER_ROLE.VIEWER,
            props.userRoleForThisApp,
            false,
          ) &&
            props.isDeployed && <TabPane title={t("user_management.modal.tab.public")} key="public" />}
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
              redirectUrl={props.redirectUrl}
              defaultBalance={props.defaultBalance}
              defaultInviteUserRole={USER_ROLE.EDITOR}
              defaultAllowInviteLink={props.defaultAllowInviteLink}
              teamID={props.teamID}
              currentUserRole={props.currentUserRole}
              onInviteLinkStateChange={props.onInviteLinkStateChange}
              onCopyInviteLink={props.onCopyEditInviteLink}
            />
            <InviteByEmailPC
              onBalanceChange={props.onBalanceChange}
              defaultInviteUserRole={USER_ROLE.EDITOR}
              teamID={props.teamID}
              currentUserRole={props.currentUserRole}
              defaultBalance={props.defaultBalance}
            />
          </>
        )}
        {activeTab === "use" && (
          <>
            <InviteLinkPC
              redirectUrl={props.redirectUrl}
              defaultBalance={props.defaultBalance}
              defaultInviteUserRole={USER_ROLE.VIEWER}
              defaultAllowInviteLink={props.defaultAllowInviteLink}
              teamID={props.teamID}
              currentUserRole={props.currentUserRole}
              onInviteLinkStateChange={props.onInviteLinkStateChange}
              onCopyInviteLink={props.onCopyUseInviteLink}
            />
            <InviteByEmailPC
              onBalanceChange={props.onBalanceChange}
              defaultInviteUserRole={USER_ROLE.VIEWER}
              teamID={props.teamID}
              currentUserRole={props.currentUserRole}
              defaultBalance={props.defaultBalance}
            />
          </>
        )}
        {activeTab === "public" && (
          <AppPublicPC
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
          />
        )}
      </div>
    </Modal>
  )
}

ShareAppPC.displayName = "ShareAppPC"
