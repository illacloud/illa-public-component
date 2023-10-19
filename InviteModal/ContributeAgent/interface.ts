import { TagControllerProps } from "../component/TagController/interface"

export interface ContributeAgentProps extends TagControllerProps {
  onClose: () => void
  teamID: string
  onContributed: (isContributed: boolean) => void
}