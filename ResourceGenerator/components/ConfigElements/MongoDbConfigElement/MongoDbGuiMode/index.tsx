import { MongoDbGuiConfigContentInitial } from "@illa-public/public-configs"
import {
  MongoDbGuiConfigContent,
  MongoDbResource,
  Resource,
} from "@illa-public/public-types"
import { TextLink } from "@illa-public/text-link"
import { isCloudVersion } from "@illa-public/utils"
import { FC, useCallback, useContext, useState } from "react"
import { Trans, useTranslation } from "react-i18next"
import { Alert, getColor } from "@illa-design/react"
import { ResourceGeneratorContext } from "../../../../provider"
import { isContainLocalPath } from "../../../../utils"
import { ControlledElement } from "../../../ControlledElement"
import {
  applyConfigItemLabelText,
  configItem,
  configItemTip,
  connectTypeStyle,
  labelContainer,
} from "../../style"
import { MongoDbConfigModeProps } from "../interface"

export const MongoDbGuiMode: FC<MongoDbConfigModeProps> = (props) => {
  const { control, resourceID, watch } = props

  const { t } = useTranslation()
  const { getResourceByID } = useContext(ResourceGeneratorContext)
  const findResource = getResourceByID(resourceID)

  let content: MongoDbGuiConfigContent
  if (findResource === undefined) {
    content = MongoDbGuiConfigContentInitial
  } else {
    const mongoDbResource = (
      findResource as Resource<MongoDbResource<MongoDbGuiConfigContent>>
    ).content
    content =
      mongoDbResource.configType === "gui"
        ? mongoDbResource.configContent
        : MongoDbGuiConfigContentInitial
  }

  const [showAlert, setShowAlert] = useState<boolean>(false)

  const connectionFormat = watch(
    "connectionFormat",
    content.connectionFormat ?? "standard",
  )

  const handleDocLinkClick = () => {
    window.open("https://www.illacloud.com/docs/illa-cli", "_blank")
  }

  const handleHostValidate = useCallback(
    (value: string) => {
      const isShowAlert = isContainLocalPath(value ?? "")
      if (isShowAlert !== showAlert) {
        setShowAlert(isShowAlert)
      }
      return true
    },
    [showAlert],
  )

  return (
    <>
      <ControlledElement
        title={t("editor.action.resource.db.label.hostname")}
        defaultValue={content.host}
        name="host"
        controlledType="input"
        control={control}
        isRequired
        rules={[
          {
            required: true,
            validate: handleHostValidate,
          },
        ]}
        placeholders={[t("editor.action.resource.db.placeholder.hostname")]}
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
        title={t("editor.action.resource.db.label.connection_format")}
        defaultValue={content.connectionFormat}
        name="connectionFormat"
        controlledType="radio-group"
        control={control}
        isRequired
        rules={[
          {
            required: true,
          },
        ]}
        forceEqualWidth
        options={[
          {
            value: "standard",
            label: t(
              "editor.action.resource.db.label.mongodb_connection_standard",
            ),
          },
          {
            value: "mongodb+srv",
            label: t(
              "editor.action.resource.db.label.mongodb_connection_dns_seed_list",
            ),
          },
        ]}
      />
      {connectionFormat === "standard" && (
        <ControlledElement
          title={t("editor.action.resource.db.label.port")}
          defaultValue={content.port}
          name="port"
          controlledType="number"
          control={control}
          placeholders={["3306"]}
          isRequired
          rules={[
            {
              required: true,
            },
          ]}
        />
      )}
      <ControlledElement
        title={t("editor.action.resource.db.label.database")}
        defaultValue={content.databaseName}
        control={control}
        placeholders={[t("editor.action.resource.db.placeholder.database")]}
        name="databaseName"
        controlledType="input"
        isRequired
        rules={[
          {
            required: true,
          },
        ]}
      />

      <ControlledElement
        title={t("editor.action.resource.db.label.username_password")}
        name={["databaseUsername", "databasePassword"]}
        controlledType={["input", "password"]}
        defaultValue={[content.databaseUsername, content.databasePassword]}
        control={control}
        rules={[
          {
            required: true,
          },
          {
            required: true,
          },
        ]}
        isRequired
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
          <div css={configItem}>
            <div css={labelContainer}>
              <span css={applyConfigItemLabelText(getColor("grayBlue", "02"))}>
                {t("editor.action.resource.db.label.connect_type")}
              </span>
            </div>
            <span css={connectTypeStyle}>
              {t("editor.action.resource.db.tip.connect_type")}
            </span>
          </div>
        </>
      )}
    </>
  )
}

MongoDbGuiMode.displayName = "MongoDbGuiMode"
