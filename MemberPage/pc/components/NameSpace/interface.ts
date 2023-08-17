import { USER_STATUS } from "@illa-public/user-data"

export interface NameSpaceProps {
  name: string
  avatar: string
  email: string
  status: USER_STATUS
  userID: string
  currentUserID: string
}
