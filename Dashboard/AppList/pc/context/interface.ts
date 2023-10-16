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
  deleteApp: (appID: string) => Promise<{ appID: string }>
  copyApp: (appID: string) => void
}
