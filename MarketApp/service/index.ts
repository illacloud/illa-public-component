import {
  marketplaceRequest,
  publicMarketplaceRequest,
} from "@illa-public/illa-net"
import {
  AppProductResponse,
  PRODUCT_SORT_BY,
  ProductListParams,
} from "./interface"

export const fetchAppList = (
  params: ProductListParams,
  signal?: AbortSignal,
) => {
  const {
    page = 1,
    limit = 10,
    sortedBy = PRODUCT_SORT_BY.POPULAR,
    search,
    tag,
  } = params
  return publicMarketplaceRequest<AppProductResponse>({
    url: "/apps",
    method: "GET",
    signal: signal,
    params: {
      page,
      limit,
      sortedBy,
      search,
      tag,
    },
  })
}

export const fetchStarAppList = (
  params: ProductListParams,
  signal?: AbortSignal,
) => {
  const {
    page = 1,
    limit = 10,
    sortedBy = PRODUCT_SORT_BY.STARRED,
    search,
    tag,
  } = params
  return marketplaceRequest<AppProductResponse>({
    url: "/apps",
    method: "GET",
    signal: signal,
    params: {
      page,
      limit,
      sortedBy,
      search,
      tag,
    },
  })
}

export const fetchAuthMarketAppList = (
  params: ProductListParams,
  signal?: AbortSignal,
) => {
  const { sortedBy = PRODUCT_SORT_BY.STARRED } = params
  if (sortedBy === PRODUCT_SORT_BY.STARRED) {
    return fetchStarAppList(params, signal)
  } else {
    return fetchAppList(params, signal)
  }
}
