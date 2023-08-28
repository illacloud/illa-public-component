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

export interface ProductMarketApp {
  app: ProductAppDetail
  marketplace: MarketplaceInfo
}

export enum PRODUCT_SORT_BY {
  POPULAR = "popular",
  LATEST = "latest",
  STARRED = "starred",
}

export interface AppProductResponse {
  products: ProductMarketApp[]
  total: number
  pageSize: number
  pageIndex: number
  hasMore: boolean
}

export interface ProductListParams {
  page: number
  limit: number
  sortedBy: PRODUCT_SORT_BY
  search?: string
}