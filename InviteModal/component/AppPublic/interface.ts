import { USER_ROLE } from "@illa-public/user-data"

export interface AppPublicProps {
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
}