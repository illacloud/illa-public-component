import { USER_ROLE, USER_ROLE_ARRAY } from "@/store/userInfo/userInfoState"

export const filterUserRole = (
  roles: USER_ROLE[],
  filterRole: USER_ROLE[] = [],
) => {
  if (Array.isArray(filterRole) && filterRole.length > 0) {
    return roles.filter((role) => !filterRole.includes(role))
  }
  return roles
}
export const geSmallThenTargetRole = (
  targetRole: USER_ROLE,
  notHasSelf: boolean = true,
  filterRole: USER_ROLE[] = [],
) => {
  const targetRoleIndex = USER_ROLE_ARRAY.indexOf(targetRole)
  const result = notHasSelf
    ? USER_ROLE_ARRAY.slice(targetRoleIndex + 1)
    : USER_ROLE_ARRAY.slice(targetRoleIndex)
  console.log("result", result)
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
) => {
  const targetRoleIndex = USER_ROLE_ARRAY.indexOf(targetRole)
  const currentUserRoleIndex = USER_ROLE_ARRAY.indexOf(currentUserRole)
  return currentUserRoleIndex >= targetRoleIndex
}

export const isBiggerThenTargetRole = (
  targetRole: USER_ROLE,
  currentUserRole: USER_ROLE,
) => {
  const targetRoleIndex = USER_ROLE_ARRAY.indexOf(targetRole)
  const currentUserRoleIndex = USER_ROLE_ARRAY.indexOf(currentUserRole)
  return currentUserRoleIndex <= targetRoleIndex
}
