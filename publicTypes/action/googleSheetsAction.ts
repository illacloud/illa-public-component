import { Params } from ".."

export type GoogleSheetsActionType =
  | "read"
  | "append"
  | "update"
  | "bulkUpdate"
  | "delete"
  | "create"
  | "copy"
  | "list"
  | "get"

export interface GoogleSheetsActionGetOpts {
  spreadsheet: string
  fx: boolean
}

export interface GoogleSheetsActionCopyOpts {
  spreadsheet: string
  sheetName: string
  toSpreadsheet: string
  toSheet: string
  fx: boolean
  toFx: boolean
}

export interface GoogleSheetsActionCreateOpts {
  title: string
}

export interface GoogleSheetsActionDeleteOpts {
  spreadsheet: string
  sheetName: string
  rowIndex: string
  fx: boolean
}

export interface GoogleSheetsActionListOpts {}

export interface GoogleSheetsActionBulkOpts {
  spreadsheet: string
  sheetName: string
  primaryKey: string
  rowsArray: string
  fx: boolean
}

export interface GoogleSheetsActionAppendOpts {
  spreadsheet: string
  sheetName: string
  values: string
  fx: boolean
}

export type GoogleSheetsActionUpdateType = "a1" | "filter"

export interface GoogleSheetsActionUpdateOpts {
  spreadsheet: string
  sheetName: string
  filterType: GoogleSheetsActionUpdateType
  filters: Params[]
  a1Notation: string
  values: string
  fx: boolean
}

export type GoogleSheetsDataRangeType = "a1" | "limit"

export interface GoogleSheetsActionReadOpts {
  spreadsheet: string
  sheetName: string
  rangeType: GoogleSheetsDataRangeType
  limit: string
  offset: string
  a1Notation: string
  fx: boolean
}

export type GoogleSheetsActionOpts =
  | GoogleSheetsActionGetOpts
  | GoogleSheetsActionCopyOpts
  | GoogleSheetsActionCreateOpts
  | GoogleSheetsActionDeleteOpts
  | GoogleSheetsActionListOpts
  | GoogleSheetsActionBulkOpts
  | GoogleSheetsActionAppendOpts
  | GoogleSheetsActionUpdateOpts
  | GoogleSheetsActionReadOpts

export interface GoogleSheetsAction<T extends GoogleSheetsActionOpts> {
  method: GoogleSheetsActionType
  opts: T
}
