import { LayoutAutoChange } from "@illa-public/layout-auto-change"
import { FC } from "react"
import { MarketShareAgentProps } from "./interface"
import { MarketShareAgentPC } from "./pc"


export const MarketShareAgent: FC<MarketShareAgentProps> = (props) => {
  return (
    <LayoutAutoChange
      desktopPage={<MarketShareAgentPC {...props} />}
      mobilePage={<MarketShareAgentPC {...props} />}
    />
  )
}

MarketShareAgent.displayName = "MarketShareAgent"