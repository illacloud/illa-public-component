import { isBlobURLOrUrl } from "@illa-public/utils"
import { getI18n, useTranslation } from "react-i18next"

export function getResourceNameFromResourceType(
  resourceType: string | null,
): string {
  switch (resourceType) {
    case "supabasedb":
      return "Supabase DB"
    case "mysql":
      return "MySQL"
    case "mssql":
      return "Microsoft SQL"
    case "oracle9i":
      return "Oracle DB 9i"
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
    case "huggingface":
      return "Hugging Face"
    case "hfendpoint":
      return "Hugging Face"
    case "firebase":
      return "Firebase"
    case "clickhouse":
      return "ClickHouse"
    case "couchdb":
      return "CouchDB"
    case "appwrite":
      return "Appwrite"
    case "s3":
      return "Amazon S3"
    case "transformer":
      return "Transformer"
    case "airtable":
      return "Airtable"
    case "aiagent":
      return "AI Agent"
    case "globalData":
      return "Global Data"
    case "illadrive":
      return "ILLA Drive"
    default:
      return ""
  }
}

export function useResourceTypeToResourceName(resourceType: string | null) {
  const { t } = useTranslation()
  switch (resourceType) {
    case "huggingface":
      return "Inference API"
    case "hfendpoint":
      return "Inference Endpoint"
    case "oracle":
      return t("editor.action.form.label.new_oracle")
    case "oracle9i":
      return t("editor.action.form.label.old_oracle")
    default:
      return ""
  }
}

export const validateNotEmpty = (value?: string) =>
  value != undefined && value.trim() != ""

export const isContainLocalPath = (value: string) => {
  return /(^(127\.|0\.0\.0\.0)(\.*\d*)+$)|(^localhost)/.test(value)
}

export const urlValidate = (value: string) => {
  return isBlobURLOrUrl((value ?? "").trim())
    ? true
    : getI18n().t("editor.action.resource.error.invalid_url")
}
