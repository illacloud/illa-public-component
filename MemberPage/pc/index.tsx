import { FC } from "react"
import { Header } from "./components/Header"
import { PCMemberList } from "./components/List"

export const PCMemberPage: FC = () => {
  return (
    <div>
      <Header />
      <PCMemberList />
    </div>
  )
}

PCMemberPage.displayName = "MemberListPC"

export default PCMemberPage
