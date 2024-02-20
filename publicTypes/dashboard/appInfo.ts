import { ActivityInfo, EditorInfo } from "./publicInfo"

export enum APP_TYPE {
  "PC" = "pc",
  "MOBILE" = "mobile",
}
export interface AppConfig {
  public: boolean
  waterMark: boolean
  publishedToMarketplace: boolean
  publishWithAIAgent: boolean
  description?: string
  appType: APP_TYPE
}

export interface AppInfoShape {
  appId: string
  appName: string
  deployed: boolean
  updatedAt: string
  updatedBy: string
  appActivity: ActivityInfo
  config: AppConfig
  editedBy?: EditorInfo[]
}
