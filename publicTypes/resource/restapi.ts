import { Params } from "../public/common"

export type RestApiAuth =
  | NoneAuth
  | RestAPIBasicAuth
  | RestAPIBearerAuth
  | DigestAuth

export interface NoneAuth {}

export interface RestAPIBasicAuth {
  username: string
  password: string
}

export interface RestAPIBearerAuth {
  token: string
}

export interface DigestAuth {
  username: string
  password: string
}

export type RestApiAuthType = "none" | "basic" | "bearer" | "digest"

export type VerifyMode = "verify-full" | "verify-ca" | "skip"

export interface RestApiResource<T extends RestApiAuth> {
  baseUrl: string
  urlParams: Params[]
  headers: Params[]
  cookies: Params[]
  authentication: RestApiAuthType
  selfSignedCert: boolean
  certs: {
    caCert: string
    clientKey: string
    clientCert: string
    mode: VerifyMode
  }
  authContent: T
}
