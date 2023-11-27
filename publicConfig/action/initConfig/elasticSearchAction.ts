import {
  ElasticSearchAction,
  ElasticSearchActionRequestType,
} from "@illa-public/public-types"

export const ElasticSearchIDEditorType = [
  ElasticSearchActionRequestType.GET_ONE,
  ElasticSearchActionRequestType.UPDATE_ONE,
  ElasticSearchActionRequestType.DELETE_ONE,
]

export const ElasticSearchBodyContentType = [
  ElasticSearchActionRequestType.INSERT_ONE,
  ElasticSearchActionRequestType.UPDATE_ONE,
]

export const ElasticSearchQueryContentType = [
  ElasticSearchActionRequestType.SEARCH,
]

export const ElasticSearchActionInitial: ElasticSearchAction = {
  operation: ElasticSearchActionRequestType.SEARCH,
  index: "",
  query: "",
}
