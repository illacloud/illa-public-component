import { BaseAiAgentActionContent } from "./aiAgentAction"
import { AirtableAction, AirtableActionConfigType } from "./airtableAction"
import { AppwriteAction, AppwriteActionTypes } from "./appwriteAction"
import { CouchDBAction, CouchDBOptionsType } from "./couchDBAction"
import { DynamoDBAction, DynamoStructParams } from "./dynamoDBAction"
import { ElasticSearchAction } from "./elasticSearchAction"
import { FirebaseAction, FirebaseContentType } from "./firebaseAction"
import { GlobalDataActionContent } from "./globalData"
import {
  GoogleSheetsAction,
  GoogleSheetsActionOpts,
} from "./googleSheetsAction"
import { GraphQLAction } from "./graphqlAction"
import { HuggingFaceAction, HuggingFaceBodyContent } from "./huggingFaceAction"
import {
  ILLADriveAction,
  ILLADriveActionTypeContent,
  ILLADriveUpdateStatusAction,
} from "./illaDriveAction"
import {
  MicrosoftSqlAction,
  MicrosoftSqlActionType,
} from "./microsoftSqlAction"
import { MongoDbAction, MongoDbActionTypeContent } from "./mongoDbAction"
import { MysqlLikeAction } from "./mysqlLikeAction"
import { OracleDBAction, OracleDBActionType } from "./oracleDBAction"
import { RedisAction } from "./redisAction"
import { RestAPIAction, RestAPIBodyContent } from "./restapiAction"
import { S3Action, S3ActionTypeContent } from "./s3Action"
import { SMPTAction } from "./smtpAction"
import { TransformerAction } from "./transformerAction"

export enum ACTION_RUN_TIME {
  APP_LOADED = "appLoaded",
  PAGE_LOADING = "pageLoading",
  NONE = "none",
}

export interface Transformer {
  rawData: string
  enable: boolean
}

export interface IAdvancedConfig {
  runtime: ACTION_RUN_TIME
  pages: string[]
  delayWhenLoaded: string
  displayLoadingPage: boolean
  isPeriodically: boolean
  periodInterval: string
}

export interface IMockConfig {
  enabled: boolean
  mockData: string
  enableForReleasedApp: boolean
}

export interface ActionConfig {
  public: boolean
  advancedConfig?: IAdvancedConfig
  icon?: string
  mockConfig?: IMockConfig
  tutorialLink?: string
}

export type ActionType =
  | "huggingface"
  | "hfendpoint"
  | "firebase"
  | "supabasedb"
  | "clickhouse"
  | "couchdb"
  | "mysql"
  | "mssql"
  | "oracle"
  | "oracle9i"
  | "restapi"
  | "graphql"
  | "mongodb"
  | "redis"
  | "elasticsearch"
  | "dynamodb"
  | "snowflake"
  | "postgresql"
  | "hydra"
  | "mariadb"
  | "tidb"
  | "neon"
  | "smtp"
  | "googlesheets"
  | "s3"
  | "transformer"
  | "appwrite"
  | "upstash"
  | "airtable"
  | "aiagent"
  | "globalData"
  | "illadrive"

export type ActionTriggerMode = "manually" | "automate"

export interface BaseActionItem<T extends unknown = unknown> {
  config: ActionConfig
  displayName: string
  transformer: Transformer
  triggerMode: ActionTriggerMode
  resourceID?: string
  content: T
  isVirtualResource: boolean
}

export interface ActionItem<T extends ActionContent = ActionContent>
  extends BaseActionItem<T> {
  actionID: string
  actionType: ActionType
}

export type ActionContent =
  | HuggingFaceAction<HuggingFaceBodyContent>
  | FirebaseAction<FirebaseContentType>
  | SMPTAction
  | S3Action<S3ActionTypeContent>
  | ElasticSearchAction
  | DynamoDBAction<DynamoStructParams>
  | MysqlLikeAction
  | MicrosoftSqlAction<MicrosoftSqlActionType>
  | OracleDBAction<OracleDBActionType>
  | RestAPIAction<RestAPIBodyContent>
  | TransformerAction
  | AppwriteAction<AppwriteActionTypes>
  | RedisAction
  | GraphQLAction
  | MongoDbAction<MongoDbActionTypeContent>
  | CouchDBAction<CouchDBOptionsType>
  | GoogleSheetsAction<GoogleSheetsActionOpts>
  | AirtableAction<AirtableActionConfigType>
  | BaseAiAgentActionContent
  | GlobalDataActionContent
  | ILLADriveAction<ILLADriveActionTypeContent>
  | ILLADriveUpdateStatusAction

export * from "./aiAgentAction"
export * from "./airtableAction"
export * from "./appwriteAction"
export * from "./couchDBAction"
export * from "./dynamoDBAction"
export * from "./elasticSearchAction"
export * from "./firebaseAction"
export * from "./globalData"
export * from "./googleSheetsAction"
export * from "./graphqlAction"
export * from "./huggingFaceAction"
export * from "./illaDriveAction"
export * from "./microsoftSqlAction"
export * from "./mongoDbAction"
export * from "./mysqlLikeAction"
export * from "./oracleDBAction"
export * from "./redisAction"
export * from "./restapiAction"
export * from "./s3Action"
export * from "./smtpAction"
export * from "./transformerAction"
