import { DigestAuth } from "@illa-public/public-types"
import { FC } from "react"
import { ControlledElement } from "../../../ControlledElement"
import { ControlledType } from "../../../ControlledElement/interface"
import { RestApiAuthPanelProps } from "../interface"
import { DigestAuthInfo } from "../values"

export const DigestAuthPanel: FC<RestApiAuthPanelProps> = (props) => {
  const { control } = props
  const auth = props.auth as DigestAuth

  return (
    <>
      {DigestAuthInfo.map((item) => {
        return (
          <ControlledElement
            key={item.name}
            title={item.title}
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
