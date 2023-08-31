import { LayoutAutoChange } from "@illa-public/layout-auto-change"
import { FC } from "react"
import { IMemberListPageProps } from "./interface"
import MobileMemberPage from "./mobile"
import PCMemberPage from "./pc"

export const MemberListPage: FC<IMemberListPageProps> = (props) => {
  return (
    <LayoutAutoChange
      desktopPage={<PCMemberPage afterLeaveTeam={props.afterLeaveTeam} />}
      mobilePage={<MobileMemberPage />}
    />
  )
}

MemberListPage.displayName = "MemberList"

export default MemberListPage
export { PCMemberList } from "./pc/components/List"
