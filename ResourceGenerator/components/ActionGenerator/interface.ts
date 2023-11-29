import { ActionType, Agent } from "@illa-public/public-types"
import { HandleDirectCreateActionFunc } from "./ActionResourceSelector/interface"

export interface ActionGeneratorProps {
  visible?: boolean
  onClose: () => void
  defaultStep?: ActionCreatorPage
  defaultActionType?: ActionType | null
  canBackToSelect?: boolean
  handleDirectCreateAction: HandleDirectCreateActionFunc
  handleCreateAgentAction: (
    item: Agent,
    successCallback?: () => void,
    loadingCallback?: (loading: boolean) => void,
  ) => void
}

export type ActionCreatorPage =
  | "select"
  | "createAction"
  | "createResource"
  | "directCreateAction"
