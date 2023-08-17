import { USER_ROLE } from "@illa-public/user-data"

export interface UserRoleItem {
  role: USER_ROLE
  tips: string
  name: string
}

export interface RoleSelectorProps {
  currentUserRole: USER_ROLE
  value: USER_ROLE
  onClickItem?: (value: USER_ROLE) => void
  isSelf?: boolean
}
