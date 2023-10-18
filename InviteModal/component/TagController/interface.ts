import { HASHTAG_REQUEST_TYPE } from "../../constants"

export interface TagControllerProps {
  productID: string
  productType: HASHTAG_REQUEST_TYPE
  productContributed: boolean
  onTagChange?: (tags: string[]) => void
}