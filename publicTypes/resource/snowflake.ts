export type SnowflakeAuthenticationSelectType = "basic" | "key"

export interface SnowflakeBasicAuthenticationType {
  username: string
  password: string
}

export interface SnowflakeKeyAuthenticationType {
  username: string
  privateKey: string
}

export type SnowflakeAuthenticationType =
  | SnowflakeBasicAuthenticationType
  | SnowflakeKeyAuthenticationType

export interface SnowflakeResource<T extends SnowflakeAuthenticationType> {
  accountName: string
  warehouse: string
  database: string
  schema: string
  role: string
  authentication: SnowflakeAuthenticationSelectType
  authContent: T
}
