import { publicHashtagRequest } from "@illa-public/illa-net"

export const fetchFuzzySearchHashTag = (keyword: string) => {
  return publicHashtagRequest<{}>({
    method: "GET",
    url: `/search?keyword=${keyword}`,
  })
}
