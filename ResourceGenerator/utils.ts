export function getResourceNameFromResourceType(resourceType: string): string {
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
}

export function getResourceSubTitleFromResourceType(
  resourceType: string,
): string {
  switch (resourceType) {
    case "huggingface":
      return "Inference API"
    case "hfendpoint":
      return "Inference Endpoint"
    default:
      return ""
  }
}
