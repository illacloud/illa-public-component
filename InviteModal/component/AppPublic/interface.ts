import { USER_ROLE } from "@illa-public/public-types"
import { ContributeAppProps } from "../../ContributeApp/interface"
import { ShareBlockProps } from "../ShareBlock/interface"

export interface AppPublicProps
  extends Pick<ShareBlockProps, "onShare" | "title">,
    Pick<ContributeAppProps, "appDesc" | "appName" | "onAppInfoUpdate"> {
  defaultAppPublic: boolean
  defaultAppContribute: boolean
  defaultPublishWithAIAgent: boolean
  canUseBillingFeature: boolean
  appID: string
  userRoleForThisApp: USER_ROLE
  ownerTeamID: string
  ownerTeamIdentify: string
  onAppPublic: (isPublic: boolean) => void
  onAppContribute: (isContributed: boolean) => void
  onCopyPublicLink: (inviteLink: string) => void
  onCopyContributeLink: (inviteLink: string) => void
  hidePublic: boolean
}

export interface AppHashtagDetail {
  id: string
  unitType: number
  serial: number
  hashtagID: string
  hashtagName: string
  hashtagAmount: number
}

export interface AppRecommendHashtagResponse {
  hashtags: AppHashtagDetail[]
}
