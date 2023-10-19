export interface AppActivity {
  modifier: string
  modifiedAt: string
}

export interface AppConfig {
  public: boolean
  waterMark: boolean
  publishedToMarketplace: boolean
  description?: string
}

export interface EditorInfo {
  userID: string
  nickname: string
  avatar: string
  email: string
  editedAt: string
}

export interface AppInfoShape {
  appId: string
  appName: string
  deployed: boolean
  updatedAt: string
  updatedBy: string
  appActivity: AppActivity
  config: AppConfig
  editedBy?: EditorInfo[]
}
