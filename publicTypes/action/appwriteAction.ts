import { Params } from ".."

export type AppwriteActionMethodsType =
  | "create"
  | "get"
  | "update"
  | "delete"
  | "list"

export interface AppwriteDocumentOperations {
  collectionID: string
  documentID: string
  data: string
}

export interface AppwriteFilterParams extends Params {
  key: string
  operator: string
  value: string
}

export interface AppwriteListDocuments {
  collectionID: string
  filter: AppwriteFilterParams[]
  orderBy: Params[]
  limit: string
}

export type AppwriteActionTypes =
  | AppwriteDocumentOperations
  | AppwriteListDocuments

export interface AppwriteAction<T extends AppwriteActionTypes> {
  method: AppwriteActionMethodsType
  opts: T
}
