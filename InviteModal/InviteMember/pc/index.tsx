import { FC } from "react"
import { useTranslation } from "react-i18next"
import { CloseIcon, Modal, TabPane, Tabs } from "@illa-design/react"
import { InviteByEmailPC } from "../../component/InviteByEmail/pc"
import { InviteLinkPC } from "../../component/InviteLink/pc"
import { InviteMemberProps } from "../interface"
import {
  closeIconStyle,
  contentContainerStyle,
  headerContainerStyle,
} from "./style"

export const InviteMemberPC: FC<InviteMemberProps> = (props) => {
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
        <Tabs variant="text" colorScheme="grayBlue" withoutBorderLine>
          <TabPane
            title={t("user_management.modal.title.invite_members")}
            key={t("user_management.modal.title.invite_members")}
          />
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
        <InviteLinkPC
          redirectUrl={props.redirectUrl}
          defaultInviteUserRole={props.defaultInviteUserRole}
          defaultAllowInviteLink={props.defaultAllowInviteLink}
          teamID={props.teamID}
          currentUserRole={props.currentUserRole}
          onInviteLinkStateChange={props.onInviteLinkStateChange}
          onCopyInviteLink={props.onCopyInviteLink}
          defaultBalance={props.defaultBalance}
        />
        <InviteByEmailPC
          redirectUrl={props.redirectUrl}
          defaultInviteUserRole={props.defaultInviteUserRole}
          teamID={props.teamID}
          currentUserRole={props.currentUserRole}
          defaultBalance={props.defaultBalance}
          onBalanceChange={props.onBalanceChange}
        />
      </div>
    </Modal>
  )
}

InviteMemberPC.displayName = "InviteMemberPC"
