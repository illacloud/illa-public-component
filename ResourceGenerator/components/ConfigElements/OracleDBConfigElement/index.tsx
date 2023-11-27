import { OracleResourceInitial } from "@illa-public/public-configs"
import { OracleResource } from "@illa-public/public-types"
import { TextLink } from "@illa-public/text-link"
import { isCloudVersion } from "@illa-public/utils"
import { FC, useCallback, useContext, useState } from "react"
import { useFormContext } from "react-hook-form"
import { Trans, useTranslation } from "react-i18next"
import { Alert, Divider, WarningCircleIcon, getColor } from "@illa-design/react"
import { ResourceGeneratorContext } from "../../../provider"
import {
  isContainLocalPath,
  urlValidate,
  validateNotEmpty,
} from "../../../utils"
import { ControlledElement } from "../../ControlledElement"
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
import { OracleDBConfigElementProps } from "./interface"

const OracleDBConfigElement: FC<OracleDBConfigElementProps> = (props) => {
  const { resourceID } = props
  const { t } = useTranslation()
  const { control, formState } = useFormContext()

  const ConnectTypeOptions = [
    {
      label: t("editor.action.form.option.oracle.sid.sid"),
      value: "SID",
    },
    {
      label: t("editor.action.form.option.oracle.sid.service"),
      value: "Service",
    },
  ]

  const [showAlert, setShowAlert] = useState<boolean>(false)

  const { getResourceByID } = useContext(ResourceGeneratorContext)
  const findResource = getResourceByID(resourceID)
  const content =
    (findResource?.content as OracleResource) ?? OracleResourceInitial

  const handleDocLinkClick = () => {
    window.open("https://www.illacloud.com/docs/illa-cli", "_blank")
  }

  const handleHostValidate = useCallback((value: string) => {
    setShowAlert(isContainLocalPath(value))
    return urlValidate(value)
  }, [])

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
          title={t("editor.action.resource.db.label.hostname")}
          defaultValue={content.host}
          isRequired
          rules={[
            {
              required: t("editor.action.resource.error.invalid_url"),
              validate: handleHostValidate,
            },
          ]}
          name="host"
          controlledType="input"
          control={control}
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
          title={t("editor.action.resource.db.label.port")}
          defaultValue={content.port}
          isRequired
          rules={[
            {
              validate: validateNotEmpty,
            },
          ]}
          name="port"
          controlledType="input"
          control={control}
          placeholders={["1521"]}
        />
        <ControlledElement
          title={t("editor.action.resource.db.label.database")}
          defaultValue={content.name}
          isRequired
          rules={[
            {
              validate: validateNotEmpty,
            },
          ]}
          name="name"
          controlledType="input"
          control={control}
          placeholders={[t("editor.action.resource.db.placeholder.default")]}
        />

        <ControlledElement
          title={t("editor.action.form.label.oracle.sid")}
          defaultValue={content.connectionType}
          isRequired
          rules={[
            {
              validate: validateNotEmpty,
            },
          ]}
          name="connectionType"
          controlledType="radio-group"
          control={control}
          forceEqualWidth={true}
          options={ConnectTypeOptions}
        />
        <ControlledElement
          title={t("editor.action.resource.db.label.username")}
          defaultValue={content.username}
          name="username"
          controlledType="input"
          control={control}
          placeholders={[t("editor.action.form.placeholder.oracle.username")]}
        />
        <ControlledElement
          title={t("editor.action.resource.db.label.password")}
          defaultValue={content.password}
          name="password"
          controlledType="password"
          control={control}
          placeholders={[t("editor.action.form.placeholder.oracle.password")]}
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
          title={t("editor.action.form.label.oracle.ssl")}
          defaultValue={content.ssl}
          isRequired
          name="ssl"
          controlledType="switch"
          control={control}
          contentLabel={t("editor.action.form.option.oracle.ssl")}
        />
      </div>
    </>
  )
}
OracleDBConfigElement.displayName = "OracleDBConfigElement"
export default OracleDBConfigElement
