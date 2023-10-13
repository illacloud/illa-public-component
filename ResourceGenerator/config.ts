import { ResourceType } from "@illa-public/public-types"
import { getI18n } from "react-i18next"

export interface ResourceDataItem {
  resourceType: ResourceType
  isDraft: boolean
}

export const Databases: ResourceType[] = [
  "postgresql",
  "mysql",
  "mssql",
  "oracle",
  "mariadb",
  "tidb",
  "neon",
  "redis",
  "upstash",
  "mongodb",
  "elasticsearch",
  "dynamodb",
  "snowflake",
  "supabasedb",
  "clickhouse",
  "couchdb",
  "appwrite",
  "hydra",
]

export const Apis: ResourceType[] = [
  "restapi",
  "s3",
  "firebase",
  "graphql",
  "smtp",
  "googlesheets",
  "airtable",
  "huggingface",
  "hfendpoint",
]

export const ResourceTypeList = [
  {
    title: getI18n().t("editor.action.type.database"),
    item: Databases,
    category: "databases" as const,
  },
  {
    title: getI18n().t("editor.action.type.api"),
    item: Apis,
    category: "apis" as const,
  },
]
