import { isCloudVersion } from "@illa-public/utils"
import { FC, lazy } from "react"
import { ConfigElementProps } from "./interface"

const AirtableConfigElement = lazy(() => import("./AirtableConfigElement"))
const AppWriteConfigElement = lazy(() => import("./AppwriteConfigElement"))
const ClickhouseConfigElement = lazy(() => import("./ClickhouseConfigElement"))
const CouchDBConfigElement = lazy(() => import("./CouchDBConfigElement"))
const DynamoDBConfigElement = lazy(() => import("./DynamoDBConfigElement"))
const ElasticSearchConfigElement = lazy(
  () => import("./ElasticSearchConfigElement"),
)
const FirebaseConfigElement = lazy(() => import("./FirebaseConfigElement"))
const GoogleSheetsConfigElement = lazy(
  () => import("./GoogleSheetsConfigElement"),
)
const GraphQLConfigElement = lazy(() => import("./GraphQLConfigElement"))
const HuggingFaceConfigElement = lazy(
  () => import("./HuggingFaceConfigElement"),
)
const HuggingFaceEndpointConfigElement = lazy(
  () => import("./HuggingFaceEndpointConfigElement"),
)
const MicrosoftSqlConfigElement = lazy(
  () => import("./MicrosoftSqlConfigElement"),
)
const MongoDbConfigElement = lazy(() => import("./MongoDbConfigElement"))
const MysqlLikeConfigElement = lazy(() => import("./MysqlLikeConfigElement"))
const NeonConfigElement = lazy(() => import("./NeonConfigElement"))
const OracleDBConfigElement = lazy(() => import("./OracleDBConfigElement"))
const RedisConfigElement = lazy(() => import("./RedisConfigElement"))
const RestApiConfigElement = lazy(() => import("./RestApiConfigElement"))
const S3ConfigElement = lazy(() => import("./S3ConfigElement"))
const SMTPConfigElement = lazy(() => import("./SMTPConfigElement"))
const SnowflakeConfigElement = lazy(() => import("./SnowflakeConfigElement"))

export const ConfigElement: FC<ConfigElementProps> = (props) => {
  const { resourceType } = props

  switch (resourceType) {
    case "supabasedb":
    case "tidb":
    case "mariadb":
    case "mysql":
    case "hydra":
    case "postgresql":
      return <MysqlLikeConfigElement {...props} resourceType={resourceType} />
    case "neon":
      return <NeonConfigElement {...props} />
    case "mssql":
      return <MicrosoftSqlConfigElement {...props} />
    case "oracle":
      return <OracleDBConfigElement {...props} resourceType={resourceType} />
    case "oracle9i": {
      if (isCloudVersion) {
        return <OracleDBConfigElement {...props} resourceType={resourceType} />
      }
      return null
    }
    case "restapi":
      return <RestApiConfigElement {...props} />
    case "mongodb":
      return <MongoDbConfigElement {...props} />
    case "upstash":
    case "redis":
      return <RedisConfigElement {...props} resourceType={resourceType} />
    case "elasticsearch":
      return <ElasticSearchConfigElement {...props} />
    case "dynamodb":
      return <DynamoDBConfigElement {...props} />
    case "snowflake":
      return <SnowflakeConfigElement {...props} />
    case "firebase":
      return <FirebaseConfigElement {...props} />
    case "graphql":
      return <GraphQLConfigElement {...props} />
    case "s3":
      return <S3ConfigElement {...props} />
    case "smtp":
      return <SMTPConfigElement {...props} />
    case "googlesheets":
      return <GoogleSheetsConfigElement {...props} />
    case "huggingface":
      return <HuggingFaceConfigElement {...props} />
    case "hfendpoint":
      return <HuggingFaceEndpointConfigElement {...props} />
    case "clickhouse":
      return <ClickhouseConfigElement {...props} />
    case "appwrite":
      return <AppWriteConfigElement {...props} />
    case "couchdb":
      return <CouchDBConfigElement {...props} />
    case "airtable":
      return <AirtableConfigElement {...props} />
    default:
      return null
  }
}
