import { FC, useMemo } from "react"
import {
  AuthHiddenProps,
  SHOW_RULES,
} from "@/illa-public-component/AuthShown/interface"
import {
  isBiggerThenTargetRole,
  isSmallThenTargetRole,
} from "@/illa-public-component/MemberList/utils"

export const AuthShown: FC<AuthHiddenProps> = (props) => {
  const { currentUserRole, children, allowRoles, rules } = props
  const canShow = useMemo(() => {
    switch (rules) {
      case SHOW_RULES.SMALLER: {
        const allowRole = allowRoles[0]
        return isSmallThenTargetRole(currentUserRole, allowRole)
      }
      case SHOW_RULES.BIGGER: {
        const allowRole = allowRoles[0]
        return isBiggerThenTargetRole(currentUserRole, allowRole)
      }
      case SHOW_RULES.EQUAL:
      default: {
        return allowRoles.includes(currentUserRole)
      }
    }
  }, [allowRoles, currentUserRole, rules])
  return <>{canShow ? children : null}</>
}

AuthShown.displayName = "AuthShown"
