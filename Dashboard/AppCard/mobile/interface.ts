import { EditorInfo } from "@illa-public/public-types"
import { ActivityInfo } from "@illa-public/public-types"

export interface MobileCardItemProps {
  appName: string
  appID: string
  appDeployed: boolean
  publishedToMarketplace: boolean
  appActivity: ActivityInfo
  description?: string
  editorInfo?: EditorInfo[]
  showLaunchButton?: boolean
}
