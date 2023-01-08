import { USER_ROLE } from "./interface"

export const USER_ROLE_ARRAY = [
  USER_ROLE.OWNER,
  USER_ROLE.ADMIN,
  USER_ROLE.EDITOR,
  USER_ROLE.VIEWER,
  USER_ROLE.CUSTOM,
]
export const userRoleMapI18nString = {
  [USER_ROLE.CUSTOM]: "Custom",
  [USER_ROLE.OWNER]: "user_management.role.owner",
  [USER_ROLE.ADMIN]: "user_management.role.admin",
  [USER_ROLE.EDITOR]: "user_management.role.editor",
  [USER_ROLE.VIEWER]: "user_management.role.viewer",
  [USER_ROLE.GUEST]: "Guest",
}

export const filterUserRole = (
  roles: USER_ROLE[],
  filterRole: USER_ROLE[] = [],
) => {
  if (Array.isArray(filterRole) && filterRole.length > 0) {
    return roles.filter((role) => !filterRole.includes(role))
  }
  return roles
}
export const getSmallThenTargetRole = (
  targetRole: USER_ROLE,
  notHasSelf: boolean = true,
  filterRole: USER_ROLE[] = [],
) => {
  const targetRoleIndex = USER_ROLE_ARRAY.indexOf(targetRole)
  const result = notHasSelf
    ? USER_ROLE_ARRAY.slice(targetRoleIndex + 1)
    : USER_ROLE_ARRAY.slice(targetRoleIndex)
  return filterUserRole(result, filterRole)
}

export const getBiggerThenTargetRole = (
  targetRole: USER_ROLE,
  notHasSelf: boolean = true,
  filterRole: USER_ROLE[] = [],
) => {
  const targetRoleIndex = USER_ROLE_ARRAY.indexOf(targetRole)
  const result = notHasSelf
    ? USER_ROLE_ARRAY.slice(0, targetRoleIndex)
    : USER_ROLE_ARRAY.slice(0, targetRoleIndex + 1)
  return filterUserRole(result, filterRole)
}

export const isSmallThenTargetRole = (
  targetRole: USER_ROLE,
  currentUserRole: USER_ROLE,
  isEqual: boolean = true,
) => {
  const targetRoleIndex = USER_ROLE_ARRAY.indexOf(targetRole)
  const currentUserRoleIndex = USER_ROLE_ARRAY.indexOf(currentUserRole)
  if (targetRoleIndex === -1 || currentUserRoleIndex === -1) return true
  return isEqual
    ? currentUserRoleIndex >= targetRoleIndex
    : currentUserRoleIndex > targetRoleIndex
}

export const isBiggerThenTargetRole = (
  targetRole: USER_ROLE,
  currentUserRole: USER_ROLE,
  isEqual: boolean = true,
) => {
  const targetRoleIndex = USER_ROLE_ARRAY.indexOf(targetRole)
  const currentUserRoleIndex = USER_ROLE_ARRAY.indexOf(currentUserRole)
  if (targetRoleIndex === -1 || currentUserRoleIndex === -1) return false
  return isEqual
    ? currentUserRoleIndex <= targetRoleIndex
    : currentUserRoleIndex < targetRoleIndex
}
