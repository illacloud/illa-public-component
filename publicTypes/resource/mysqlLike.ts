export interface DbSSL {
  ssl: boolean
  serverCert: string
  clientKey: string
  clientCert: string
}

export interface MysqlLikeResource {
  host: string
  port: string
  databaseName: string
  databaseUsername: string
  databasePassword: string
  ssl: DbSSL
}
