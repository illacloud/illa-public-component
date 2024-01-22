export interface ActionsDetail {
  actionID: string
  resourceID: string
  name: string
  type: string
  icon: string
}

export interface Config {
  description: string
  components: string[]
  actions: ActionsDetail[]
}

export interface Editor {
  userID: string
  nickname: string
  avatar: string
  email: string
}

export interface ProductAppDetail {
  appId: string
  appName: string
  publishedToMarketplace?: boolean
  description: string
  editedBy: Editor[]
  config: Config
}

export interface ContributorTeam {
  teamID: string
  teamIdentifier: string
  icon: string
  name: string
}

export interface MarketplaceConfig {
  cover: string
}
export interface MarketplaceInfo {
  marketplaceID?: string
  numStars: number
  numForks: number
  hashtags: string[]
  config: MarketplaceConfig
  isStarredByCurrentUser?: boolean
  contributorTeam: ContributorTeam
}
