import { FC } from "react"
import { Header } from "@/illa-public-component/MemberList/components/Header"
import { List } from "@/illa-public-component/MemberList/components/List"
import { MemberListProps } from "@/illa-public-component/MemberList/interface"
import { MemberListWrapperStyle } from "@/illa-public-component/MemberList/style"

export const MemberList: FC<MemberListProps> = (props) => {
  const {
    currentUserRole,
    allowEditorOrViewerInvite,
    updateTeamPermissionConfig,
  } = props
  return (
    <div css={MemberListWrapperStyle}>
      <Header />
      <List />
    </div>
  )
}
