import { USER_ROLE } from "@illa-public/user-data"
import { inviteByEmailResponse } from "../../interface"
import { InviteMemberByEmailProps } from "../Header/interface"

export interface InviteListItemProps
  extends inviteByEmailResponse,
    Pick<InviteListProps, "currentUserRole" | "changeMembersRole"> {}

export interface InviteListProps
  extends Pick<InviteMemberByEmailProps, "currentUserRole"> {
  inviteList?: inviteByEmailResponse[]
  changeMembersRole: (userID: string, userRole: USER_ROLE) => void
}
