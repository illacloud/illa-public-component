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
          // current only one reference to this component for builder_dashboard
          <InviteMemberModal from="builder_dashboard" {...memberModalProps} />,
          document.body,
        )}
    </div>
  )
}
