import { ComponentTreeNode } from "@illa-public/public-types"
import { BuildActionInfo } from "../interface"

export interface CreateFromTemplateProps {
  visible?: boolean
  hiddenCreateBlank?: boolean
  handleCreateBlankApp?: () => void
  handleCreateFromResource?: (
    appInfo: ComponentTreeNode,
    actionsInfo: BuildActionInfo[],
  ) => void
  handleForkApp: (appID: string, teamIdentifier?: string) => void
  closeModal?: () => void
  afterClose?: () => void
}
