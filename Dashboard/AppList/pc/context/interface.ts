export interface AppListContextInject {
  updateAppConfig: (
    appID: string,
    config: {
      public?: boolean
      waterMark?: boolean
      description?: string
      appName?: string
      publishedToMarketplace?: boolean
    },
  ) => void
  deleteApp: (appID: string) => void
  copyApp: (appID: string) => void
}
