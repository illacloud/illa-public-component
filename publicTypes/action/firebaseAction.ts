export enum FirebaseServiceTypeValue {
  AUTH = "auth",
  FIRESTORE = "firestore",
  REALTIME = "database",
}

export enum FirebaseAuthActionTypeValue {
  GET_USER_BY_UID = "uid",
  GET_USER_BY_EMAIL = "email",
  GET_USER_BY_PHONE = "phone",
  CREATE_ONE_USER = "create",
  UPDATE_ONE_USER = "update",
  DELETE_ONE_USER = "delete",
  LIST_USERS = "list",
}

export enum FirebaseStoreActionTypeValue {
  QUERY_FIREBASE = "query_fs",
  INSERT_DOCUMENT = "insert_doc",
  UPDATE_DOCUMENT = "update_doc",
  GET_DOCUMENT_BY_ID = "get_doc",
  DELETE_ONE_DOCUMENT = "delete_doc",
  GET_COLLECTIONS = "get_colls",
  QUERY_COLLECTION_GROUP = "query_coll",
}

export enum FirebaseRealtimeActionTypeValue {
  QUERY_DATABASE = "query",
  SET_DATA = "set",
  UPDATE_DATA = "update",
  APPEND_DATA_TO_LIST = "append",
}

export interface FirebaseGetUserByID {
  filter: string
}

export interface FirebaseGetUserByEmail {
  filter: string
}

export interface FirebaseGetUserByPhone {
  filter: string
}

export interface FirebaseDeleteOneUser {
  filter: string
}

export interface FirebaseCreateUser {
  object: string
}

export interface FirebaseUpdateOneUser {
  uid: string
  object: string
}

export interface FirebaseListUsers {
  number: string
  token: string
}

export interface FirebaseWhere {
  field: string
  condition: string
  value: string
}

export interface FirebaseCheckboxParams {
  trigger: boolean
  value: string
}

export interface FirestoreQuery {
  collection: string
  collectionType: string
  where: FirebaseWhere[]
  limit: string
  orderBy: string
  orderDirection: string
  startAt: FirebaseCheckboxParams
  endAt: FirebaseCheckboxParams
}

export type QueryFirebase = FirestoreQuery

export enum FirebaseCollectionType {
  DROPDOWN = "select",
  RAW = "input",
}

export interface FirebaseDocumentOperation {
  collection: string
  collectionType: string
  id: string
  value: string
}

export type FirebaseInsertDocument = FirebaseDocumentOperation

export type FirebaseUpdateDocument = FirebaseDocumentOperation

export type FirebaseGetDocumentByID = Omit<FirebaseDocumentOperation, "value">

export type FirebaseDeleteDocument = Omit<FirebaseDocumentOperation, "value">

export interface FirebaseGetCollections {
  parent: string
}

export type FirebaseQueryCollectionGroup = FirestoreQuery

export interface FirebaseDatabase {
  ref: string
  object: string
}

export type FirebaseQueryDatabase = Pick<FirebaseDatabase, "ref">

export type FirebaseSetData = FirebaseDatabase

export type FirebaseUpdateData = FirebaseDatabase

export type FirebaseAppendDataToList = FirebaseDatabase

export type FirebaseActionTypeValue =
  | FirebaseAuthActionTypeValue
  | FirebaseStoreActionTypeValue
  | FirebaseRealtimeActionTypeValue

export type FirebaseContentType =
  | FirebaseGetUserByID
  | FirebaseGetUserByEmail
  | FirebaseGetUserByPhone
  | FirebaseCreateUser
  | FirebaseUpdateOneUser
  | FirebaseDeleteOneUser
  | FirebaseListUsers
  | QueryFirebase
  | FirebaseInsertDocument
  | FirebaseUpdateDocument
  | FirebaseGetDocumentByID
  | FirebaseDeleteDocument
  | FirebaseGetCollections
  | FirebaseQueryCollectionGroup
  | FirebaseQueryDatabase
  | FirebaseSetData
  | FirebaseUpdateData
  | FirebaseAppendDataToList

export interface FirebaseAction<T extends FirebaseContentType> {
  service: FirebaseServiceTypeValue
  operation: FirebaseActionTypeValue | string
  options: T
}
