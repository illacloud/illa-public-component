export type CouchDBActionMethods =
  | "listRecords"
  | "retrieveRecord"
  | "createRecord"
  | "updateRecord"
  | "deleteRecord"
  | "find"
  | "getView"

export interface CouchDBListRecords {
  includeDocs: boolean
  descendingOrder: boolean
  limit: string
  skip: string
}

export interface CouchDBRetrieveRecord {
  _id: string
}

export interface CouchDBCreateRecord {
  record: string
}

export interface CouchDBUpdateRecord {
  _id: string
  _rev: string
  record: string
}

export interface CouchDBDeleteRecord {
  _id: string
  _rev: string
}

export interface CouchDBFindRecord {
  mangoQuery: string
}

export interface CouchDBGetView {
  viewurl: string
  startkey: string
  endkey: string
  skip: string
  limit: string
  includeDocs: boolean
}

export type CouchDBOptionsType =
  | CouchDBGetView
  | CouchDBFindRecord
  | CouchDBDeleteRecord
  | CouchDBUpdateRecord
  | CouchDBCreateRecord
  | CouchDBRetrieveRecord
  | CouchDBListRecords

export interface CouchDBAction<T extends CouchDBOptionsType> {
  method: CouchDBActionMethods
  database: string
  opts: T
}
