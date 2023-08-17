import { LayoutAutoChange } from "@illa-public/layout-auto-change"
import { FC } from "react"
import { InviteModalContext } from "./context"
import { InviteModalProps } from "./interface"
import InviteModalMobile from "./mobile"
import { InviteModalPC } from "./pc"


export const InviteModal: FC<InviteModalProps> = (props) => {
  return (
    <InviteModalContext.Provider
      value={{
        currentUserRole: props.currentUserRole,
        from: props.from,
        teamID: props.teamID,
      }}
    >
      <LayoutAutoChange
        desktopPage={<InviteModalPC {...props} />}
        mobilePage={<InviteModalMobile {...props} />}
      />
    </InviteModalContext.Provider>
  )
}

InviteModal.displayName = "InviteModal"

export default InviteModal