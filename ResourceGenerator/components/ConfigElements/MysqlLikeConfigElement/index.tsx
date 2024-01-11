import { MysqlLikeResource, Resource } from "@illa-public/public-types"
import { TextLink } from "@illa-public/text-link"
import { isCloudVersion } from "@illa-public/utils"
import { FC, useContext, useMemo } from "react"
import { Controller, useFormContext } from "react-hook-form"
import { Trans, useTranslation } from "react-i18next"
import { Alert, Button, Divider, Input, getColor } from "@illa-design/react"
import { ResourceGeneratorContext } from "../../../provider"
import { isContainLocalPath, validateNotEmpty } from "../../../utils"
import { ControlledElement } from "../../ControlledElement"
import { hostInputContainer } from "../../ControlledElement/style"
import {
  applyConfigItemLabelText,
  configItem,
  configItemTip,
  connectType,
  connectTypeStyle,
  container,
  labelContainer,
  optionLabelStyle,
} from "../style"
import { tiDBServertCertDefaultValue } from "./constants"
import { MysqlLikeConfigElementProps } from "./interface"

const getResourceDefaultPort = (resourceType: string) => {
  switch (resourceType) {
    case "hydra":
    case "postgresql":
    case "supabasedb":
      return "5432"
    case "mysql":
    case "mariadb":
      return "3306"
    case "tidb":
      return "4000"
    default:
      return "3306"
  }
}

const checkIsValidConnectionString = (connectionString: string) => {
  const pattern = /^(.*):\/\/(.*):(.*)@(.*?)(?::(\d+))?\/(.*)$/
  return pattern.test(connectionString)
}

function parseDatabaseConnectionString(
  connectionString: string,
): Omit<MysqlLikeResource, "ssl"> | undefined {
  const regex = /^(.*):\/\/(.*):(.*)@(.*?)(?::(\d+))?\/(.*)$/

  const match = connectionString.match(regex)
  if (!match) return undefined

  return {
    databaseUsername: match[2],
    databasePassword: match[3],
    host: match[4],
    port: match[5] ?? 80,
    databaseName: match[6],
  }
}

