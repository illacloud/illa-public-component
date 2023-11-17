import { TagControllerProps } from "../component/TagController/interface"

export interface ContributeAppConfig {
  appName: string
  appDesc?: string
  hashtags: string[]
  publishWithAIAgent: boolean
}

export interface ContributeAppProps extends TagControllerProps {
  onClose: () => void
  teamID: string
  onContributed: (isContributed: boolean) => void
  onAppPublic: (isPublic: boolean) => void
  onAppInfoUpdate: (appConfig: {
    appName: string
    appDesc?: string
    publishWithAIAgent: boolean
  }) => void
  appName: string
  appDesc?: string
}
