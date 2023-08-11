import { createContext } from "react"
import { SubscribeInfo, TotalTeamLicense } from "../interface"

interface MemberListContextTypeProps {
  currentTeamLicense: SubscribeInfo
  totalTeamLicense: TotalTeamLicense
  isCloudVersion?: boolean
}

export const MemberListContext = createContext<MemberListContextTypeProps>(
  {} as MemberListContextTypeProps,
)
