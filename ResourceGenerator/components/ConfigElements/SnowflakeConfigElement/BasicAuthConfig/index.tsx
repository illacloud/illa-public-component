import { SnowflakeBasicAuthenticationType } from "@illa-public/public-types"
import { FC } from "react"
import { Control } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { validateNotEmpty } from "../../../../utils"
import { ControlledElement } from "../../../ControlledElement"

export const BasicAuthConfig: FC<
  SnowflakeBasicAuthenticationType & {
    control: Control
  }
> = (props) => {
  const { username, password, control } = props
  const { t } = useTranslation()

  return (
    <>
      <ControlledElement
        controlledType="input"
        control={control}
        isRequired
        rules={[
          {
            validate: validateNotEmpty,
          },
        ]}
        title={t("editor.action.resource.db.label.username")}
        name="username"
        defaultValue={username}
        placeholders={[
          t("editor.action.resource.db.placeholder.snowflake_username"),
        ]}
      />
      <ControlledElement
        controlledType="password"
        control={control}
        isRequired
        rules={[
          {
            required: true,
          },
        ]}
        title={t("editor.action.resource.db.label.password")}
        name="password"
        defaultValue={password}
        placeholders={[
          t("editor.action.resource.db.placeholder.snowflake_password"),
        ]}
      />
    </>
  )
}

BasicAuthConfig.displayName = "BasicAuthConfig"
