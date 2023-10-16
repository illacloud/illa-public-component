import { USER_ROLE } from "@illa-public/user-data"

export interface TagControllerProps {
  teamID: string
  productID: string
  productType: ProductType
  userRoleForThisProduct: USER_ROLE
  onUpdateHashtags: (hashtags: string[]) => void
}

export enum ProductType {
  UNIT_TYPE_APP = 8,
  UNIT_TYPE_AI_AGENT = 29,
}