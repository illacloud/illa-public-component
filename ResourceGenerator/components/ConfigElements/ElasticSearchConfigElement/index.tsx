import { ElasticSearchResourceInitial } from "@illa-public/public-configs"
import { ElasticSearchResource, Resource } from "@illa-public/public-types"
import { isCloudVersion } from "@illa-public/utils"
import { FC, useContext, useMemo } from "react"
import { useFormContext } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { Divider, WarningCircleIcon, getColor } from "@illa-design/react"
import { ResourceGeneratorContext } from "../../../provider"
import { urlValidate, validateNotEmpty } from "../../../utils"
import { ControlledElement } from "../../ControlledElement"
import { BaseConfigElementProps } from "../interface"
import {
  applyConfigItemLabelText,
  configItemTip,
  connectType,
  connectTypeStyle,
  container,
  errorIconStyle,
  errorMsgStyle,
  labelContainer,
} from "../style"

const ElasticSearchConfigElement: FC<BaseConfigElementProps> = (props) => {
  const { resourceID } = props

  const { t } = useTranslation()

  const { control, formState } = useFormContext()

  const { getResourceByID } = useContext(ResourceGeneratorContext)
  const findResource = getResourceByID(resourceID)

  const content = useMemo(() => {
    if (findResource === undefined) {
      return ElasticSearchResourceInitial
    } else {
      return (findResource as Resource<ElasticSearchResource>).content
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

        <ControlledElement
          controlledType="input"
          isRequired
          title={t("editor.action.resource.db.label.hosturl")}
          control={control}
          defaultValue={content.host}
          rules={[
            {
              required: t("editor.action.resource.error.invalid_url"),
              validate: urlValidate,
            },
          ]}
          name="host"
          tips={
            formState.errors.host ? (
              <div css={errorMsgStyle}>
                <WarningCircleIcon css={errorIconStyle} />
                <>{formState.errors.host.message}</>
              </div>
            ) : null
          }
        />

        <ControlledElement
          isRequired
          title={t("editor.action.resource.db.label.port")}
          defaultValue={content.port}
          name="port"
          controlledType="number"
          control={control}
        />

        <ControlledElement
          title={t("editor.action.resource.db.label.username_password")}
          controlledType={["input", "password"]}
          defaultValue={[content.username, content.password]}
          name={["username", "password"]}
          control={control}
          isRequired
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

ElasticSearchConfigElement.displayName = "ElasticSearchConfigElement"
export default ElasticSearchConfigElement
