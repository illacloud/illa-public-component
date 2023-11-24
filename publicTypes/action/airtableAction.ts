export type AirtableActionMethodsType =
  | "list"
  | "get"
  | "create"
  | "update"
  | "bulkUpdate"
  | "bulkDelete"
  | "delete"

export type AirtableActionConfigType =
  | AirtableListRecord
  | AirtableGetRecord
  | AirtableCreateRecord
  | AirtableUpdateMultipleRecords
  | AirtableUpdateRecord
  | AirtableDeleteMultipleRecords
  | AirtableDeleteRecord

export interface AirtableBaseConfig {
  baseId: string
  tableName: string
}

export interface AirtableListSort {
  field: string
  direction: string
}

export interface AirtableListRecord {
  fields: string //string[]
  filterByFormula: string
  maxRecords: string // number
  pageSize: string // number
  sort: string // object[]
  view: string
  cellFormat: string
  timeZone: string
  userLocale: string
  offset: string
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

export interface AirtableGetRecord {
  recordID: string
}

export interface AirtableCreateRecord {
  records: string //object[]
}

export interface AirtableUpdateMultipleRecords {
  records: "" //object[]
}

export interface AirtableUpdateRecord {
  recordID: string
  record: string
}

export interface AirtableDeleteMultipleRecords {
  recordIDs: string //string[]
}

export interface AirtableDeleteRecord {
  recordID: string
}

export interface AirtableAction<T extends AirtableActionConfigType> {
  method: AirtableActionMethodsType
  baseConfig: AirtableBaseConfig
  config: T
}