const MysqlLikeConfigElement: FC<MysqlLikeConfigElementProps> = (props) => {
  const { resourceType, resourceID } = props

  const { t } = useTranslation()
  const { control, setValue, watch } = useFormContext()

  const { getResourceByID } = useContext(ResourceGeneratorContext)
  const findResource = getResourceByID(
    resourceID,
  ) as Resource<MysqlLikeResource>

  const sslDefaultValue =
    findResource?.content.ssl.ssl ??
    (resourceType === "tidb" || resourceType === "hydra")
  const serverCertDefaultValue =
    findResource?.content.ssl.serverCert ??
    (resourceType === "tidb" || resourceType === "hydra"
      ? tiDBServertCertDefaultValue
      : "")

  const serverCertTip = useMemo(() => {
    return resourceType === "tidb" || resourceType === "hydra" ? (
      <Trans
        i18nKey="editor.action.form.tips.tidb.ca_certificate"
        t={t}
        components={[
          <TextLink
            key="ca-link"
            onClick={() => {
              if (resourceType === "tidb") {
                window.open(
                  "https://docs.pingcap.com/tidbcloud/tidb-cloud-tls-connect-to-dedicated-tier",
                  "_blank",
                )
              } else if (resourceType === "hydra") {
                window.open(
                  "https://docs.hydra.so/cloud-warehouse-operations/tls",
                  "_blank",
                )
              }
            }}
          />,
        ]}
      />
    ) : (
      ""
    )
  }, [resourceType, t])

  const hostValue = watch("host")
  const showAlert = isContainLocalPath(hostValue ?? "")
  const sslOpenWatch = watch("ssl", sslDefaultValue)

  const handleDocLinkClick = () =>
    window.open("https://www.illacloud.com/docs/illa-cli", "_blank")

  return (
    <>
      <div css={container}>
        <ControlledElement
          controlledType="input"
          isRequired
          title={t("editor.action.resource.db.label.name")}
          control={control}
          defaultValue={findResource?.resourceName ?? ""}
          rules={[
            {
              validate: validateNotEmpty,
            },
          ]}
          placeholders={[t("editor.action.resource.db.placeholder.name")]}
          name="resourceName"
          tips={t("editor.action.resource.restapi.tip.name")}
        />
        <Divider
          direction="horizontal"
          ml="24px"
          mr="24px"
          mt="8px"
          mb="8px"
          w="unset"
        />
        <div css={optionLabelStyle}>
          {t("editor.action.resource.db.title.general_option")}
        </div>
        <Controller
          control={control}
          defaultValue=""
          rules={{
            required: false,
          }}
          render={({ field: { value, onChange, onBlur } }) => (
            <div css={configItem}>
              <div css={labelContainer}>
                <span
                  css={applyConfigItemLabelText(getColor("grayBlue", "02"))}
                >
                  {t("editor.action.form.option.neon.connection_string")}
                </span>
              </div>
              <div css={hostInputContainer}>
                <Input
                  onBlur={onBlur}
                  onChange={onChange}
                  error={!checkIsValidConnectionString(value) && value !== ""}
                  value={value}
                  colorScheme="techPurple"
                  placeholder="xxxxxx://myuser:mypassword@localhost:5432/mydb"
                />
                <Button
                  disabled={!checkIsValidConnectionString(value)}
                  onClick={() => {
                    const db = parseDatabaseConnectionString(value)
                    if (db !== undefined) {
                      setValue("host", db.host)
                      setValue("port", db.port)
                      setValue("databaseName", db.databaseName)
                      setValue("databaseUsername", db.databaseUsername)
                      setValue("databasePassword", db.databasePassword)
                      onChange("")
                    }
                  }}
                  colorScheme="techPurple"
                  h="32px"
                >
                  {t("editor.action.form.option.neon.parse")}
                </Button>
              </div>
            </div>
          )}
          name="connectionString"
        />
        <ControlledElement
          title={t("editor.action.resource.db.label.hostname_port")}
          defaultValue={[
            findResource?.content.host,
            findResource?.content.port ?? getResourceDefaultPort(resourceType),
          ]}
          name={["host", "port"]}
          controlledType={["input", "number"]}
          control={control}
          isRequired
          rules={[
            {
              validate: validateNotEmpty,
            },
            {
              required: true,
            },
          ]}
          styles={[
            {
              flex: 4,
            },
            {
              flex: 1,
            },
          ]}
          placeholders={[
            t("editor.action.resource.db.placeholder.hostname"),
            getResourceDefaultPort(resourceType),
          ]}
        />
        {showAlert && (
          <ControlledElement
            defaultValue=""
            name=""
            title=""
            controlledType="none"
            control={control}
            tips={
              <Alert
                title={t("editor.action.form.tips.connect_to_local.title.tips")}
                closable={false}
                content={
                  isCloudVersion ? (
                    <Trans
                      i18nKey="editor.action.form.tips.connect_to_local.cloud"
                      t={t}
                      components={[
                        <TextLink
                          key="editor.action.form.tips.connect_to_local.cloud"
                          onClick={handleDocLinkClick}
                        />,
                      ]}
                    />
                  ) : (
                    t("editor.action.form.tips.connect_to_local.selfhost")
                  )
                }
              />
            }
          />
        )}
        <ControlledElement
          title={t("editor.action.resource.db.label.database")}
          defaultValue={findResource?.content.databaseName}
          name="databaseName"
          controlledType="input"
          control={control}
          isRequired
          rules={[
            {
              validate: validateNotEmpty,
            },
          ]}
          placeholders={[t("editor.action.resource.db.placeholder.database")]}
        />
        <ControlledElement
          title={t("editor.action.resource.db.label.username_password")}
          defaultValue={[
            findResource?.content.databaseUsername,
            findResource?.content.databasePassword,
          ]}
          name={["databaseUsername", "databasePassword"]}
          controlledType={["input", "password"]}
          control={control}
          isRequired
          rules={[
            {
              validate: validateNotEmpty,
            },
            {
              required: true,
            },
          ]}
          placeholders={[
            t("editor.action.resource.db.placeholder.username"),
            t("editor.action.resource.db.placeholder.password"),
          ]}
        />
        {isCloudVersion && (
          <>
            <div css={configItemTip}>
              {t("editor.action.resource.db.tip.username_password")}
            </div>
            <div css={connectType}>
              <div css={labelContainer}>
                <span
                  css={applyConfigItemLabelText(getColor("grayBlue", "02"))}
                >
                  {t("editor.action.resource.db.label.connect_type")}
                </span>
              </div>
              <span css={connectTypeStyle}>
                {t("editor.action.resource.db.tip.connect_type")}
              </span>
            </div>
          </>
        )}
        <Divider
          direction="horizontal"
          ml="24px"
          mr="24px"
          mt="8px"
          mb="8px"
          w="unset"
        />
        <div css={optionLabelStyle}>
          {t("editor.action.resource.db.title.advanced_option")}
        </div>
        <ControlledElement
          controlledType={["switch"]}
          title={t("editor.action.resource.db.label.ssl_options")}
          control={control}
          defaultValue={sslDefaultValue}
          name="ssl"
          contentLabel={t("editor.action.resource.db.tip.ssl_options")}
        />
        {sslOpenWatch && (
          <>
            <ControlledElement
              controlledType={["textarea"]}
              title={t("editor.action.resource.db.label.ca_certificate")}
              isRequired
              rules={[
                {
                  validate: validateNotEmpty,
                },
              ]}
              control={control}
              defaultValue={serverCertDefaultValue}
              name="serverCert"
              placeholders={[
                t("editor.action.resource.db.placeholder.certificate"),
              ]}
              tips={serverCertTip}
            />
            <ControlledElement
              controlledType={["textarea"]}
              title={t("editor.action.resource.db.label.client_key")}
              control={control}
              defaultValue={findResource?.content.ssl.clientKey}
              name="clientKey"
              placeholders={[
                t("editor.action.resource.db.placeholder.certificate"),
              ]}
            />
            <ControlledElement
              controlledType={["textarea"]}
              title={t("editor.action.resource.db.label.client_certificate")}
              control={control}
              defaultValue={findResource?.content.ssl.clientCert}
              name="clientCert"
              placeholders={[
                t("editor.action.resource.db.placeholder.certificate"),
              ]}
            />
          </>
        )}
      </div>
    </>
  )
}

MysqlLikeConfigElement.displayName = "MysqlConfigElement"
export default MysqlLikeConfigElement
