import { MongoDbResourceInitial } from "@illa-public/public-configs"
import { MongoDbConfig, MongoDbResource } from "@illa-public/public-types"
import { FC, useContext } from "react"
import { useFormContext } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { Divider } from "@illa-design/react"
import { ResourceGeneratorContext } from "../../../provider"
import { validateNotEmpty } from "../../../utils"
import { ControlledElement } from "../../ControlledElement"
import { BaseConfigElementProps } from "../interface"
import { container, optionLabelStyle } from "../style"
import { MongoDbGuiMode } from "./MongoDbGuiMode"
import { MongoDbUriMode } from "./MongoDbUriMode"

const MongoDbConfigElement: FC<BaseConfigElementProps> = (props) => {
  const { resourceID } = props

  const { t } = useTranslation()
  const { control, watch } = useFormContext()

  const { getResourceByID } = useContext(ResourceGeneratorContext)
  const findResource = getResourceByID(resourceID)

  let content: MongoDbResource<MongoDbConfig>
  if (findResource === undefined) {
    content = MongoDbResourceInitial
  } else {
    content = findResource.content as MongoDbResource<MongoDbConfig>
  }

  const configTypeWatch = watch("configType", content.configType)
  const openSSLWatch = watch("open", content.ssl.open ?? false)

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
        <ControlledElement
          title={t("editor.action.resource.db.label.config_type")}
          defaultValue={content.configType}
          name="configType"
          controlledType="radio-group"
          control={control}
          forceEqualWidth
          options={[
            {
              value: "gui",
              label: "General",
            },
            {
              value: "uri",
              label: "URI",
            },
          ]}
        />
        {configTypeWatch === "gui" && (
          <MongoDbGuiMode
            control={control}
            watch={watch}
            resourceID={resourceID}
          />
        )}
        {configTypeWatch === "uri" && (
          <MongoDbUriMode
            control={control}
            watch={watch}
            resourceID={resourceID}
          />
        )}

        <ControlledElement
          controlledType={["switch"]}
          title={t("editor.action.resource.db.label.ssl_options")}
          control={control}
          defaultValue={content.ssl.open}
          name="open"
          contentLabel={t("editor.action.resource.db.tip.ssl_options")}
        />

        {openSSLWatch && (
          <>
            <ControlledElement
              controlledType={["textarea"]}
              title={t("editor.action.resource.db.label.mongodb_ssl_client")}
              control={control}
              defaultValue={content.ssl.client}
              name="client"
              placeholders={[
                t("editor.action.resource.db.placeholder.mongo_certificate"),
              ]}
            />
            <ControlledElement
              controlledType={["textarea"]}
              title={t("editor.action.resource.db.label.mongodb_ssl_ca")}
              control={control}
              defaultValue={content.ssl.ca}
              name="ca"
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

MongoDbConfigElement.displayName = "MongoDbConfigElement"
export default MongoDbConfigElement
