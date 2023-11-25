import { FC } from "react"
import { Divider } from "@illa-design/react"
import { ConfigElement } from "../ConfigElements"
import { ConfigElementProvider } from "../ConfigElements/provider"
import { Header } from "../ResourceHeader"
import { TipPanel } from "../TipPanel"
import { ResourceCreatePanelProps } from "./interface"
import {
  containerStyle,
  innerContainerStyle,
  outerContainerStyle,
} from "./style"

export const ResourceCreatePanel: FC<ResourceCreatePanelProps> = (props) => {
  const { resourceType, resourceID, handleOnClickBack } = props
  return (
    <ConfigElementProvider resourceType={resourceType} resourceID={resourceID}>
      <div css={innerContainerStyle}>
        <Header resourceType={resourceType} onClickBack={handleOnClickBack} />
        <Divider />
        <div css={outerContainerStyle}>
          <div css={containerStyle}>
            <ConfigElement
              resourceType={resourceType}
              resourceID={resourceID}
            />
            <TipPanel resourceType={resourceType} />
          </div>
        </div>
      </div>
    </ConfigElementProvider>
  )
}
