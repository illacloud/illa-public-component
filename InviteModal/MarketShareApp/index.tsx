import { LayoutAutoChange } from "@illa-public/layout-auto-change"
import { FC } from "react"
import { MarketShareAppProps } from "./interface"
import { MarketShareAppMobile } from "./mobile"
import { MarketShareAppPC } from "./pc"

export const MarketShareApp: FC<MarketShareAppProps> = (props) => {
  return (
    <LayoutAutoChange
      desktopPage={<MarketShareAppPC {...props} />}
      mobilePage={<MarketShareAppMobile {...props} />}
    />
  )
}

MarketShareApp.displayName = "MarketShareApp"
