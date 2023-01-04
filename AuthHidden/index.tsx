import { FC, useMemo } from "react"
import {
  AuthHiddenProps,
  SHOW_RULES,
} from "@/illa-public-component/AuthHidden/interface"

export const AuthHidden: FC<AuthHiddenProps> = (props) => {
  const { currentUserRole, children, allowRoles, rules } = props
  const canShow = useMemo(() => {
    switch (rules) {
      case SHOW_RULES.BIGGER: {
        const allowRole = allowRoles[0]
        return currentUserRole >= allowRole
      }
      case SHOW_RULES.EQUAL:
      default: {
        return allowRoles.includes(currentUserRole)
      }
    }
  }, [allowRoles, currentUserRole, rules])
  return canShow ? children : null
}
