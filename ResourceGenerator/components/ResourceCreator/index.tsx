import { FC, useCallback, useMemo } from "react"
import { useSelector } from "react-redux"
import { ResourceCreatorProps } from "@/page/Dashboard/components/ResourceGenerator/ResourceCreator/interface"
import { AirtableConfigElement } from "../ConfigElement/AirtableConfigElement"
import { AppWriteConfigElement } from "../ConfigElement/AppwriteConfigElement"
import { ClickhouseConfigElement } from "../ConfigElement/ClickhouseConfigElement"
import { CouchDBConfigElement } from "../ConfigElement/CouchDBConfigElement"
import { DynamoDBConfigElement } from "../ConfigElement/DynamoDBConfigElement"
import { ElasticSearchConfigElement } from "../ConfigElement/ElasticSearchConfigElement"
import { FirebaseConfigElement } from "../ConfigElement/FirebaseConfigElement"
import { GoogleSheetsConfigElement } from "../ConfigElement/GoogleSheetsConfigElement"
import { GraphQLConfigElement } from "../ConfigElement/GraphQLConfigElement"
import { HuggingFaceConfigElement } from "../ConfigElement/HuggingFaceConfigElement"
import { HuggingFaceEndpointConfigElement } from "../ConfigElement/HuggingFaceEndpointConfigElement"
import { MicrosoftSqlConfigElement } from "../ConfigElement/MicrosoftSqlConfigElement"
import { MongoDbConfigElement } from "../ConfigElement/MongoDbConfigElement"
import { MysqlLikeConfigElement } from "../ConfigElement/MysqlLikeConfigElement"
import { NeonConfigElement } from "../ConfigElement/NeonConfigElement"
import { OracleDBConfigElement } from "../ConfigElement/OracleDBConfigElement"
import { RedisConfigElement } from "../ConfigElement/RedisConfigElement"
import { RestApiConfigElement } from "../ConfigElement/RestApiConfigElement"
import { S3ConfigElement } from "../ConfigElement/S3ConfigElement"
import { SMTPConfigElement } from "../ConfigElement/SMTPConfigElement"
import { SnowflakeConfigElement } from "../ConfigElement/SnowflakeConfigElement"

export const ResourceCreator: FC<ResourceCreatorProps> = (props) => {
  const { resourceType, resourceID, onBack, onFinished } = props
  const resource = useSelector((state: RootState) => {
    return state.resource.find((r) => r.resourceID === resourceID)
  })

  const finalResourceType = resource ? resource.resourceType : resourceType
  const handleBack = useCallback(() => onBack("select"), [onBack])

  const element = useMemo(() => {
    const configElementProps = {
      resourceID,
      onBack: handleBack,
      onFinished,
    }
    switch (finalResourceType) {
      case "supabasedb":
      case "tidb":
      case "mariadb":
      case "mysql":
      case "hydra":
      case "postgresql":
        return (
          <MysqlLikeConfigElement
            resourceType={finalResourceType}
            resourceID={resourceID}
            onBack={handleBack}
            onFinished={onFinished}
          />
        )
      case "neon":
        return <NeonConfigElement {...configElementProps} />
      case "mssql":
        return <MicrosoftSqlConfigElement {...configElementProps} />
      case "oracle":
        return <OracleDBConfigElement {...configElementProps} />
      case "restapi":
        return (
          <RestApiConfigElement
            resourceID={resourceID}
            onBack={handleBack}
            onFinished={onFinished}
          />
        )
      case "mongodb":
        return (
          <MongoDbConfigElement
            resourceID={resourceID}
            onBack={handleBack}
            onFinished={onFinished}
          />
        )
      case "redis":
        return (
          <RedisConfigElement
            type="redis"
            resourceID={resourceID}
            onBack={handleBack}
            onFinished={onFinished}
          />
        )
      case "upstash":
        return (
          <RedisConfigElement
            type="upstash"
            resourceID={resourceID}
            onBack={handleBack}
            onFinished={onFinished}
          />
        )
      case "elasticsearch":
        return (
          <ElasticSearchConfigElement
            resourceID={resourceID}
            onBack={handleBack}
            onFinished={onFinished}
          />
        )
      case "dynamodb":
        return <DynamoDBConfigElement {...configElementProps} />
      case "snowflake":
        return <SnowflakeConfigElement {...configElementProps} />
      case "firebase":
        return (
          <FirebaseConfigElement
            resourceID={resourceID}
            onBack={handleBack}
            onFinished={onFinished}
          />
        )
      case "graphql":
        return <GraphQLConfigElement {...configElementProps} />
      case "s3":
        return (
          <S3ConfigElement
            resourceID={resourceID}
            onBack={handleBack}
            onFinished={onFinished}
          />
        )
      case "smtp":
        return <SMTPConfigElement {...configElementProps} />
      case "googlesheets":
        return <GoogleSheetsConfigElement {...configElementProps} />
      case "huggingface":
        return <HuggingFaceConfigElement {...configElementProps} />
      case "hfendpoint":
        return <HuggingFaceEndpointConfigElement {...configElementProps} />
      case "clickhouse":
        return <ClickhouseConfigElement {...configElementProps} />
      case "appwrite":
        return <AppWriteConfigElement {...configElementProps} />
      case "couchdb":
        return <CouchDBConfigElement {...configElementProps} />
      case "airtable":
        return <AirtableConfigElement {...configElementProps} />
      default:
        return null
    }
  }, [resourceID, handleBack, onFinished, finalResourceType])

  return <>{element}</>
}
