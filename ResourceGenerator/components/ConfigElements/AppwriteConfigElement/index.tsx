import { AppWriteResourceInitial } from "@illa-public/public-configs"
import { AppWriteResource } from "@illa-public/public-types"
import { isCloudVersion } from "@illa-public/utils"
import { FC, useContext } from "react"
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
  optionLabelStyle,
} from "../style"

const AppWriteConfigElement: FC<BaseConfigElementProps> = (props) => {
  const { resourceID } = props
  const { t } = useTranslation()
  const { control, formState } = useFormContext()
  const { getResourceByID } = useContext(ResourceGeneratorContext)
  const findResource = getResourceByID(resourceID)
  let content: AppWriteResource
  if (!findResource) {
    content = AppWriteResourceInitial
  } else {
    content = findResource.content as AppWriteResource
  }

  const inputValueValidate = {
    validate: validateNotEmpty,
  }

  return (
    <>
      <div css={container}>
        <ControlledElement
          controlledType="input"
          isRequired
          title={t("editor.action.resource.db.label.name")}
          control={control}
          defaultValue={findResource?.resourceName ?? ""}
          rules={[inputValueValidate]}
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
          title={t("editor.action.form.label.appwrite.host")}
          control={control}
          defaultValue={content.host}
          rules={[
            {
              required: t("editor.action.resource.error.invalid_url"),
              validate: urlValidate,
            },
          ]}
          placeholders={[t("editor.action.form.placeholder.appwrite.host")]}
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
          controlledType="input"
          isRequired
          title={t("editor.action.form.label.appwrite.dbid")}
          control={control}
          defaultValue={content.databaseID}
          rules={[inputValueValidate]}
          placeholders={[t("editor.action.form.placeholder.appwrite.dbid")]}
          name="databaseID"
        />
        <ControlledElement
          controlledType="input"
          isRequired
          title={t("editor.action.form.label.appwrite.projectid")}
          control={control}
          defaultValue={content.projectID}
          rules={[inputValueValidate]}
          placeholders={[
            t("editor.action.form.placeholder.appwrite.projectid"),
          ]}
          name="projectID"
        />
        <ControlledElement
          controlledType="password"
          isRequired
          title={t("editor.action.form.label.appwrite.secret")}
          control={control}
          defaultValue={content.apiKey}
          rules={[inputValueValidate]}
          placeholders={[t("editor.action.form.placeholder.appwrite.secret")]}
          name="apiKey"
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
AppWriteConfigElement.displayName = "AppWriteConfigElement"
export default AppWriteConfigElement
