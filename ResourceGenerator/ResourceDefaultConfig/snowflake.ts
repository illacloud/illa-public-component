import {
  SnowflakeAuthenticationType,
  SnowflakeBasicAuthenticationType,
  SnowflakeResource,
} from "@illa-public/public-types"

export const snowflakeBasicAuthenticationTypeInitial: SnowflakeBasicAuthenticationType =
  {
    username: "",
    password: "",
  }

export const snowflakeResourceInitial: SnowflakeResource<SnowflakeAuthenticationType> =
  {
    accountName: "",
    warehouse: "",
    database: "",
    schema: "PUBLIC",
    role: "PUBLIC",
    authentication: "basic",
    authContent: snowflakeBasicAuthenticationTypeInitial,
  }
