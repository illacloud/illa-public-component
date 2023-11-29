import {
  CouchDBAction,
  CouchDBCreateRecord,
  CouchDBDeleteRecord,
  CouchDBFindRecord,
  CouchDBGetView,
  CouchDBListRecords,
  CouchDBOptionsType,
  CouchDBRetrieveRecord,
  CouchDBUpdateRecord,
} from "@illa-public/public-types"

export const CouchDBListRecordsInitial: CouchDBListRecords = {
  includeDocs: false,
  descendingOrder: true,
  limit: "{{1000}}",
  skip: "{{0}}",
}

export const CouchDBRetrieveRecordInitial: CouchDBRetrieveRecord = {
  _id: "",
}

export const CouchDBCreateRecordInitial: CouchDBCreateRecord = {
  record: "",
}

export const CouchDBUpdateRecordInitial: CouchDBUpdateRecord = {
  _id: "",
  _rev: "",
  record: "",
}

export const CouchDBDeleteRecordInitial: CouchDBDeleteRecord = {
  _id: "",
  _rev: "",
}

export const CouchDBFindRecordInitial: CouchDBFindRecord = {
  mangoQuery: "",
}

export const CouchDBGetViewInitial: CouchDBGetView = {
  viewurl: "",
  startkey: "",
  endkey: "",
  skip: "{{0}}",
  limit: "{{1000}}",
  includeDocs: false,
}

export const CouchDBActionInitial: CouchDBAction<CouchDBOptionsType> = {
  method: "listRecords",
  database: "",
  opts: CouchDBListRecordsInitial,
}

export const CouchDBActionStructParamsDataTransferType: Record<
  string,
  object | number
> = {
  record: {},
  mangoQuery: {},
  limit: 1000,
  skip: 0,
}
