import { ActionType, Agent } from "@illa-public/public-types"

export interface ActionGeneratorProps {
  visible?: boolean
  onClose: () => void
  defaultStep?: ActionCreatorPage
  defaultActionType?: ActionType | null
  canBackToSelect?: boolean
  handleDirectCreateAction: (
    resourceID: string,
    successCallback?: () => void,
    loadingCallback?: (loading: boolean) => void,
  ) => void
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
