export type OracleConnectType = "SID" | "Service"
export interface OracleResource {
  ssl: boolean
  host: string
  port: string
  connectionType: OracleConnectType
  name: string
  password: string
  username: string
}
