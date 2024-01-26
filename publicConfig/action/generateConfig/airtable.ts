import { AirtableActionMethodsType } from "@illa-public/public-types"
import {
  AirtableCreateRecordInitial,
  AirtableDeleteMultipleRecordInitial,
  AirtableDeleteRecordInitial,
  AirtableGetRecordInitial,
  AirtableListRecordInitial,
  AirtableUpdateMultipleRecordInitial,
  AirtableUpdateRecordInitial,
} from ".."

export const generateAirtableConfig = (
  actionType: AirtableActionMethodsType,
) => {
  switch (actionType) {
    case "list": {
      return AirtableListRecordInitial
    }
    case "get": {
      return AirtableGetRecordInitial
    }
    case "create": {
      return AirtableCreateRecordInitial
    }
    case "update": {
      return AirtableUpdateRecordInitial
    }
    case "bulkUpdate": {
      return AirtableUpdateMultipleRecordInitial
    }
    case "bulkDelete": {
      return AirtableDeleteMultipleRecordInitial
    }
    case "delete": {
      return AirtableDeleteRecordInitial
    }
  }
}
