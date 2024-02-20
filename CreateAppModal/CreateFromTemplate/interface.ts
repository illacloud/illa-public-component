import { ComponentTreeNode } from "@illa-public/public-types"
import { ReactNode } from "react"
import { BuildActionInfo } from "../interface"

export interface CreateFromTemplateProps {
  hiddenCreateBlank?: boolean
  handleCreateFromResource: (
    appInfo: ComponentTreeNode,
    actionsInfo: BuildActionInfo[],
  ) => Promise<void>
  handleForkApp: (appID: string, teamIdentifier?: string) => Promise<void>
  closeModal?: () => void
  prevContentNode?: ReactNode
}
