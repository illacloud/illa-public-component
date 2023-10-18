import { TagControllerProps } from "../component/TagController/interface"

export interface ContributeAppConfig {
  appName: string
  appDesc?: string
  hashtags: string[]
}

export interface ContributeAppProps extends TagControllerProps {
  onClose: () => void
  teamID: string
  onContributed: (isContributed: boolean) => void
  onAppPublic: (isPublic: boolean) => void
  onAppInfoUpdate: (appName: string, appDesc?: string) => void
  appName: string
  appDesc?: string
}
