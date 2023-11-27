import { snowflakeResourceInitial } from "@illa-public/public-configs"
import {
  SnowflakeAuthenticationType,
  SnowflakeBasicAuthenticationType,
  SnowflakeKeyAuthenticationType,
  SnowflakeResource,
} from "@illa-public/public-types"
import { FC, useContext } from "react"
import { useFormContext } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { Divider } from "@illa-design/react"
import { ResourceGeneratorContext } from "../../../provider"
import { validateNotEmpty } from "../../../utils"
import { ControlledElement } from "../../ControlledElement"
import { BaseConfigElementProps } from "../interface"
import { container, optionLabelStyle } from "../style"
import { BasicAuthConfig } from "./BasicAuthConfig"
import { KeyPairConfig } from "./KeyPairConfig"
import { AuthenticationOptions } from "./constants"

type SnowflakeType = SnowflakeResource<SnowflakeAuthenticationType>

const SnowflakeConfigElement: FC<BaseConfigElementProps> = (props) => {
  const { resourceID } = props
  const { t } = useTranslation()
  const { control, watch } = useFormContext()
  const { getResourceByID } = useContext(ResourceGeneratorContext)
  const findResource = getResourceByID(resourceID)

  const content = (findResource?.content ??
    snowflakeResourceInitial) as SnowflakeType
  const authenticationType = watch("authentication", content.authentication)

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
          title={t("editor.action.resource.db.label.account_name")}
          control={control}
          defaultValue={content.accountName}
          rules={[
            {
              validate: validateNotEmpty,
            },
          ]}
          placeholders={[
            t("editor.action.resource.db.placeholder.account_name"),
          ]}
          name="accountName"
        />
        <ControlledElement
          controlledType="input"
          isRequired
          title={t("editor.action.resource.db.label.warehouse")}
          control={control}
          defaultValue={content.warehouse}
          rules={[
            {
              validate: validateNotEmpty,
            },
          ]}
          placeholders={[t("editor.action.resource.db.placeholder.warehouse")]}
          name="warehouse"
        />
        <ControlledElement
          controlledType="input"
          isRequired
          title={t("editor.action.resource.db.label.database")}
          control={control}
          defaultValue={content.database}
          rules={[
            {
              validate: validateNotEmpty,
            },
          ]}
          placeholders={[
            t("editor.action.resource.db.placeholder.snowflake_database"),
          ]}
          name="database"
        />
        <ControlledElement
          controlledType="input"
          title={t("editor.action.resource.db.label.schema")}
          control={control}
          defaultValue={content.schema}
          placeholders={[t("editor.action.resource.db.placeholder.schema")]}
          name="schema"
        />
        <ControlledElement
          controlledType="input"
          title={t("editor.action.resource.db.label.role")}
          control={control}
          defaultValue={content.role}
          placeholders={[t("editor.action.resource.db.placeholder.schema")]}
          name="role"
        />

        <ControlledElement
          controlledType="select"
          control={control}
          isRequired
          rules={[
            {
              required: true,
            },
          ]}
          title={t("editor.action.resource.restapi.label.authentication")}
          name="authentication"
          defaultValue={content.authentication}
          options={AuthenticationOptions}
        />
        {authenticationType === "basic" ? (
          <BasicAuthConfig
            control={control}
            {...(content.authContent as SnowflakeBasicAuthenticationType)}
          />
        ) : (
          <KeyPairConfig
            control={control}
            {...(content.authContent as SnowflakeKeyAuthenticationType)}
          />
        )}
      </div>
    </>
  )
}

SnowflakeConfigElement.displayName = "SnowflakeConfigElement"
export default SnowflakeConfigElement
