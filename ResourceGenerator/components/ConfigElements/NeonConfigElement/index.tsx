import { neonDefaultPort } from "@illa-public/public-configs"
import { NeonResource, Resource } from "@illa-public/public-types"
import { TextLink } from "@illa-public/text-link"
import { isCloudVersion, isURL } from "@illa-public/utils"
import { FC, useCallback, useContext } from "react"
import { Controller, useFormContext } from "react-hook-form"
import { Trans, useTranslation } from "react-i18next"
import {
  Alert,
  Button,
  Input,
  WarningCircleIcon,
  getColor,
} from "@illa-design/react"
import { ResourceGeneratorContext } from "../../../provider"
import {
  isContainLocalPath,
  urlValidate,
  validateNotEmpty,
} from "../../../utils"
import { ControlledElement } from "../../ControlledElement"
import { hostInputContainer } from "../../ControlledElement/style"
import { ResourceDivider } from "../../ResourceDivider"
import { BaseConfigElementProps } from "../interface"
import {
  applyConfigItemLabelText,
  configItem,
  configItemTip,
  connectType,
  connectTypeStyle,
  container,
  errorIconStyle,
  errorMsgStyle,
  labelContainer,
} from "../style"

const getParsedStringValue = (inputString: string) => {
  const regex = /^(.*):\/\/(.*):(.*)@(.*?)(?::(\d+))?\/(.*)$/

  const match = inputString.match(regex)
  if (!match) {
    return {
      roleName: null,
      password: null,
      hostWithoutPort: null,
      dbName: null,
    }
  }

  return {
    roleName: match[2] || null,
    password: match[3] || null,
    hostWithoutPort: match[4] || null,
    dbName: match[6] || null,
  }
}

const handleConnectionStringValidate = (inputString: string) => {
  if (!inputString) {
    return ""
  }
  const errorMsg = "editor.action.form.tips.neon.failed"
  const isPostgres = /^postgres:/i.test(inputString)
  if (!isPostgres) {
    return errorMsg
  }
  const { roleName, dbName, hostWithoutPort, password } =
    getParsedStringValue(inputString)

  if (
    roleName === null ||
    hostWithoutPort === null ||
    (hostWithoutPort && !isURL(hostWithoutPort)) ||
    dbName === null
  ) {
    return errorMsg
  }
  if (password === null) {
    return "editor.action.form.tips.neon.no_password"
  }
  return ""
}

const NeonConfigElement: FC<BaseConfigElementProps> = (props) => {
  const { resourceID } = props

  const { t } = useTranslation()
  const { control, reset, getValues, formState, watch } = useFormContext()

  const { getResourceByID } = useContext(ResourceGeneratorContext)
  const findResource = getResourceByID(resourceID) as Resource<NeonResource>

  const hostValue = watch("host")
  const connectionString = watch("connectionString")
  const showAlert = isContainLocalPath(hostValue ?? "")
  const connectionStringErrorMsg =
    handleConnectionStringValidate(connectionString)

  const handleDocLinkClick = (link: string) => () => window.open(link, "_blank")

  const handleConnectionStringParse = useCallback(() => {
    const res = getParsedStringValue(connectionString)
    const { resourceName } = getValues()
    const { roleName, password, hostWithoutPort, dbName } = res
    reset({
      resourceName,
      connectionString: "",
      host: hostWithoutPort ?? "",
      databaseName: dbName,
      databaseUsername: roleName,
      databasePassword: password,
    })
  }, [connectionString, reset, getValues])

  const ConnectionStringTips = () => (
    <Trans
      i18nKey="editor.action.form.tips.neon.normal"
      t={t}
      components={[
        <TextLink
          key="editor.action.form.tips.neon.normal"
          onClick={handleDocLinkClick(
            "https://console.neon.tech/app/projects/",
          )}
        />,
      ]}
    />
  )

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
        <ResourceDivider type="General Option" />
        <div css={configItem}>
          <div css={labelContainer}>
            <span css={applyConfigItemLabelText(getColor("grayBlue", "02"))}>
              {t("editor.action.form.option.neon.connection_string")}
            </span>
          </div>
          <div css={hostInputContainer}>
            <Controller
              control={control}
              defaultValue=""
              rules={{
                validate: () => {
                  return !connectionStringErrorMsg
                },
              }}
              render={({ field: { value, onChange, onBlur } }) => (
                <Input
                  w="100%"
                  onBlur={onBlur}
                  onChange={onChange}
                  error={!!connectionStringErrorMsg}
                  value={value}
                  colorScheme="techPurple"
                  placeholder="postgres://testUser:abcdefg@ep-restless-rice-862380.us-east-2.aws.neon.tech/neondb"
                />
              )}
              name="connectionString"
            />
            <Button
              disabled={!!connectionStringErrorMsg || !connectionString}
              onClick={handleConnectionStringParse}
              colorScheme="techPurple"
              h="32px"
            >
              {t("editor.action.form.option.neon.parse")}
            </Button>
          </div>
        </div>
        <div css={configItemTip}>
          {!!connectionStringErrorMsg ? (
            <div css={errorMsgStyle}>
              <WarningCircleIcon css={errorIconStyle} />
              <>{t(connectionStringErrorMsg)}</>
            </div>
          ) : (
            <div>
              <ConnectionStringTips />
            </div>
          )}
        </div>

        <ControlledElement
          title={t("editor.action.resource.db.label.hostname_port")}
          defaultValue={[
            findResource?.content.host,
            +(findResource?.content.port ?? neonDefaultPort),
          ]}
          name={["host", "port"]}
          controlledType={["input", "number"]}
          control={control}
          isRequired
          rules={[
            {
              validate: urlValidate,
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
          placeholders={[t("editor.action.resource.db.placeholder.hostname")]}
          tips={
            formState.errors.host && !showAlert ? (
              <div css={errorMsgStyle}>
                <WarningCircleIcon css={errorIconStyle} />
                <>{formState.errors.host.message}</>
              </div>
            ) : null
          }
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
                          onClick={handleDocLinkClick(
                            "https://www.illacloud.com/docs/illa-cli",
                          )}
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
      </div>
    </>
  )
}
NeonConfigElement.displayName = "NeonConfigElement"
export default NeonConfigElement
