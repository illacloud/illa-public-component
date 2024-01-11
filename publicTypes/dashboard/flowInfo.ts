import { ActivityInfo, EditorInfo } from "./publicInfo"

export interface IFlowConfig {
  public: boolean
  description?: string
  publishedToMarketplace: boolean
  publishWithAIAgent: boolean
  publishWithApp: boolean
  cover: string
  flowNodes: null
  modified: boolean
}

export enum FLOW_ACTIVE_STATUS {
  ACTIVE = 1,
  INACTIVE = 2,
}

export enum FLOW_RUNNING_STATUS {
  SCHEDULING = 1,
  RUNNING = 2,
  STOPPED = 3,
  ERROR = 4,
}

export interface IFlowInfoShape {
  workflowID: string
  uid: string
  teamID: string
  workflowName: string
  active: FLOW_ACTIVE_STATUS
  runningStatus: FLOW_RUNNING_STATUS
  config: IFlowConfig
  updatedBy: string
  updatedAt: string
  deployed: boolean
  workflowActivity: ActivityInfo
  editedBy?: EditorInfo[]
  mainlineVersion?: number
  releaseVersion?: number
}
