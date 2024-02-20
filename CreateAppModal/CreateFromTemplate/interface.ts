import { APP_TYPE, ComponentTreeNode } from "@illa-public/public-types"
import { BuildActionInfo } from "../interface"

export interface CreateFromTemplateProps {
  hiddenCreateBlank?: boolean
  handleCreateBlankApp: (appType: APP_TYPE) => Promise<void>
  handleOpenCreateFromResource: () => void
  handleCreateFromResource: (
    appInfo: ComponentTreeNode,
    actionsInfo: BuildActionInfo[],
  ) => Promise<void>
  handleForkApp: (appID: string, teamIdentifier?: string) => Promise<void>
  closeModal?: () => void
}
