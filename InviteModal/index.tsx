import { LayoutAutoChange } from "@illa-public/layout-auto-change"
import { FC } from "react"
import { InviteModalProps } from "./interface"
import InviteModalMobile from "./mobile"
import { InviteModalPC } from "./pc"


export const InviteModal: FC<InviteModalProps> = (props) => {
  return (
    <LayoutAutoChange
      desktopPage={<InviteModalPC {...props} />}
      mobilePage={<InviteModalMobile {...props} />}
    />
  )
}

InviteModal.displayName = "InviteModal"

export default InviteModal