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
  ) => Promise<unknown>
  deleteApp: (appID: string) => Promise<unknown>
  copyApp: (appID: string) => Promise<unknown>
}
