import { publicHashtagRequest } from "@illa-public/illa-net"
import { FuzzySearchHashTag, HashtagByIdResponse } from "./interface"

export const fetchFuzzySearchHashTag = (keyword: string) => {
  return publicHashtagRequest<FuzzySearchHashTag>({
    method: "GET",
    url: `/search?keyword=${keyword}`,
  })
}

export const fetchHashtagByID = (hashtagID: string) => {
  return publicHashtagRequest<HashtagByIdResponse>({
    method: "GET",
    url: `/${hashtagID}`,
  })
}
