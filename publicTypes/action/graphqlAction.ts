import { Params } from ".."

export interface GraphQLAction {
  query: string
  variables: Params[]
  headers: Params[]
}
