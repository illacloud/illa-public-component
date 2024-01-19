import { ComponentTreeNode } from "@illa-public/public-types"
import { BuildActionInfo } from "../interface"

export interface CreateFromTemplateProps {
  hiddenCreateBlank?: boolean
  handleCreateBlankApp?: () => void
  handleCreateFromResource?: (
    appInfo: ComponentTreeNode,
    actionsInfo: BuildActionInfo[],
  ) => void
  handleForkApp: (appID: string, teamIdentifier?: string) => void
  handleOpenCreateFromResource: () => void
  closeModal?: () => void
}
