import { USER_ROLE } from "@illa-public/public-types"
import {
  isBiggerThanTargetRole,
  isSmallThanTargetRole,
} from "@illa-public/user-role-utils"
import { FC, useMemo } from "react"
import { AuthHiddenProps, SHOW_RULES } from "./interface"

export * from "./interface"

export const canAuthShow = (
  currentUserRole: USER_ROLE,
  allowRoles: USER_ROLE[],
  rules: SHOW_RULES,
) => {
  switch (rules) {
    case SHOW_RULES.SMALLER: {
      const allowRole = allowRoles[0]
      return isSmallThanTargetRole(allowRole, currentUserRole)
    }
    case SHOW_RULES.BIGGER: {
      const allowRole = allowRoles[0]
      return isBiggerThanTargetRole(allowRole, currentUserRole)
    }
    case SHOW_RULES.EQUAL:
    default: {
      return allowRoles.includes(currentUserRole)
    }
  }
}

export const AuthShown: FC<AuthHiddenProps> = (props) => {
  const { currentUserRole, children, allowRoles, rules } = props
  const canShow = useMemo(() => {
    return canAuthShow(currentUserRole, allowRoles, rules)
  }, [allowRoles, currentUserRole, rules])

  return <>{canShow ? children : null}</>
}

AuthShown.displayName = "AuthShown"
