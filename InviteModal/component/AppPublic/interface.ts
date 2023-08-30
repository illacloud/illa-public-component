import { USER_ROLE } from "@illa-public/user-data"
import { ShareBlockProps } from "../ShareBlock/interface"

export interface AppPublicProps
  extends Pick<ShareBlockProps, "onShare" | "title"> {
  defaultAppPublic: boolean
  defaultAppContribute: boolean
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
