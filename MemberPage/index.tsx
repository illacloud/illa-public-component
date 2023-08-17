import { LayoutAutoChange } from "@illa-public/layout-auto-change"
import { FC } from "react"
import { MemberListProps } from "./interface"
import MemberListMobile from "./mobile"
import MemberListPC from "./pc"

export const MemberList: FC<MemberListProps> = () => {
  return (
    <LayoutAutoChange
      desktopPage={<MemberListPC />}
      mobilePage={<MemberListMobile />}
    />
  )
}

MemberList.displayName = "MemberList"

export default MemberList
export { PCMemberList } from "./pc/components/List"
export { MobileMemberListItem } from "./mobile/ListItem"
