export interface MicrosoftSqlResource {
  host: string
  port: string
  databaseName: string
  username: string
  password: string
  ssl: MicrosoftSqlSSL
  connectionOpts: {
    key: string
    value: string
  }[]
}

export interface MicrosoftSqlSSL {
  ssl: boolean
  privateKey: string
  clientCert: string
  caCert: string
  verificationMode: "full" | "skip"
}
