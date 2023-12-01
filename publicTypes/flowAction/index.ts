import { ActionContent, ActionType, BaseActionItem } from "../action"

export type TFlowActionType = ActionType | ""

export interface FlowActionItem<T extends ActionContent = ActionContent>
  extends BaseActionItem<T> {
  flowActionType: ActionType
  flowActionID: string
}
