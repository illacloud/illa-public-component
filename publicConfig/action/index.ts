import {
  ACTION_RUN_TIME,
  ActionContent,
  ActionItem,
  IAdvancedConfig,
  IMockConfig,
  Transformer,
} from "@illa-public/public-types"

export const INIT_ACTION_ADVANCED_CONFIG: IAdvancedConfig = {
  runtime: ACTION_RUN_TIME.NONE,
  pages: [],
  delayWhenLoaded: "",
  displayLoadingPage: false,
  isPeriodically: false,
  periodInterval: "",
}

export const INIT_ACTION_MOCK_CONFIG: IMockConfig = {
  enabled: false,
  enableForReleasedApp: false,
  mockData: "",
}

export const TransformerInitial: Transformer = {
  rawData: "",
  enable: false,
}

export const TransformerInitialTrue: Transformer = {
  rawData:
    "// type your code here\n" +
    "// example: return formatDataAsArray(data).filter(row => row.quantity > 20)\n" +
    "return data",
  enable: true,
}

export const actionItemInitial: Pick<
  ActionItem<ActionContent>,
  "transformer" | "triggerMode"
> = {
  transformer: TransformerInitial,
  triggerMode: "manually",
}

export * from "./initConfig/airtableAction"
export * from "./initConfig/appwriteAction"
export * from "./initConfig/couchDBAction"
export * from "./initConfig/dynamoDBAction"
export * from "./initConfig/elasticSearchAction"
export * from "./initConfig/firebaseAction"
export * from "./initConfig/googleSheetsAction"
export * from "./initConfig/graphqlAction"
export * from "./initConfig/huggingFaceAction"
export * from "./initConfig/illaDriveAction"
export * from "./initConfig/microsoftSqlAction"
export * from "./initConfig/mongoDbAction"
export * from "./initConfig/mysqlLikeAction"
export * from "./initConfig/oracleDBAction"
export * from "./initConfig/redisAction"
export * from "./initConfig/restapiAction"
export * from "./initConfig/s3Action"
export * from "./initConfig/smtpAction"
export * from "./initConfig/transformerAction"
export * from "./initConfig/getInitialContent"
export * from "./generateConfig/graphQL"
export * from "./generateConfig"
export * from "./generateConfig/mongoDB"
export * from "./generateConfig/airtable"
export * from "./generateConfig/appwrite"
