import { TagControllerProps } from "../component/TagController/interface"

export interface ContributeAppProps extends TagControllerProps {
  onClose: () => void
  teamID: string
  onContributed: (isContributed: boolean) => void
  onAppInfoUpdate: (appName: string, appDesc: string) => void
  appName: string
  appDesc: string
}