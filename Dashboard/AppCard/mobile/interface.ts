import { AppActivity, EditorInfo } from "@illa-public/public-types"

export interface MobileCardItemProps {
  appName: string
  appID: string
  appDeployed: boolean
  publishedToMarketplace: boolean
  appActivity: AppActivity
  description?: string
  editorInfo?: EditorInfo[]
}
