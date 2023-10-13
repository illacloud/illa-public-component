import { FC } from "react"
import { useTranslation } from "react-i18next"
import { validate } from "../../../../utils/validate"
import { ControlledElement } from "../../../ControlledElement"
import { BearerAuthPanelProps } from "./interface"

export const BearerAuthPanel: FC<BearerAuthPanelProps> = (props) => {
  const { control, auth } = props
  const { t } = useTranslation()

  return (
    <ControlledElement
      title={t("editor.action.resource.restapi.label.bearerToken")}
      defaultValue={auth?.bearerToken ?? ""}
      name="bearerToken"
      controlledType="input"
      control={control}
      isRequired
      rules={[
        {
          validate,
        },
      ]}
    />
  )
}

BearerAuthPanel.displayName = "BearerAuthPanel"
