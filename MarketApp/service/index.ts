import { publicMarketplaceRequest } from "@illa-public/illa-net"
import { AppProductResponse, PRODUCT_SORT_BY, ProductListParams } from "./interface"

export const fetchAppList = (params: ProductListParams, signal?: AbortSignal) => {
  const {
    page = 0,
    limit = 10,
    sortedBy = PRODUCT_SORT_BY.POPULAR,
    search,
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
    },
  })
}
