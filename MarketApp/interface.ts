export interface Editor {
  userID: string
  nickname: string
  avatar: string
  email: string
}


export interface ProductAppDetail {
  appID: string
  name: string
  publishedToMarketplace?: boolean
  description: string
  editedBy: Editor[]
}

export interface ContributorTeam {
  teamID: string
  teamIdentifier: string
  icon: string
  name: string
}

export interface MarketplaceInfo {
  marketplaceID?: string
  numStars: number
  numForks: number
  isStarredByCurrentUser?: boolean
  contributorTeam: ContributorTeam
}