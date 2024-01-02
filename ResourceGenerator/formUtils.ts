import { isILLAAPiError } from "@illa-public/illa-net"
import {
  DATABASE_INDEX,
  DEFAULT_NAME,
  generateGraphQLAuthContent,
  generateSSLConfig,
} from "@illa-public/public-configs"
import {
  AccessType,
  Resource,
  ResourceContent,
  ResourceType,
  RestApiAuth,
} from "@illa-public/public-types"
import { ILLAPublicStorage } from "@illa-public/utils"
import { FieldValues, UseFormHandleSubmit } from "react-hook-form"
import { getI18n } from "react-i18next"
import { createMessage } from "@illa-design/react"
import {
  IActionTestConnectionRequestData,
  fetchActionTestConnection,
} from "./service"
import { getOAuthAccessToken, redirectToGoogleOAuth } from "./service/oAuth"
import {
  requestCreateResource,
  requestUpdateResource,
} from "./service/resource"

const message = createMessage()

function getActionContentByType(data: FieldValues, type: ResourceType) {
  switch (type) {
    case "mongodb":
      return {
        configType: data.configType,
        ssl: {
          open: data.open,
          client: data.client,
          ca: data.ca,
        },
        configContent:
          data.configType === "gui"
            ? {
                host: data.host.trim(),
                port:
                  data.connectionFormat === "standard"
                    ? data.port.toString()
                    : "",
                connectionFormat: data.connectionFormat,
                databaseName: data.databaseName,
                databaseUsername: data.databaseUsername,
                databasePassword: data.databasePassword,
              }
            : {
                uri: data.uri.trim(),
              },
      }
    case "supabasedb":
    case "tidb":
    case "mariadb":
    case "mysql":
    case "postgresql":
    case "hydra":
    case "neon":
      return {
        host: data.host.trim(),
        port: data.port.toString(),
        databaseName: data.databaseName,
        databaseUsername: data.databaseUsername,
        databasePassword: data.databasePassword,
        ssl: generateSSLConfig(data.ssl, data),
      }
    case "redis":
      return {
        host: data.host.trim(),
        port: data.port.toString(),
        databaseIndex: data.databaseIndex ?? 0,
        databaseUsername: data.databaseUsername,
        databasePassword: data.databasePassword,
        ssl: data.ssl,
      }
    case "upstash":
      return {
        host: data.host.trim(),
        port: data.port.toString(),
        databaseIndex: DATABASE_INDEX,
        databaseUsername: DEFAULT_NAME,
        databasePassword: data.databasePassword,
        ssl: data.ssl,
      }
    case "firebase":
      return {
        databaseUrl: data.databaseUrl.trim(),
        projectID: data.projectID,
        privateKey: JSON.parse(data.privateKey),
      }
    case "elasticsearch":
      return {
        host: data.host.trim(),
        port: data.port.toString(),
        username: data.username,
        password: data.password,
      }
    case "s3":
      return {
        bucketName: data.bucketName,
        region: data.region,
        endpoint: data.endpoint,
        baseURL: data.baseURL && data.baseURL.trim(),
        accessKeyID: data.accessKeyID,
        secretAccessKey: data.secretAccessKey,
        acl: !data.acl || data.acl === "-" ? "" : data.acl,
      }
    case "smtp":
      return {
        host: data.host.trim(),
        port: +data.port,
        username: data.username,
        password: data.password,
      }
    case "clickhouse":
      return {
        host: data.host.trim(),
        port: +data.port,
        username: data.username,
        password: data.password,
        databaseName: data.databaseName,
        ssl: generateSSLConfig(!!data.ssl, data, "clickhouse"),
      }
    case "graphql":
      return {
        baseUrl: data.baseUrl.trim(),
        urlParams: data.urlParams,
        headers: data.headers,
        cookies: data.cookies,
        authentication: data.authentication,
        disableIntrospection: data.disableIntrospection,
        authContent: generateGraphQLAuthContent(data),
      }
    case "mssql":
      return {
        host: data.host.trim(),
        port: data.port.toString(),
        databaseName: data.databaseName,
        username: data.username,
        password: data.password,
        connectionOpts: data.connectionOpts,
        ssl: generateSSLConfig(!!data.ssl, data, "mssql"),
      }
    case "oracle9i":
    case "oracle": {
      const { resourceName: _resourceName, host, ...otherParams } = data
      return {
        ...otherParams,
        host: host.trim(),
      }
    }
    case "huggingface":
      return {
        token: data.token,
      }
    case "hfendpoint":
      return {
        token: data.token,
        endpoint: data.endpoint.trim(),
      }
    case "snowflake":
      return {
        accountName: data.accountName,
        warehouse: data.warehouse,
        database: data.database,
        schema: data.schema,
        role: data.role,
        authentication: data.authentication,
        authContent:
          data.authentication === "basic"
            ? {
                username: data.username,
                password: data.password,
              }
            : {
                username: data.username,
                privateKey: data.privateKey,
              },
      }
    case "dynamodb":
      const { region, accessKeyID, secretAccessKey } = data
      return {
        region,
        accessKeyID,
        secretAccessKey,
      }
    case "couchdb": {
      const {
        resourceName: _couchDBResName,
        host,
        ...otherCouchDBParams
      } = data
      return { ...otherCouchDBParams, host: host.trim() }
    }
    case "appwrite":
      const { host, projectID, databaseID, apiKey } = data
      return {
        host: host.trim(),
        projectID,
        databaseID,
        apiKey,
      }
    case "restapi":
      const {
        resourceName: _restApiResName,
        baseUrl,
        caCert = "",
        clientKey = "",
        clientCert = "",
        mode = "verify-full",
        ...otherRestApiParams
      } = data
      return {
        ...otherRestApiParams,
        baseUrl: baseUrl.trim(),
        authContent: generateRestAPIAuthContent(data),
        certs: {
          caCert,
          clientKey,
          clientCert,
          mode,
        },
      }
    case "googlesheets":
      const status =
        data.authentication === "oauth2" &&
        ILLAPublicStorage.getLocalStorage("oAuthStatus")
      let oAuthOpts = {}
      if (status) {
        ILLAPublicStorage.removeLocalStorage("oAuthStatus")
        oAuthOpts = {
          status,
        }
      }
      return {
        authentication: data.authentication,
        opts: {
          privateKey: data.privateKey,
          accessType: data.accessType,
          ...oAuthOpts,
        },
      }
    case "airtable": {
      return {
        authenticationType: "personalToken",
        authenticationConfig: {
          token: data.token,
        },
      }
    }
  }
}

