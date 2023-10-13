export interface AppCardActionItemProps {
  appID: string
  appDeployed: boolean
  appName: string
  appConfig: {
    public: boolean
    publishedToMarketplace: boolean
    description?: string
  }
}
