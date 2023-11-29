import { Params } from "../public/common"

export enum GraphQLAuthType {
  NONE = "none",
  BASIC = "basic",
  BEARER = "bearer",
  APIKEY = "API key",
}

export enum GraphQLAuthValue {
  NONE = "none",
  BASIC = "basic",
  BEARER = "bearer",
  APIKEY = "apiKey",
}

export type GraphQLAuth = GraphQLBasicAuth | GraphQLBearerAuth | ApiKeyAuth

export interface GraphQLBasicAuth {
  username: string
  password: string
}

export interface GraphQLBearerAuth {
  bearerToken: string
}

export interface ApiKeyAuth {
  key: string
  value: string
  addTo: APIKeyAddToValue
  headerPrefix: string
}

export enum APIKeyAddToType {
  HEADER = "Header",
  URLPARAMS = "URL Params",
}

export enum APIKeyAddToValue {
  HEADER = "header",
  URLPARAMS = "urlParams",
}

export interface GraphQLResource<T extends GraphQLAuth = GraphQLAuth> {
  baseUrl: string
  urlParams: Params[]
  headers: Params[]
  cookies: Params[]
  authentication: GraphQLAuthValue
  disableIntrospection: boolean
  authContent: T
}
