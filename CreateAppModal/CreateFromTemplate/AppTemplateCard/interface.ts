import { BoxProps } from "@illa-design/react"
import { CreateFromTemplateProps } from "../interface"

export type CardSize = "normal" | "large"

export interface AppTemplateCardProps
  extends Pick<CreateFromTemplateProps, "handleForkApp" | "closeModal">,
    BoxProps {
  showAppDescription?: boolean
  size?: CardSize
  appID: string
  appName: string
  cover: string
  appDescription?: string
  teamIdentifier?: string
}
