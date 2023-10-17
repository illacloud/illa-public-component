import { USER_ROLE } from "@illa-public/user-data"
import { HASHTAG_REQUEST_TYPE } from "../../constants"

export interface TagControllerProps {
  teamID?: string
  productID: string
  productType: HASHTAG_REQUEST_TYPE
  defaultAppContribute: boolean
  userRoleForThisProduct: USER_ROLE
  showSave: boolean
  onTagChange?: (tags: string[]) => void
}
