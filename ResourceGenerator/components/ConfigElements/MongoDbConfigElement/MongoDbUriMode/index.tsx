import { MongoDbUriConfigContentInitial } from "@illa-public/public-configs"
import {
  MongoDbResource,
  MongoDbUriConfigContent,
  Resource,
} from "@illa-public/public-types"
import { FC, useContext } from "react"
import { useTranslation } from "react-i18next"
import { ResourceGeneratorContext } from "../../../../provider"
import { validateNotEmpty } from "../../../../utils"
import { ControlledElement } from "../../../ControlledElement"
import { MongoDbConfigModeProps } from "../interface"

export const MongoDbUriMode: FC<MongoDbConfigModeProps> = (props) => {
  const { resourceID, control } = props

  const { t } = useTranslation()
  const { getResourceByID } = useContext(ResourceGeneratorContext)
  const findResource = getResourceByID(resourceID)

  let content: MongoDbUriConfigContent
  if (findResource === undefined) {
    content = MongoDbUriConfigContentInitial
  } else {
    const mongoDbResource = (
      findResource as Resource<MongoDbResource<MongoDbUriConfigContent>>
    ).content
    content =
      mongoDbResource.configType === "uri"
        ? mongoDbResource.configContent
        : MongoDbUriConfigContentInitial
  }

  return (
    <ControlledElement
      title={t("editor.action.resource.db.label.connection_format")}
      control={control}
      name="uri"
      defaultValue={content.uri}
      placeholders={[
        "mongodb+srv://admin:password@host/mydb?retryWrites=true&w=majority",
      ]}
      controlledType="input"
      rules={[
        {
          validate: validateNotEmpty,
        },
      ]}
      isRequired
    />
  )
}

MongoDbUriMode.displayName = "MongoDbUriMode"
