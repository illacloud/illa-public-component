import { BaseActionItem } from "@illa-public/public-types"
import { INIT_ACTION_ADVANCED_CONFIG, actionItemInitial } from ".."

export const generateBaseActionItem = (
  displayName: string,
  resourceID: string,
): BaseActionItem<unknown> => {
  return {
    displayName,
    resourceID,
    content: {},
    isVirtualResource: false,
    ...actionItemInitial,
    config: {
      public: false,
      advancedConfig: INIT_ACTION_ADVANCED_CONFIG,
    },
  }
}
