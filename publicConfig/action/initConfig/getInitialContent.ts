import {
  ActionContent,
  ActionType,
  Agent,
  BaseAiAgentActionContent,
} from "@illa-public/public-types"
import { AirtableActionConfigInitial } from "./airtableAction"
import { AppwriteActionInitial } from "./appwriteAction"
import { CouchDBActionInitial } from "./couchDBAction"
import { DynamoDBActionInitial } from "./dynamoDBAction"
import { ElasticSearchActionInitial } from "./elasticSearchAction"
import { FirebaseActionInitial } from "./firebaseAction"
import { GoogleSheetsActionInitial } from "./googleSheetsAction"
import { GraphQLActionInitial } from "./graphqlAction"
import { HuggingFaceActionInitial } from "./huggingFaceAction"
import { ILLADriveActionInitial } from "./illaDriveAction"
import { MicrosoftSqlActionInitial } from "./microsoftSqlAction"
import { MongoDbActionInitial } from "./mongoDbAction"
import { MysqlLikeActionInitial } from "./mysqlLikeAction"
import { OracleDBActionInitial } from "./oracleDBAction"
import { RedisActionInitial } from "./redisAction"
import { RestAPIActionInitial } from "./restapiAction"
import { S3ActionInitial } from "./s3Action"
import { SMTPActionInitial } from "./smtpAction"
import { TransformerActionInitial } from "./transformerAction"

export function getInitialContent(actionType: ActionType): ActionContent {
  switch (actionType) {
    case "clickhouse":
    case "supabasedb":
    case "mariadb":
    case "tidb":
    case "mysql":
    case "postgresql":
    case "snowflake":
    case "hydra":
    case "neon":
      return MysqlLikeActionInitial
    case "mssql":
      return MicrosoftSqlActionInitial
    case "oracle9i":
    case "oracle":
      return OracleDBActionInitial
    case "restapi":
      return RestAPIActionInitial
    case "transformer":
      return TransformerActionInitial
    case "redis":
    case "upstash":
      return RedisActionInitial
    case "mongodb":
      return MongoDbActionInitial
    case "elasticsearch":
      return ElasticSearchActionInitial
    case "dynamodb":
      return DynamoDBActionInitial
    case "s3":
      return S3ActionInitial
    case "smtp":
      return SMTPActionInitial
    case "googlesheets":
      return GoogleSheetsActionInitial
    case "firebase":
      return FirebaseActionInitial
    case "graphql":
      return GraphQLActionInitial
    case "huggingface":
    case "hfendpoint":
      return HuggingFaceActionInitial
    case "appwrite":
      return AppwriteActionInitial
    case "couchdb":
      return CouchDBActionInitial
    case "airtable":
      return AirtableActionConfigInitial
    case "illadrive":
      return ILLADriveActionInitial
    default:
      return {} as ActionContent
  }
}

export function getInitialAgentContent(agent: Agent): BaseAiAgentActionContent {
  return {
    agentType: agent.agentType,
    model: agent.model,
    variables: agent.variables,
    input: "",
    modelConfig: {
      stream: false,
    },
  }
}
