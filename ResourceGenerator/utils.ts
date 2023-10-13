import {
  GraphQLAuth,
  GraphQLAuthValue,
  ResourceType,
  RestApiAuth,
} from "@illa-public/public-types"
import { FieldValues } from "react-hook-form"
import { DATABASE_INDEX, DEFAULT_NAME } from "./ResourceDefaultConfig/upstash"
import { DbSSLInitial, generateSSLConfig } from "./utils/ssl"

export function getResourceNameFromResourceType(
  resourceType: ResourceType | null | undefined,
): string {
  if (resourceType) {
    switch (resourceType) {
      case "supabasedb":
        return "Supabase DB"
      case "mysql":
        return "MySQL"
      case "mssql":
        return "Microsoft SQL"
      case "oracle":
        return "Oracle DB"
      case "restapi":
        return "REST API"
      case "graphql":
        return "GraphQL"
      case "mongodb":
        return "MongoDB"
      case "redis":
        return "Redis"
      case "upstash":
        return "Upstash"
      case "elasticsearch":
        return "Elastic Search"
      case "dynamodb":
        return "DynamoDB"
      case "snowflake":
        return "Snowflake"
      case "postgresql":
        return "PostgreSQL"
      case "hydra":
        return "Hydra"
      case "mariadb":
        return "MariaDB"
      case "tidb":
        return "TiDB"
      case "neon":
        return "Neon"
      case "smtp":
        return "SMTP"
      case "googlesheets":
        return "Google Sheets"
      case "hfendpoint":
        return "Hugging Face"
      case "huggingface":
        return "Hugging Face"
      case "s3":
        return "Amazon S3"
      case "firebase":
        return "Firebase"
      case "clickhouse":
        return "ClickHouse"
      case "appwrite":
        return "Appwrite"
      case "couchdb":
        return "CouchDB"
      case "airtable":
        return "Airtable"
      default:
        return ""
    }
  } else {
    return ""
  }
}

export function getResourceSubTitleFromResourceType(
  resourceType: ResourceType | null | undefined,
): string {
  if (resourceType) {
    switch (resourceType) {
      case "huggingface":
        return "Inference API"
      case "hfendpoint":
        return "Inference Endpoint"
    }
  }
  return ""
}

export function generateGraphQLAuthContent(data: {
  [p: string]: any
}): GraphQLAuth | null {
  let authContent: GraphQLAuth | null = null
  switch (data.authentication) {
    case GraphQLAuthValue.BASIC:
      authContent = {
        username: data.username,
        password: data.password,
      }
      break
    case GraphQLAuthValue.BEARER:
      authContent = {
        bearerToken: data.bearerToken,
      }
      break
    case GraphQLAuthValue.APIKEY:
      authContent = {
        key: data.key,
        value: data.value,
        addTo: data.addTo,
        headerPrefix: data.headerPrefix,
      }
      break
    default:
      break
  }
  return authContent
}

export const generateRestAPIAuthContent = (data: {
  [p: string]: any
}): RestApiAuth => {
  let authContent: RestApiAuth = {}
  switch (data.authentication) {
    case "basic":
    case "digest":
      authContent = {
        username: data.username,
        password: data.password,
      }
      break
    case "bearer":
      authContent = {
        token: data.token,
      }
      break
    default:
      authContent = {}
      break
  }
  return authContent
}

