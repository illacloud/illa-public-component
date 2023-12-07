import { ActivityInfo, EditorInfo } from "./publicInfo"

export interface AppConfig {
  public: boolean
  waterMark: boolean
  publishedToMarketplace: boolean
  publishWithAIAgent: boolean
  description?: string
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
