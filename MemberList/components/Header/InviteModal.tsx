import { FC } from "react"
import { createPortal } from "react-dom"
import { InviteMemberModal } from "@/illa-public-component/MemberList/components/Header/InviteMemberModalContent"
import { InviteMemberModalProps } from "@/illa-public-component/MemberList/components/Header/interface"

export interface InviteModalProps extends InviteMemberModalProps {
  visible: boolean
}

export const InviteModal: FC<InviteModalProps> = (props) => {
  const { visible, ...memberModalProps } = props

  return (
    <div>
      {visible &&
        createPortal(
          <InviteMemberModal {...memberModalProps} />,
          document.body,
        )}
    </div>
  )
}
