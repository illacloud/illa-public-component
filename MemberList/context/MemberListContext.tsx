import { createContext } from "react"
import { SubscribeInfo } from "@/illa-public-component/MemberList/interface"

interface MemberListContextTypeProps {
  currentTeamLicense: SubscribeInfo
}

export const MemberListContext = createContext<MemberListContextTypeProps>(
  {} as MemberListContextTypeProps,
)
