import { MarketplaceInfo, ProductAppDetail } from "../interface"

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