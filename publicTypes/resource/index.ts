import { AirtableResource } from "./airtable"
import { AppWriteResource } from "./appwrite"
import { ClickhouseResource } from "./clickhouse"
import { CouchdbResource } from "./couchdDB"
import { DynamoDBResource } from "./dynamoDB"
import { ElasticSearchResource } from "./elasticSearch"
import { FirebaseResource } from "./firebase"
import { GoogleSheetResource } from "./googleSheet"
import { GraphQLAuth, GraphQLResource } from "./graphql"
import { HuggingFaceResource } from "./huggingFace"
import { HuggingFaceEndpointResource } from "./huggingFaceEndpoint"
import { MicrosoftSqlResource } from "./microsoftSQL"
import { MongoDbConfig, MongoDbResource } from "./mongodb"
import { MysqlLikeResource } from "./mysqlLike"
import { NeonResource } from "./neon"
import { OracleResource } from "./oracle"
import { RedisResource } from "./redis"
import { RestApiAuth, RestApiResource } from "./restapi"
import { S3Resource } from "./s3"
import { SMTPResource } from "./smtp"
import { SnowflakeAuthenticationType, SnowflakeResource } from "./snowflake"

export * from "./airtable"
export * from "./appwrite"
export * from "./clickhouse"
export * from "./couchdDB"
export * from "./dynamoDB"
export * from "./elasticSearch"
export * from "./firebase"
export * from "./googleSheet"
export * from "./graphql"
export * from "./huggingFace"
export * from "./huggingFaceEndpoint"
export * from "./microsoftSQL"
export * from "./mongodb"
export * from "./mysqlLike"
export * from "./neon"
export * from "./oracle"
export * from "./redis"
export * from "./restapi"
export * from "./s3"
export * from "./smtp"
export * from "./snowflake"

export type ResourceType =
  | "huggingface"
  | "hfendpoint"
  | "firebase"
  | "supabasedb"
  | "mysql"
  | "mssql"
  | "oracle"
  | "appwrite"
  | "restapi"
  | "graphql"
  | "mongodb"
  | "redis"
  | "elasticsearch"
  | "dynamodb"
  | "snowflake"
  | "hydra"
  | "postgresql"
  | "mariadb"
  | "tidb"
  | "neon"
  | "smtp"
  | "googlesheets"
  | "s3"
  | "clickhouse"
  | "couchdb"
  | "upstash"
  | "airtable"
  | "oracle9i"

export type ResourceContent =
  | HuggingFaceResource
  | HuggingFaceEndpointResource
  | ClickhouseResource
  | CouchdbResource
  | FirebaseResource
  | AppWriteResource
  | SMTPResource
  | GoogleSheetResource
  | S3Resource
  | ElasticSearchResource
  | DynamoDBResource
  | MysqlLikeResource
  | NeonResource
  | MicrosoftSqlResource
  | OracleResource
  | GraphQLResource<GraphQLAuth>
  | RestApiResource<RestApiAuth>
  | RedisResource
  | MongoDbResource<MongoDbConfig>
  | SnowflakeResource<SnowflakeAuthenticationType>
  | AirtableResource

export interface Resource<T extends ResourceContent = ResourceContent> {
  resourceID: string
  resourceName: string
  resourceType: ResourceType
  createdBy: string
  updatedBy: string
  createdAt: string
  updatedAt: string
  content: T
}
