import { DynamoDBResourceInitial } from "@illa-public/public-configs"
import { DynamoDBResource, Resource } from "@illa-public/public-types"
import { isCloudVersion } from "@illa-public/utils"
import { FC, useContext, useMemo } from "react"
import { useFormContext } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { Divider, getColor } from "@illa-design/react"
import { ResourceGeneratorContext } from "../../../provider"
import { validateNotEmpty } from "../../../utils"
import { ControlledElement } from "../../ControlledElement"
import { BaseConfigElementProps } from "../interface"
import {
  applyConfigItemLabelText,
  configItemTip,
  connectType,
  connectTypeStyle,
  container,
  labelContainer,
  optionLabelStyle,
} from "../style"

const DynamoDBConfigElement: FC<BaseConfigElementProps> = (props) => {
  const { resourceID } = props
  const { t } = useTranslation()
  const { control } = useFormContext()
  const { getResourceByID } = useContext(ResourceGeneratorContext)
  const findResource = getResourceByID(resourceID)

  const content = useMemo(() => {
    if (findResource === undefined) {
      return DynamoDBResourceInitial
    } else {
      return (findResource as Resource<DynamoDBResource>).content
    }
  }, [findResource])

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
          controlledType="input"
          isRequired
          title={t("editor.action.resource.db.label.dynamo_region")}
          control={control}
          defaultValue={content.region}
          rules={[
            {
              validate: validateNotEmpty,
            },
          ]}
          placeholders={[
            t("editor.action.resource.db.placeholder.dynamo_region"),
          ]}
          name="region"
        />

        <ControlledElement
          controlledType="input"
          isRequired
          title={t("editor.action.resource.db.label.dynamo_access_key_id")}
          control={control}
          defaultValue={content.accessKeyID}
          rules={[
            {
              validate: validateNotEmpty,
            },
          ]}
          name="accessKeyID"
        />

        <ControlledElement
          controlledType="password"
          isRequired
          title={t("editor.action.resource.db.label.dynamo_secret_key")}
          control={control}
          defaultValue={content.secretAccessKey}
          rules={[
            {
              validate: validateNotEmpty,
            },
          ]}
          name="secretAccessKey"
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
DynamoDBConfigElement.displayName = "DynamoDBConfigElement"
export default DynamoDBConfigElement
