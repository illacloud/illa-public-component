import { ReactNode } from "react"
import AIAgentIcon from "./actionIcons/aiAgent"
import AirtableIcon from "./actionIcons/airtable"
import AppwriteIcon from "./actionIcons/appwrite"
import ClickhouseIcon from "./actionIcons/clickhouse"
import CouchDBIcon from "./actionIcons/couchdb"
import HydraIcon from "./actionIcons/dydra"
import DynamoIcon from "./actionIcons/dynamo"
import ElasticIcon from "./actionIcons/elastic"
import FirebaseIcon from "./actionIcons/firebase"
import GlobalDataIcon from "./actionIcons/globalData"
import GoogleSheetIcon from "./actionIcons/googlesheets"
import GraphQLIcon from "./actionIcons/graphql"
import HuggingFaceIcon from "./actionIcons/huggingface"
import MariaDbIcon from "./actionIcons/mariadb"
import MicrosoftSqlIcon from "./actionIcons/microsoftsql"
import MongoDbIcon from "./actionIcons/mongodb"
import MySqlIcon from "./actionIcons/mysql"
import NeonIcon from "./actionIcons/neon"
import OracleDBIcon from "./actionIcons/oracle"
import PostgreSqlIcon from "./actionIcons/postgresql"
import RedisIcon from "./actionIcons/redis"
import RestApiIcon from "./actionIcons/restapi"
import S3Icon from "./actionIcons/s3"
import SmtpIcon from "./actionIcons/smtp"
import SnowflakeIcon from "./actionIcons/snowflake"
import SupabaseIcon from "./actionIcons/supabase"
import TidbIcon from "./actionIcons/tidb"
import TransformerIcon from "./actionIcons/transformer"
import UpstashIcon from "./actionIcons/upstash"

export function getIconFromResourceType(
  type: string,
  size: string,
): ReactNode | null {
  switch (type) {
    case "supabasedb":
      return <SupabaseIcon size={size} />
    case "graphql":
      return <GraphQLIcon size={size} />
    case "elasticsearch":
      return <ElasticIcon size={size} />
    case "dynamodb":
      return <DynamoIcon size={size} />
    case "snowflake":
      return <SnowflakeIcon size={size} />
    case "smtp":
      return <SmtpIcon size={size} />
    case "googlesheets":
      return <GoogleSheetIcon size={size} />
    case "hfendpoint":
    case "huggingface":
      return <HuggingFaceIcon size={size} />
    case "transformer":
      return <TransformerIcon size={size} />
    case "mariadb":
      return <MariaDbIcon size={size} />
    case "tidb":
      return <TidbIcon size={size} />
    case "neon":
      return <NeonIcon size={size} />
    case "s3":
      return <S3Icon size={size} />
    case "mysql":
      return <MySqlIcon size={size} />
    case "mssql":
      return <MicrosoftSqlIcon size={size} />
    case "restapi":
      return <RestApiIcon size={size} />
    case "mongodb":
      return <MongoDbIcon size={size} />
    case "redis":
      return <RedisIcon size={size} />
    case "upstash":
      return <UpstashIcon size={size} />
    case "hydra":
      return <HydraIcon size={size} />
    case "postgresql":
      return <PostgreSqlIcon size={size} />
    case "firebase":
      return <FirebaseIcon size={size} />
    case "clickhouse":
      return <ClickhouseIcon size={size} />
    case "couchdb":
      return <CouchDBIcon size={size} />
    case "oracle":
      return <OracleDBIcon size={size} />
    case "appwrite":
      return <AppwriteIcon size={size} />
    case "airtable":
      return <AirtableIcon size={size} />
    case "aiagent":
      return <AIAgentIcon size={size} />
    case "globalData":
      return <GlobalDataIcon size={size} />
  }
  return null
}
