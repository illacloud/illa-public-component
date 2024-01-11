import {
  MongoDbGuiConfigContent,
  MongoDbResource,
  MongoDbUriConfigContent,
} from "@illa-public/public-types"

export const MongoDbGuiConfigContentInitial: MongoDbGuiConfigContent = {
  host: "",
  connectionFormat: "standard",
  port: "27017",
  databaseName: "",
  databaseUsername: "",
  databasePassword: "",
}

export const MongoDbSSLInitial = {
  open: false,
  client: "",
  ca: "",
}

export const MongoDbUriConfigContentInitial: MongoDbUriConfigContent = {
  uri: "",
}

export const MongoDbResourceInitial: MongoDbResource<MongoDbGuiConfigContent> =
  {
    configType: "gui",
    configContent: MongoDbGuiConfigContentInitial,
    ssl: MongoDbSSLInitial,
  }
