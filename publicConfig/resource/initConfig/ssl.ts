import {
  ClickhouseSSL,
  DbSSL,
  MicrosoftSqlSSL,
  ResourceType,
} from "@illa-public/public-types"
import { ClickhouseSSLInitial } from "./clickhouse"
import { MicrosoftSqlSSLInitial } from "./microsoftSql"

type AllSSLConfigType = DbSSL | ClickhouseSSL | MicrosoftSqlSSL

const SSLConfigDefaultValue: Record<string, AllSSLConfigType> = {
  mssql: MicrosoftSqlSSLInitial,
  clickhouse: ClickhouseSSLInitial,
}

const getSSLConfig = (
  data: { [p: string]: any },
  type?: ResourceType,
): AllSSLConfigType => {
  switch (type) {
    case "mssql":
      return {
        ssl: true,
        privateKey: data.privateKey,
        clientCert: data.clientCert,
        caCert: data.caCert,
        verificationMode: !!data.caCert ? "full" : "skip",
      } as MicrosoftSqlSSL
    case "clickhouse":
      return {
        ssl: true,
        selfSigned: data.selfSigned,
        privateKey: data.privateKey,
        clientCert: data.clientCert,
        caCert: data.caCert,
      } as ClickhouseSSL
    default:
      return {
        ssl: true,
        clientKey: data.clientKey,
        clientCert: data.clientCert,
        serverCert: data.serverCert,
      } as DbSSL
  }
}

const DbSSLInitial: DbSSL = {
  ssl: false,
  clientKey: "",
  clientCert: "",
  serverCert: "",
}

export function generateSSLConfig(
  open: boolean,
  data: { [p: string]: any },
  type?: ResourceType,
): DbSSL | ClickhouseSSL | MicrosoftSqlSSL {
  return open
    ? getSSLConfig(data, type)
    : SSLConfigDefaultValue[type || ""] || DbSSLInitial
}
