import { Params } from ".."

export type RestAPIBodyType =
  | "none"
  | "form-data"
  | "x-www-form-urlencoded"
  | "raw"
  | "binary"

export type RestAPIRawBodyType = "text" | "json" | "xml" | "javascript" | "html"

export interface RestAPIRawBody {
  type: RestAPIRawBodyType
  content: string
}

export type RestApiBodyContent = null | Params[] | string | RestAPIRawBody

export type RestApiMethod =
  | "GET"
  | "POST"
  | "PUT"
  | "DELETE"
  | "PATCH"
  | "HEAD"
  | "OPTIONS"

export interface RestApiAction<T extends RestApiBodyContent> {
  method: RestApiMethod
  url: string
  urlParams: Params[]
  headers: Params[]
  cookies: Params[]
  bodyType: RestAPIBodyType
  body: T
}
