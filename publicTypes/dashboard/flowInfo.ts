import { ActivityInfo, EditorInfo } from "./publicInfo"

export interface IFlowConfig {
  public: boolean
  description?: string
  publishedToMarketplace: boolean
  publishWithAIAgent: boolean
  publishWithApp: boolean
  cover: string
  flowNodes: null
}

export interface IFlowInfoShape {
  workflowID: string
  uid: string
  teamID: string
  workflowName: string
  active: number // wait to enum
  runningStatus: number // wait to enum
  config: IFlowConfig
  updatedBy: string
  updatedAt: string
  deployed: boolean
  workflowActivity: ActivityInfo
  editedBy?: EditorInfo[]
}
