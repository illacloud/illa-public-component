import { ActionType, ResourceType } from "@illa-public/public-types"
import { ActionCreatorPage } from "../interface"

export type HandleDirectCreateActionFunc = (
  actionType: ActionType,
  resourceID: string,
  successCallback?: () => void,
  loadingCallback?: (loading: boolean) => void,
) => void

export interface ActionResourceSelectorProps {
  actionType: ActionType
  canBack?: boolean
  onBack: (page: ActionCreatorPage) => void
  handleCreateAction: HandleDirectCreateActionFunc
  onCreateResource: (resourceType: ResourceType) => void
  onCreateAction: (actionType: ActionType, resourceID?: string) => void
}
