import {
  MongoDbResource,
  MongoDbUriConfigContent,
  Resource,
  ResourceContent,
} from "@illa-public/public-types"
import { FC } from "react"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import { MongoDbUriConfigContentInitial } from "../../../../ResourceDefaultConfig/mongoDB"
import { validate } from "../../../../utils/validate"
import { ControlledElement } from "../../../ControlledElement"
import { MongoDbConfigModeProps } from "../interface"

export const MongoDbUriMode: FC<MongoDbConfigModeProps> = (props) => {
  const { resourceID, control } = props

  const { t } = useTranslation()
  const findResource: Resource<ResourceContent> | undefined = useSelector(
    (state: RootState) => {
      return state.resource.find((r) => r.resourceID === resourceID)
    },
  )

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
          validate,
        },
      ]}
      isRequired
    />
  )
}

MongoDbUriMode.displayName = "MongoDbUriMode"
