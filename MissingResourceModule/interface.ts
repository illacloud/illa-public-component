import { USER_ROLE } from "@illa-public/public-types"
import { ReactNode } from "react"

export enum SHOW_RULES {
  "BIGGER" = "BIGGER",
  "SMALLER" = "SMALLER",
  "EQUAL" = "EQUAL",
}

export interface AuthHiddenProps {
  currentUserRole: USER_ROLE
  children: ReactNode
  allowRoles: USER_ROLE[]
  rules: SHOW_RULES
}
