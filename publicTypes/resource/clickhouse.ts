export interface ClickhouseResource {
  host: string
  port: string | number
  databaseName: string
  username: string
  password: string
  ssl: ClickhouseSSL
}

export interface ClickhouseSSL {
  ssl: boolean
  selfSigned: boolean
  privateKey: string
  clientCert: string
  caCert: string
}
