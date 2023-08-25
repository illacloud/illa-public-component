import { LayoutAutoChange } from "@illa-public/layout-auto-change"
import { FC } from "react"
import { MarketShareAgentProps } from "./interface"
import { MarketShareAgentPC } from "./pc"
import { MarketShareAgentMobile } from "./mobile"


export const MarketShareAgent: FC<MarketShareAgentProps> = (props) => {
  return (
    <LayoutAutoChange
      desktopPage={<MarketShareAgentPC {...props} />}
      mobilePage={<MarketShareAgentMobile {...props} />}
    />
  )
}

MarketShareAgent.displayName = "MarketShareAgent"