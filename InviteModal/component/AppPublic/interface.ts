export interface AppPublicProps {
  defaultAppPublic: boolean
  defaultAppContribute: boolean
  appID: string
  teamIdentify: string
  onAppPublic: (isPublic: boolean) => void
  onAppContribute: (isContributed: boolean) => void
  onCopyPublicLink: (inviteLink: string) => void
  onCopyContributeLink: (inviteLink: string) => void
}
