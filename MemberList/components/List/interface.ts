import { MemberListProps } from "@/illa-public-component/MemberList/interface"

export interface NameSpaceProps {
  name: string
  avatar: string
  email: string
}

export interface ListProps
  extends Pick<MemberListProps, "userListData" | "removeTeamMembers"> {}