export const generateRestAPIAuthContent = (data: {
  [p: string]: any
}): RestApiAuth => {
  let authContent: RestApiAuth = {}
  switch (data.authentication) {
    case "basic":
    case "digest":
      authContent = {
        username: data.username,
        password: data.password,
      }
      break
    case "bearer":
      authContent = {
        token: data.token,
      }
      break
    default:
      authContent = {}
      break
  }
  return authContent
}

export function onActionConfigElementSubmit(
  teamID: string,
  handleSubmit: UseFormHandleSubmit<FieldValues>,
  resourceID: string | undefined,
  resourceType: ResourceType,
  finishedHandler: (
    resource: Resource<ResourceContent>,
    isUpdate: boolean,
  ) => void,
) {
  const isUpdate = resourceID != undefined
  const googleAuthMethod = async (
    resourceID: string,
    accessType: AccessType,
  ) => {
    const response = await getOAuthAccessToken(
      teamID,
      resourceID,
      `${window.location.origin}${location.pathname}`,
      accessType,
    )
    const { accessToken } = response.data
    if (accessToken) {
      const res = await redirectToGoogleOAuth(teamID, resourceID, accessToken)
      if (res.data.url) {
        window.location.assign(res.data.url)
      }
    }
  }

  return handleSubmit(async (data: FieldValues) => {
    let content
    try {
      content = getActionContentByType(data, resourceType)
    } catch (e) {
      message.error({
        content: getI18n().t("editor.action.resource.db.invalid_private.key"),
      })
      return
    }
    const requestData = {
      ...(isUpdate && { resourceID: data.resourceID }),
      resourceName: data.resourceName,
      resourceType: resourceType,
      content,
    }

    try {
      if (isUpdate) {
        const response = await requestUpdateResource(
          teamID,
          resourceID,
          requestData,
        )
        if (resourceType === "googlesheets") {
          googleAuthMethod(response.data.resourceID, data.accessType)
        }
        finishedHandler(response.data, true)
      } else {
        const response = await requestCreateResource(teamID, requestData)
        if (resourceType === "googlesheets") {
          googleAuthMethod(response.data.resourceID, data.accessType)
        }
        finishedHandler(response.data, false)
      }
      message.success({
        content: getI18n().t("dashboard.resource.save_success"),
      })
    } catch (e) {
      if (isILLAAPiError(e)) {
        message.error({
          content:
            e.data.errorMessage || getI18n().t("dashboard.resource.save_fail"),
        })
      } else {
        message.error({
          content: getI18n().t("dashboard.resource.save_fail"),
        })
      }
    }
  })
}

export async function onActionConfigElementTest(
  teamID: string,
  data: IActionTestConnectionRequestData,
  loadingHandler: (value: boolean) => void,
) {
  loadingHandler(true)
  try {
    await fetchActionTestConnection(teamID, data)
    message.success({
      content: getI18n().t("dashboard.resource.test_success"),
    })
  } catch (error) {
    if (isILLAAPiError(error)) {
      message.error({
        content: error.data.errorMessage,
      })
    } else {
      message.error({
        content: getI18n().t("dashboard.resource.test_fail"),
      })
    }
  } finally {
    loadingHandler(false)
  }
}
