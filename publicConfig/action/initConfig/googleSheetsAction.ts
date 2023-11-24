import {
  GoogleSheetsAction,
  GoogleSheetsActionAppendOpts,
  GoogleSheetsActionBulkOpts,
  GoogleSheetsActionCopyOpts,
  GoogleSheetsActionCreateOpts,
  GoogleSheetsActionDeleteOpts,
  GoogleSheetsActionGetOpts,
  GoogleSheetsActionListOpts,
  GoogleSheetsActionOpts,
  GoogleSheetsActionReadOpts,
  GoogleSheetsActionType,
  GoogleSheetsActionUpdateOpts,
} from "@illa-public/public-types"

export const GoogleSheetsActionGetOptsInitial: GoogleSheetsActionGetOpts = {
  spreadsheet: "",
  fx: false,
}

export const GoogleSheetsActionCopyOptsInitial: GoogleSheetsActionCopyOpts = {
  spreadsheet: "",
  sheetName: "",
  toSpreadsheet: "",
  toSheet: "",
  fx: false,
  toFx: false,
}

export const GoogleSheetsActionCreateOptsInitial: GoogleSheetsActionCreateOpts =
  {
    title: "",
  }

export const GoogleSheetsActionDeleteOptsInitial: GoogleSheetsActionDeleteOpts =
  {
    spreadsheet: "",
    sheetName: "",
    rowIndex: "",
    fx: false,
  }

export const GoogleSheetsActionListOptsInitial: GoogleSheetsActionListOpts = {}

export const GoogleSheetsActionBulkOptsInitial: GoogleSheetsActionBulkOpts = {
  spreadsheet: "",
  sheetName: "",
  primaryKey: "",
  rowsArray: "",
  fx: false,
}

export const GoogleSheetsActionAppendOptsInitial: GoogleSheetsActionAppendOpts =
  {
    spreadsheet: "",
    sheetName: "",
    values: "",
    fx: false,
  }

export const GoogleSheetsActionUpdateOptsInitial: GoogleSheetsActionUpdateOpts =
  {
    spreadsheet: "",
    sheetName: "",
    filterType: "filter",
    filters: [
      {
        key: "",
        value: "",
        operator: "=",
      },
    ],
    a1Notation: "",
    values: "",
    fx: false,
  }

export const GoogleSheetsActionReadOptsInitial: GoogleSheetsActionReadOpts = {
  spreadsheet: "",
  sheetName: "",
  rangeType: "limit",
  limit: "",
  offset: "",
  a1Notation: "",
  fx: false,
}

export const GoogleSheetsActionInitial: GoogleSheetsAction<GoogleSheetsActionOpts> =
  {
    method: "read",
    opts: GoogleSheetsActionReadOptsInitial,
  }

export const GoogleSheetsActionInitialMaps: Record<
  GoogleSheetsActionType,
  GoogleSheetsActionOpts
> = {
  list: GoogleSheetsActionListOptsInitial,
  read: GoogleSheetsActionReadOptsInitial,
  update: GoogleSheetsActionUpdateOptsInitial,
  append: GoogleSheetsActionAppendOptsInitial,
  bulkUpdate: GoogleSheetsActionBulkOptsInitial,
  delete: GoogleSheetsActionDeleteOptsInitial,
  create: GoogleSheetsActionCreateOptsInitial,
  copy: GoogleSheetsActionCopyOptsInitial,
  get: GoogleSheetsActionGetOptsInitial,
}

export const GoogleSheetDataTypeTransform = {
  limit: 0,
  offset: 0,
  rowIndex: 0,
  rowsArray: [{}],
  values: [{}],
}
