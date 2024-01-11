import { CouchdbResourceInitial } from "@illa-public/public-configs"
import { CouchdbResource } from "@illa-public/public-types"
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

const CouchDBConfigElement: FC<BaseConfigElementProps> = (props) => {
  const { resourceID } = props
  const { t } = useTranslation()
  const { control, formState } = useFormContext()
  const { getResourceByID } = useContext(ResourceGeneratorContext)
  const findResource = getResourceByID(resourceID)
  const content = findResource
    ? (findResource.content as CouchdbResource)
    : CouchdbResourceInitial

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
          title={t("editor.action.resource.db.label.hostname")}
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
            formState.errors.host && (
              <div css={errorMsgStyle}>
                <WarningCircleIcon css={errorIconStyle} />
                <>{formState.errors.host.message}</>
              </div>
            )
          }
        />
        <ControlledElement
          controlledType="input"
          isRequired
          title={t("editor.action.resource.db.label.port")}
          control={control}
          defaultValue={content.port}
          rules={[
            {
              validate: validateNotEmpty,
            },
          ]}
          placeholders={["5984"]}
          name="port"
        />
        <ControlledElement
          controlledType="input"
          isRequired
          title={t("editor.action.resource.db.label.username")}
          control={control}
          defaultValue={content.username}
          rules={[
            {
              validate: validateNotEmpty,
            },
          ]}
          name="username"
        />
        <ControlledElement
          controlledType="password"
          isRequired
          title={t("editor.action.resource.db.label.password")}
          control={control}
          defaultValue={content.password}
          rules={[
            {
              validate: validateNotEmpty,
            },
          ]}
          name="password"
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
          mt="16px"
          mb="8px"
          w="unset"
        />
        <div css={optionLabelStyle}>
          {t("editor.action.resource.db.title.advanced_option")}
        </div>
        <ControlledElement
          controlledType="switch"
          title={t("editor.action.form.label.couchdb.ssl")}
          control={control}
          defaultValue={content.ssl}
          name="ssl"
          contentLabel={t("editor.action.form.option.couchdb.ssl")}
        />
      </div>
    </>
  )
}

CouchDBConfigElement.displayName = "CouchDBConfigElement"
export default CouchDBConfigElement
