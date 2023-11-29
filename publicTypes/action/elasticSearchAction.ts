export enum ElasticSearchActionType {
  SEARCH = "search",
  GET_ONE = "get a document",
  INSERT_ONE = "insert a document",
  UPDATE_ONE = "update a document",
  DELETE_ONE = "delete a document",
}

export enum ElasticSearchActionRequestType {
  SEARCH = "search",
  GET_ONE = "get",
  INSERT_ONE = "insert",
  UPDATE_ONE = "update",
  DELETE_ONE = "delete",
}

export interface ElasticSearchAction {
  operation: ElasticSearchActionRequestType
  index: string
  query?: string
  body?: string
  id?: string
}
