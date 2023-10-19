export type MongoDbConnectionFormat = "standard" | "mongodb+srv"

export type MongoConfigType = "gui" | "uri"

export type MongoDbConfig = MongoDbGuiConfigContent | MongoDbUriConfigContent

export interface MongoDbGuiConfigContent {
  host: string
  connectionFormat: MongoDbConnectionFormat
  port: string
  databaseName: string
  databaseUsername: string
  databasePassword: string
}

export interface MongoDbUriConfigContent {
  uri: string
}

export interface MongoDbSSL {
  open: boolean
  client: string
  ca: string
}

export interface MongoDbResource<T extends MongoDbConfig> {
  configType: MongoConfigType
  configContent: T
  ssl: MongoDbSSL
}
