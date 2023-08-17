import { USER_ROLE } from "@illa-public/user-data"
import { FC } from "react"
import { Modal } from "@illa-design/react"
import { InviteModalProps } from "../interface"
import { InviteLink } from "./component/InviteLink"


export const InviteModalPC: FC<InviteModalProps> = (props) => {
  return (
    <Modal
      closable
      withoutLine={false}
      w="498px"
      onCancel={() => {
        props.onClose?.()
      }}
      footer={false}
      maskClosable={false}
      visible={true}
      title={<div>123123123</div>}
    >
      <InviteLink
        defaultInviteUserRole={USER_ROLE.EDITOR}
        defaultAllowInviteLink={props.defaultAllowInviteLink}
        onInviteLinkStateChange={props.onInviteLinkStateChange}
        redirectPage={props.redirectPage}
      />
    </Modal>
  )
}

InviteModalPC.displayName = "MemberListPC"

export default InviteModalPC