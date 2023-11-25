import { RestAPIBasicAuth } from "@illa-public/public-types"
import { FC } from "react"
import { useTranslation } from "react-i18next"
import { validateNotEmpty } from "../../../../utils"
import { ControlledElement } from "../../../ControlledElement"
import { RestApiAuthPanelProps } from "../interface"

export const BasicAuthPanel: FC<RestApiAuthPanelProps> = (props) => {
  const { control } = props
  const auth = props.auth as RestAPIBasicAuth
  const { t } = useTranslation()

  return (
    <>
      <ControlledElement
        title={t("editor.action.resource.restapi.label.basic_auth_username")}
        defaultValue={auth?.username ?? ""}
        name="username"
        isRequired
        controlledType="input"
        control={control}
        rules={[
          {
            validate: validateNotEmpty,
          },
        ]}
      />
      <ControlledElement
        title={t("editor.action.resource.restapi.label.basic_auth_password")}
        defaultValue={auth?.password ?? ""}
        name="password"
        isRequired
        controlledType="password"
        control={control}
        rules={[
          {
            required: true,
          },
        ]}
      />
    </>
  )
}

BasicAuthPanel.displayName = "BasicAuthPanel"