export function getActionContentByType(data: FieldValues, type: ResourceType) {
  switch (type) {
    case "mongodb":
      return {
        configType: data.configType,
        ssl: {
          open: data.open,
          client: data.client,
          ca: data.ca,
        },
        configContent:
          data.configType === "gui"
            ? {
                host: data.host.trim(),
                port:
                  data.connectionFormat === "standard"
                    ? data.port.toString()
                    : "",
                connectionFormat: data.connectionFormat,
                databaseName: data.databaseName,
                databaseUsername: data.databaseUsername,
                databasePassword: data.databasePassword,
              }
            : {
                uri: data.uri.trim(),
              },
      }
    case "supabasedb":
    case "tidb":
    case "mariadb":
    case "mysql":
    case "postgresql":
    case "hydra":
      return {
        host: data.host.trim(),
        port: data.port.toString(),
        databaseName: data.databaseName,
        databaseUsername: data.databaseUsername,
        databasePassword: data.databasePassword,
        ssl: generateSSLConfig(data.ssl, data),
      }
    case "redis":
      return {
        host: data.host.trim(),
        port: data.port.toString(),
        databaseIndex: data.databaseIndex ?? 0,
        databaseUsername: data.databaseUsername,
        databasePassword: data.databasePassword,
        ssl: data.ssl,
      }
    case "upstash":
      return {
        host: data.host.trim(),
        port: data.port.toString(),
        databaseIndex: DATABASE_INDEX,
        databaseUsername: DEFAULT_NAME,
        databasePassword: data.databasePassword,
        ssl: true,
      }
    case "firebase":
      return {
        databaseUrl: data.databaseUrl.trim(),
        projectID: data.projectID,
        privateKey: JSON.parse(data.privateKey),
      }
    case "elasticsearch":
      return {
        host: data.host.trim(),
        port: data.port.toString(),
        username: data.username,
        password: data.password,
      }
    case "s3":
      return {
        bucketName: data.bucketName,
        region: data.region,
        endpoint: data.endpoint,
        baseURL: data.baseURL && data.baseURL.trim(),
        accessKeyID: data.accessKeyID,
        secretAccessKey: data.secretAccessKey,
        acl: !data.acl || data.acl === "-" ? "" : data.acl,
      }
    case "smtp":
      return {
        host: data.host.trim(),
        port: +data.port,
        username: data.username,
        password: data.password,
      }
    case "clickhouse":
      return {
        host: data.host.trim(),
        port: +data.port,
        username: data.username,
        password: data.password,
        databaseName: data.databaseName,
        ssl: generateSSLConfig(!!data.ssl, data, "clickhouse"),
      }
    case "graphql":
      return {
        baseUrl: data.baseUrl.trim(),
        urlParams: data.urlParams,
        headers: data.headers,
        cookies: data.cookies,
        authentication: data.authentication,
        disableIntrospection: data.disableIntrospection,
        authContent: generateGraphQLAuthContent(data),
      }
    case "mssql":
      return {
        host: data.host.trim(),
        port: data.port.toString(),
        databaseName: data.databaseName,
        username: data.username,
        password: data.password,
        connectionOpts: data.connectionOpts,
        ssl: generateSSLConfig(!!data.ssl, data, "mssql"),
      }
    case "oracle": {
      const { resourceName: _resourceName, host, ...otherParams } = data
      return {
        ...otherParams,
        host: host.trim(),
      }
    }
    case "huggingface":
      return {
        token: data.token,
      }
    case "hfendpoint":
      return {
        token: data.token,
        endpoint: data.endpoint.trim(),
      }
    case "snowflake":
      return {
        accountName: data.accountName,
        warehouse: data.warehouse,
        database: data.database,
        schema: data.schema,
        role: data.role,
        authentication: data.authentication,
        authContent:
          data.authentication === "basic"
            ? {
                username: data.username,
                password: data.password,
              }
            : {
                username: data.username,
                privateKey: data.privateKey,
              },
      }
    case "dynamodb":
      const { region, accessKeyID, secretAccessKey } = data
      return {
        region,
        accessKeyID,
        secretAccessKey,
      }
    case "couchdb": {
      const {
        resourceName: _couchDBResName,
        host,
        ...otherCouchDBParams
      } = data
      return { ...otherCouchDBParams, host: host.trim() }
    }
    case "appwrite":
      const { host, projectID, databaseID, apiKey } = data
      return {
        host: host.trim(),
        projectID,
        databaseID,
        apiKey,
      }
    case "restapi":
      const {
        resourceName: _restApiResName,
        baseUrl,
        caCert = "",
        clientKey = "",
        clientCert = "",
        mode = "verify-full",
        ...otherRestApiParams
      } = data
      return {
        ...otherRestApiParams,
        baseUrl: baseUrl.trim(),
        authContent: generateRestAPIAuthContent(data),
        certs: {
          caCert,
          clientKey,
          clientCert,
          mode,
        },
      }
    case "googlesheets":
      let oAuthOpts = {}
      return {
        authentication: data.authentication,
        opts: {
          privateKey: data.privateKey,
          accessType: data.accessType,
          ...oAuthOpts,
        },
      }
    case "neon": {
      const {
        resourceName: _neonResourceName,
        connectionString: _connectionString,
        host,
        port,
        ...otherNeonParams
      } = data
      return {
        ...otherNeonParams,
        host: host.trim(),
        port: port.toString(),
        ssl: DbSSLInitial,
      }
    }
    case "airtable": {
      return {
        authenticationType: "personalToken",
        authenticationConfig: {
          token: data.token,
        },
      }
    }
  }
}
