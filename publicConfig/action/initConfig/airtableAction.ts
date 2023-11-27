import {
  AirtableAction,
  AirtableActionConfigType,
  AirtableBaseConfig,
  AirtableCreateRecord,
  AirtableDeleteMultipleRecords,
  AirtableDeleteRecord,
  AirtableGetRecord,
  AirtableListRecord,
  AirtableUpdateMultipleRecords,
  AirtableUpdateRecord,
} from "@illa-public/public-types"

export const AirtableBaseConfigInitial: AirtableBaseConfig = {
  baseId: "",
  tableName: "",
}

export const AirtableListRecordInitial: AirtableListRecord = {
  cellFormat: "",
  fields: "",
  filterByFormula: "",
  maxRecords: "",
  offset: "",
  pageSize: "",
  sort: "",
  timeZone: "",
  userLocale: "",
  view: "",
}

export const AirtableGetRecordInitial: AirtableGetRecord = {
  recordID: "",
}

export const AirtableCreateRecordInitial: AirtableCreateRecord = {
  records: "", //object[],
}

export const AirtableUpdateMultipleRecordInitial: AirtableUpdateMultipleRecords =
  {
    records: "",
  }

export const AirtableUpdateRecordInitial: AirtableUpdateRecord = {
  recordID: "",
  record: "",
}

export const AirtableDeleteMultipleRecordInitial: AirtableDeleteMultipleRecords =
  {
    recordIDs: "",
  }

export const AirtableDeleteRecordInitial: AirtableDeleteRecord = {
  recordID: "",
}

export const AirtableActionConfigInitial: AirtableAction<AirtableActionConfigType> =
  {
    baseConfig: AirtableBaseConfigInitial,
    config: AirtableListRecordInitial,
    method: "list",
  }
