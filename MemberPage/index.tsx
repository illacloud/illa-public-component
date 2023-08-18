import { LayoutAutoChange } from "@illa-public/layout-auto-change"
import { FC } from "react"
import MobileMemberPage from "./mobile"
import PCMemberPage from "./pc"

export const MemberListPage: FC = () => {
  return (
    <LayoutAutoChange
      desktopPage={<PCMemberPage />}
      mobilePage={<MobileMemberPage />}
    />
  )
}

MemberListPage.displayName = "MemberList"

export default MemberListPage
export { PCMemberList } from "./pc/components/List"
export { MobileMemberListItem } from "./mobile/ListItem"
