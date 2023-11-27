import { DigestAuth } from "@illa-public/public-types"
import { FC } from "react"
import { useTranslation } from "react-i18next"
import { ControlledElement } from "../../../ControlledElement"
import { ControlledType } from "../../../ControlledElement/interface"
import { RestApiAuthPanelProps } from "../interface"

const options = [
  {
    title: "editor.action.resource.restapi.label.digest_auth_username",
    name: "username",
    controlledType: "input",
    defaultValue: "",
    required: false,
  },
  {
    title: "editor.action.resource.restapi.label.digest_auth_password",
    name: "password",
    controlledType: "password",
    defaultValue: "",
    required: false,
  },
]

export const DigestAuthPanel: FC<RestApiAuthPanelProps> = (props) => {
  const { control } = props
  const auth = props.auth as DigestAuth

  const { t } = useTranslation()
  return (
    <>
      {options.map((item) => {
        return (
          <ControlledElement
            key={item.name}
            title={t(item.title)}
            defaultValue={
              auth?.[item.name as keyof DigestAuth] ?? item.defaultValue
            }
            name={item.name}
            controlledType={item.controlledType as ControlledType}
            control={control}
            isRequired={item.required}
          />
        )
      })}
    </>
  )
}

DigestAuthPanel.displayName = "DigestAuthPanel"
