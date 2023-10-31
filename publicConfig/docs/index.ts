import { ACTION_TYPE_MAP_DOC_LINK } from "./resource"
import { WIDGET_TYPE_MAP_DOC_LINK } from "./widget"

export * from "./others"
export * from "./constants"

export const getDocLink = (docType: string, type: string = "") => {
  switch (docType) {
    case "widget": {
      return WIDGET_TYPE_MAP_DOC_LINK[type]
    }
    case "action": {
      return ACTION_TYPE_MAP_DOC_LINK[type]
    }
    default: {
      return undefined
    }
  }
}
