import { USER_ROLE } from "@illa-public/user-data"
import { FC } from "react"
import { Modal } from "@illa-design/react"
import { InviteModalProps } from "../interface"
import { InviteByEmail } from "./component/InviteByEmail"
import { InviteLink } from "./component/InviteLink"

export const InviteModalPC: FC<InviteModalProps> = (props) => {
  return (
    <Modal
      withoutLine={false}
      w="498px"
      onCancel={() => {
        props.onClose?.()
      }}
      footer={false}
      maskClosable={false}
      visible={true}
    >
      <InviteLink
        defaultInviteUserRole={USER_ROLE.EDITOR}
        defaultAllowInviteLink={props.defaultAllowInviteLink}
        onInviteLinkStateChange={props.onInviteLinkStateChange}
        redirectPage={props.redirectPage}
      />
      <div
        style={{
          height: "16px",
        }}
      />
      <InviteByEmail defaultInviteUserRole={USER_ROLE.EDITOR} />
    </Modal>
  )
}

InviteModalPC.displayName = "MemberListPC"

export default InviteModalPC
