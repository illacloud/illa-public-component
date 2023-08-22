import { FC } from "react"
import { Header } from "./components/Header"
import { PCMemberList } from "./components/List"
import { memberListWrapperStyle } from "./style"

export const PCMemberPage: FC = () => {
  return (
    <div css={memberListWrapperStyle}>
      <Header />
      <PCMemberList />
    </div>
  )
}

PCMemberPage.displayName = "MemberListPC"

export default PCMemberPage
