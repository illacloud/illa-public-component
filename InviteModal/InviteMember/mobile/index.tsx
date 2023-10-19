import { FC } from "react"
import { CloseIcon, Divider, Drawer, TriggerProvider } from "@illa-design/react"
import { InviteByEmailMobile } from "../../component/InviteByEmail/mobile"
import { InviteLinkMobile } from "../../component/InviteLink/mobile"
import { InviteMemberProps } from "../interface"
import {
  closeIconContainerStyle,
  dividerStyle,
  inviteHeaderContainerStyle,
  inviteModalStyle,
} from "./style"

export const InviteMemberMobile: FC<InviteMemberProps> = (props) => {
  const { onClose } = props

  return (
    <TriggerProvider renderInBody zIndex={1005}>
      <Drawer
        _css={inviteModalStyle}
        w="100%"
        placement="bottom"
        maskClosable={false}
        closable={false}
        footer={false}
        onCancel={onClose}
        visible={true}
      >
        <div css={inviteHeaderContainerStyle}>
          <div
            css={closeIconContainerStyle}
            onClick={() => {
              props.onClose?.()
            }}
          >
            <CloseIcon size="12" />
          </div>
        </div>
        <div>
          <InviteLinkMobile
            excludeUserRole={[]}
            redirectURL={props.redirectURL}
            defaultInviteUserRole={props.defaultInviteUserRole}
            defaultAllowInviteLink={props.defaultAllowInviteLink}
            teamID={props.teamID}
            currentUserRole={props.currentUserRole}
            onInviteLinkStateChange={props.onInviteLinkStateChange}
            onCopyInviteLink={props.onCopyInviteLink}
            defaultBalance={props.defaultBalance}
          />
          <Divider _css={dividerStyle} />
          <InviteByEmailMobile
            itemID={props.itemID}
            onInvitedChange={props.onInvitedChange}
            excludeUserRole={[]}
            redirectURL={props.redirectURL}
            defaultInviteUserRole={props.defaultInviteUserRole}
            teamID={props.teamID}
            currentUserRole={props.currentUserRole}
            defaultBalance={props.defaultBalance}
            onBalanceChange={props.onBalanceChange}
          />
        </div>
      </Drawer>
    </TriggerProvider>
  )
}
InviteMemberMobile.displayName = "InviteMemberMobile"