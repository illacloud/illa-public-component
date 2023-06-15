import { createContext } from "react"
import {
  SubscribeInfo,
  TotalLicenseInfo,
} from "@/illa-public-component/MemberList/interface"

interface MemberListContextTypeProps {
  currentTeamLicense: SubscribeInfo
  totalLicenseInfo: TotalLicenseInfo
}

export const MemberListContext = createContext<MemberListContextTypeProps>(
  {} as MemberListContextTypeProps,
)
