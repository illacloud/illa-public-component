import { ResourceType } from "@illa-public/public-types"
import { isCloudVersion } from "@illa-public/utils"
import i18next from "i18next"

export const ACTION_MODAL_WIDTH = 1080

export interface ResourceItem {
  resourceType: ResourceType
  hidden?: boolean
}

export const Databases: ResourceItem[] = [
  {
    resourceType: "postgresql",
    hidden: false,
  },
  {
    resourceType: "mysql",
    hidden: false,
  },
  {
    resourceType: "mssql",
    hidden: false,
  },
  {
    resourceType: "oracle",
    hidden: false,
  },
  {
    resourceType: "oracle9i",
    hidden: !isCloudVersion,
  },
  {
    resourceType: "mariadb",
    hidden: false,
  },
  {
    resourceType: "tidb",
    hidden: false,
  },
  {
    resourceType: "neon",
    hidden: false,
  },
  {
    resourceType: "redis",
    hidden: false,
  },
  {
    resourceType: "upstash",
    hidden: false,
  },
  {
    resourceType: "mongodb",
    hidden: false,
  },
  {
    resourceType: "elasticsearch",
    hidden: false,
  },
  {
    resourceType: "dynamodb",
    hidden: false,
  },
  {
    resourceType: "snowflake",
    hidden: false,
  },
  {
    resourceType: "supabasedb",
    hidden: false,
  },
  {
    resourceType: "clickhouse",
    hidden: false,
  },
  {
    resourceType: "couchdb",
    hidden: false,
  },
  {
    resourceType: "appwrite",
    hidden: false,
  },
  {
    resourceType: "hydra",
    hidden: false,
  },
]

export const Apis: ResourceItem[] = [
  {
    resourceType: "restapi",
    hidden: false,
  },
  {
    resourceType: "s3",
    hidden: false,
  },
  {
    resourceType: "firebase",
    hidden: false,
  },
  {
    resourceType: "graphql",
    hidden: false,
  },
  {
    resourceType: "smtp",
    hidden: false,
  },
  {
    resourceType: "googlesheets",
    hidden: false,
  },
  {
    resourceType: "airtable",
    hidden: false,
  },
  {
    resourceType: "huggingface",
    hidden: false,
  },
  {
    resourceType: "hfendpoint",
    hidden: false,
  },
]

export const ResourceTypeList = [
  {
    title: i18next.t("editor.action.type.database"),
    item: Databases,
    category: "databases" as const,
  },
  {
    title: i18next.t("editor.action.type.api"),
    item: Apis,
    category: "apis" as const,
  },
  {
    title: i18next.t("editor.action.form.title.feedback"),
    item: [],
    category: "notFind" as const,
  },
]

export const WHITE_LIST_IP = [
  "137.184.185.47",
  "137.184.176.232",
  "137.184.180.151",
]
