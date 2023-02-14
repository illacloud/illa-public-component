import {
  ACTION_ACCESS,
  ACTION_DELETE,
  ACTION_MANAGE,
  ACTION_SPECIAL,
  ATTRIBUTE_CATEGORY,
  ATTRIBUTE_GROUP,
  USER_ROLE,
} from "./interface"

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
export const getSmallThanTargetRole = (
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

export const getBiggerThanTargetRole = (
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

export const isSmallThanTargetRole = (
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

export const isBiggerThanTargetRole = (
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

interface AttributeConfigList {
  [key: string]: {
    [key: string]: {
      [key: string]: {
        [key: string]: boolean
      }
    }
  }
}

export const attributeConfigList: AttributeConfigList = {
  [ATTRIBUTE_CATEGORY.ACCESS]: {
    [USER_ROLE.OWNER]: {
      [ATTRIBUTE_GROUP.TEAM]: { [ACTION_ACCESS.VIEW]: true },
      [ATTRIBUTE_GROUP.TEAM_MEMBER]: { [ACTION_ACCESS.VIEW]: true },
      [ATTRIBUTE_GROUP.USER]: { [ACTION_ACCESS.VIEW]: true },
      [ATTRIBUTE_GROUP.INVITE]: {
        [ACTION_ACCESS.VIEW]: true,
        [ACTION_ACCESS.INVITE_BY_LINK]: true,
        [ACTION_ACCESS.INVITE_BY_EMAIL]: true,
        [ACTION_ACCESS.INVITE_ADMIN]: true,
        [ACTION_ACCESS.INVITE_EDITOR]: true,
        [ACTION_ACCESS.INVITE_VIEWER]: true,
      },
      [ATTRIBUTE_GROUP.DOMAIN]: { [ACTION_ACCESS.VIEW]: true },
      [ATTRIBUTE_GROUP.BILLING]: { [ACTION_ACCESS.VIEW]: true },
      [ATTRIBUTE_GROUP.APP]: { [ACTION_ACCESS.VIEW]: true },
      [ATTRIBUTE_GROUP.RESOURCE]: { [ACTION_ACCESS.VIEW]: true },
      [ATTRIBUTE_GROUP.HUB]: { [ACTION_ACCESS.VIEW]: true },
    },
    [USER_ROLE.ADMIN]: {
      [ATTRIBUTE_GROUP.TEAM]: { [ACTION_ACCESS.VIEW]: true },
      [ATTRIBUTE_GROUP.TEAM_MEMBER]: { [ACTION_ACCESS.VIEW]: true },
      [ATTRIBUTE_GROUP.USER]: { [ACTION_ACCESS.VIEW]: true },
      [ATTRIBUTE_GROUP.INVITE]: {
        [ACTION_ACCESS.VIEW]: true,
        [ACTION_ACCESS.INVITE_BY_LINK]: true,
        [ACTION_ACCESS.INVITE_BY_EMAIL]: true,
        [ACTION_ACCESS.INVITE_ADMIN]: true,
        [ACTION_ACCESS.INVITE_EDITOR]: true,
        [ACTION_ACCESS.INVITE_VIEWER]: true,
      },
      [ATTRIBUTE_GROUP.DOMAIN]: { [ACTION_ACCESS.VIEW]: true },
      [ATTRIBUTE_GROUP.APP]: { [ACTION_ACCESS.VIEW]: true },
      [ATTRIBUTE_GROUP.RESOURCE]: { [ACTION_ACCESS.VIEW]: true },
      [ATTRIBUTE_GROUP.HUB]: { [ACTION_ACCESS.VIEW]: true },
    },
    [USER_ROLE.EDITOR]: {
      [ATTRIBUTE_GROUP.TEAM_MEMBER]: { [ACTION_ACCESS.VIEW]: true },
      [ATTRIBUTE_GROUP.USER]: { [ACTION_ACCESS.VIEW]: true },
      [ATTRIBUTE_GROUP.INVITE]: {
        [ACTION_ACCESS.VIEW]: true,
        [ACTION_ACCESS.INVITE_BY_LINK]: true,
        [ACTION_ACCESS.INVITE_BY_EMAIL]: true,
        [ACTION_ACCESS.INVITE_EDITOR]: true,
        [ACTION_ACCESS.INVITE_VIEWER]: true,
      },
      [ATTRIBUTE_GROUP.APP]: { [ACTION_ACCESS.VIEW]: true },
      [ATTRIBUTE_GROUP.RESOURCE]: { [ACTION_ACCESS.VIEW]: true },
      [ATTRIBUTE_GROUP.HUB]: { [ACTION_ACCESS.VIEW]: true },
    },
    [USER_ROLE.VIEWER]: {
      [ATTRIBUTE_GROUP.TEAM_MEMBER]: { [ACTION_ACCESS.VIEW]: true },
      [ATTRIBUTE_GROUP.USER]: { [ACTION_ACCESS.VIEW]: true },
      [ATTRIBUTE_GROUP.INVITE]: {
        [ACTION_ACCESS.VIEW]: true,
        [ACTION_ACCESS.INVITE_BY_LINK]: true,
        [ACTION_ACCESS.INVITE_BY_EMAIL]: true,
        [ACTION_ACCESS.INVITE_VIEWER]: true,
      },
      [ATTRIBUTE_GROUP.APP]: { [ACTION_ACCESS.VIEW]: true },
    },
  },
  [ATTRIBUTE_CATEGORY.DELETE]: {
    [USER_ROLE.OWNER]: {
      [ATTRIBUTE_GROUP.TEAM]: { [ACTION_DELETE.DELETE]: true },
      [ATTRIBUTE_GROUP.TEAM_MEMBER]: { [ACTION_DELETE.DELETE]: true },
      [ATTRIBUTE_GROUP.USER]: { [ACTION_DELETE.DELETE]: true },
      [ATTRIBUTE_GROUP.INVITE]: { [ACTION_DELETE.DELETE]: true },
      [ATTRIBUTE_GROUP.DOMAIN]: {
        [ACTION_DELETE.TEAM_DOMAIN]: true,
        [ACTION_DELETE.APP_DOMAIN]: true,
      },
      [ATTRIBUTE_GROUP.BILLING]: { [ACTION_DELETE.DELETE]: true },
      [ATTRIBUTE_GROUP.APP]: { [ACTION_DELETE.DELETE]: true },
      [ATTRIBUTE_GROUP.RESOURCE]: { [ACTION_DELETE.DELETE]: true },
      [ATTRIBUTE_GROUP.HUB]: { [ACTION_DELETE.DELETE]: true },
    },
    [USER_ROLE.ADMIN]: {
      [ATTRIBUTE_GROUP.TEAM_MEMBER]: { [ACTION_DELETE.DELETE]: true },
      [ATTRIBUTE_GROUP.USER]: { [ACTION_DELETE.DELETE]: true },
      [ATTRIBUTE_GROUP.INVITE]: { [ACTION_DELETE.DELETE]: true },
      [ATTRIBUTE_GROUP.DOMAIN]: {
        [ACTION_DELETE.TEAM_DOMAIN]: true,
        [ACTION_DELETE.APP_DOMAIN]: true,
      },
      [ATTRIBUTE_GROUP.APP]: { [ACTION_DELETE.DELETE]: true },
      [ATTRIBUTE_GROUP.RESOURCE]: { [ACTION_DELETE.DELETE]: true },
      [ATTRIBUTE_GROUP.HUB]: { [ACTION_DELETE.DELETE]: true },
    },
    [USER_ROLE.EDITOR]: {
      [ATTRIBUTE_GROUP.USER]: { [ACTION_DELETE.DELETE]: true },
      [ATTRIBUTE_GROUP.APP]: { [ACTION_DELETE.DELETE]: true },
      [ATTRIBUTE_GROUP.RESOURCE]: { [ACTION_DELETE.DELETE]: true },
      [ATTRIBUTE_GROUP.HUB]: { [ACTION_DELETE.DELETE]: true },
    },
    [USER_ROLE.VIEWER]: {
      [ATTRIBUTE_GROUP.USER]: { [ACTION_DELETE.DELETE]: true },
    },
  },
  [ATTRIBUTE_CATEGORY.MANAGE]: {
    [USER_ROLE.OWNER]: {
      [ATTRIBUTE_GROUP.TEAM]: {
        [ACTION_MANAGE.TEAM_NAME]: true,
        [ACTION_MANAGE.TEAM_ICON]: true,
        [ACTION_MANAGE.UPDATE_TEAM_DOMAIN]: true,
        [ACTION_MANAGE.TEAM_CONFIG]: true,
      },
      [ATTRIBUTE_GROUP.TEAM_MEMBER]: {
        [ACTION_MANAGE.REMOVE_MEMBER]: true,
        [ACTION_MANAGE.ROLE]: true,
        [ACTION_MANAGE.ROLE_FROM_OWNER]: true,
        [ACTION_MANAGE.ROLE_FROM_ADMIN]: true,
        [ACTION_MANAGE.ROLE_FROM_EDITOR]: true,
        [ACTION_MANAGE.ROLE_FROM_VIEWER]: true,
        [ACTION_MANAGE.ROLE_TO_OWNER]: true,
        [ACTION_MANAGE.ROLE_TO_ADMIN]: true,
        [ACTION_MANAGE.ROLE_TO_EDITOR]: true,
        [ACTION_MANAGE.ROLE_TO_VIEWER]: true,
      },
      [ATTRIBUTE_GROUP.USER]: {
        [ACTION_MANAGE.RENAME_USER]: true,
        [ACTION_MANAGE.UPDATE_USER_AVATAR]: true,
      },
      [ATTRIBUTE_GROUP.INVITE]: {
        [ACTION_MANAGE.CONFIG_INVITE]: true,
        [ACTION_MANAGE.INVITE_LINK]: true,
      },
      [ATTRIBUTE_GROUP.DOMAIN]: {
        [ACTION_MANAGE.TEAM_DOMAIN]: true,
        [ACTION_MANAGE.APP_DOMAIN]: true,
      },
      [ATTRIBUTE_GROUP.BILLING]: { [ACTION_MANAGE.PAYMENT_INFO]: true },
      [ATTRIBUTE_GROUP.APP]: {
        [ACTION_MANAGE.CREATE_APP]: true,
        [ACTION_MANAGE.EDIT_APP]: true,
      },
      [ATTRIBUTE_GROUP.RESOURCE]: {
        [ACTION_MANAGE.CREATE_RESOURCE]: true,
        [ACTION_MANAGE.EDIT_RESOURCE]: true,
      },
      [ATTRIBUTE_GROUP.HUB]: {},
    },
    [USER_ROLE.ADMIN]: {
      [ATTRIBUTE_GROUP.TEAM]: {
        [ACTION_MANAGE.TEAM_NAME]: true,
        [ACTION_MANAGE.TEAM_ICON]: true,
        [ACTION_MANAGE.UPDATE_TEAM_DOMAIN]: true,
        [ACTION_MANAGE.TEAM_CONFIG]: true,
      },
      [ATTRIBUTE_GROUP.TEAM_MEMBER]: {
        [ACTION_MANAGE.REMOVE_MEMBER]: true,
        [ACTION_MANAGE.ROLE]: true,
        [ACTION_MANAGE.ROLE_FROM_ADMIN]: true,
        [ACTION_MANAGE.ROLE_FROM_EDITOR]: true,
        [ACTION_MANAGE.ROLE_FROM_VIEWER]: true,
        [ACTION_MANAGE.ROLE_TO_ADMIN]: true,
        [ACTION_MANAGE.ROLE_TO_EDITOR]: true,
        [ACTION_MANAGE.ROLE_TO_VIEWER]: true,
      },
      [ATTRIBUTE_GROUP.USER]: {
        [ACTION_MANAGE.RENAME_USER]: true,
        [ACTION_MANAGE.UPDATE_USER_AVATAR]: true,
      },
      [ATTRIBUTE_GROUP.INVITE]: {
        [ACTION_MANAGE.CONFIG_INVITE]: true,
        [ACTION_MANAGE.INVITE_LINK]: true,
      },
      [ATTRIBUTE_GROUP.DOMAIN]: {
        [ACTION_MANAGE.TEAM_DOMAIN]: true,
        [ACTION_MANAGE.APP_DOMAIN]: true,
      },
      [ATTRIBUTE_GROUP.APP]: {
        [ACTION_MANAGE.CREATE_APP]: true,
        [ACTION_MANAGE.EDIT_APP]: true,
      },
      [ATTRIBUTE_GROUP.RESOURCE]: {
        [ACTION_MANAGE.CREATE_RESOURCE]: true,
        [ACTION_MANAGE.EDIT_RESOURCE]: true,
      },
      [ATTRIBUTE_GROUP.HUB]: {},
    },
    [USER_ROLE.EDITOR]: {
      [ATTRIBUTE_GROUP.USER]: {
        [ACTION_MANAGE.RENAME_USER]: true,
        [ACTION_MANAGE.UPDATE_USER_AVATAR]: true,
      },
      [ATTRIBUTE_GROUP.APP]: {
        [ACTION_MANAGE.CREATE_APP]: true,
        [ACTION_MANAGE.EDIT_APP]: true,
      },
      [ATTRIBUTE_GROUP.RESOURCE]: {
        [ACTION_MANAGE.CREATE_RESOURCE]: true,
        [ACTION_MANAGE.EDIT_RESOURCE]: true,
      },
      [ATTRIBUTE_GROUP.HUB]: {},
    },
    [USER_ROLE.VIEWER]: {
      [ATTRIBUTE_GROUP.USER]: {
        [ACTION_MANAGE.RENAME_USER]: true,
        [ACTION_MANAGE.UPDATE_USER_AVATAR]: true,
      },
      [ATTRIBUTE_GROUP.HUB]: {},
    },
  },
  [ATTRIBUTE_CATEGORY.SPECIAL]: {
    [USER_ROLE.OWNER]: {
      [ATTRIBUTE_GROUP.TEAM]: {
        [ACTION_SPECIAL.EDITOR_AND_VIEWER_CAN_INVITE_BY_LINK_SW]: true,
      },
      [ATTRIBUTE_GROUP.TEAM_MEMBER]: { [ACTION_SPECIAL.TRANSFER_OWNER]: true },
      [ATTRIBUTE_GROUP.INVITE]: { [ACTION_SPECIAL.INVITE_LINK_RENEW]: true },
    },
    [USER_ROLE.ADMIN]: {
      [ATTRIBUTE_GROUP.TEAM]: {
        [ACTION_SPECIAL.EDITOR_AND_VIEWER_CAN_INVITE_BY_LINK_SW]: true,
      },
      [ATTRIBUTE_GROUP.INVITE]: { [ACTION_SPECIAL.INVITE_LINK_RENEW]: true },
    },
    [USER_ROLE.EDITOR]: {},
    [USER_ROLE.VIEWER]: {},
  },
}

interface InviteRoleAttributeMap {
  [key: string]: number
}

export const inviteRoleAttributeMap: InviteRoleAttributeMap = {
  [USER_ROLE.OWNER]: ACTION_ACCESS.INVITE_OWNER,
  [USER_ROLE.ADMIN]: ACTION_ACCESS.INVITE_ADMIN,
  [USER_ROLE.EDITOR]: ACTION_ACCESS.INVITE_EDITOR,
  [USER_ROLE.VIEWER]: ACTION_ACCESS.INVITE_VIEWER,
}

// this config map target role to target manage user role attribute
// e.g. you want to modify a user to role USER_ROLE_EDITOR, so it's mapped attribute is ACTION_MANAGE_ROLE_TO_EDITOR
interface ModifyRoleFromAttributeMap {
  [key: string]: number
}
const modifyRoleFromAttributeMap: ModifyRoleFromAttributeMap = {
  [USER_ROLE.OWNER]: ACTION_MANAGE.ROLE_FROM_OWNER,
  [USER_ROLE.ADMIN]: ACTION_MANAGE.ROLE_FROM_ADMIN,
  [USER_ROLE.EDITOR]: ACTION_MANAGE.ROLE_FROM_EDITOR,
  [USER_ROLE.VIEWER]: ACTION_MANAGE.ROLE_FROM_VIEWER,
}
interface ModifyRoleToAttributeMap {
  [key: string]: number
}
const modifyRoleToAttributeMap: ModifyRoleToAttributeMap = {
  [USER_ROLE.OWNER]: ACTION_MANAGE.ROLE_TO_OWNER,
  [USER_ROLE.ADMIN]: ACTION_MANAGE.ROLE_TO_ADMIN,
  [USER_ROLE.EDITOR]: ACTION_MANAGE.ROLE_TO_EDITOR,
  [USER_ROLE.VIEWER]: ACTION_MANAGE.ROLE_TO_VIEWER,
}

const accessAttribute = attributeConfigList[ATTRIBUTE_CATEGORY.ACCESS]
const deleteAttribute = attributeConfigList[ATTRIBUTE_CATEGORY.DELETE]
const manageAttribute = attributeConfigList[ATTRIBUTE_CATEGORY.MANAGE]
const specialAttribute = attributeConfigList[ATTRIBUTE_CATEGORY.SPECIAL]

export const canAccess = (
  userRole: USER_ROLE,
  attributeGroup: ATTRIBUTE_GROUP,
  attribute: ACTION_ACCESS,
) => {
  return !!accessAttribute[userRole]?.[attributeGroup]?.[attribute]
}
export const canDelete = (
  userRole: USER_ROLE,
  attributeGroup: ATTRIBUTE_GROUP,
  attribute: ACTION_DELETE,
) => {
  return !!deleteAttribute[userRole]?.[attributeGroup]?.[attribute]
}

export const canManage = (
  userRole: USER_ROLE,
  attributeGroup: ATTRIBUTE_GROUP,
  attribute: ACTION_MANAGE,
) => {
  return !!manageAttribute[userRole]?.[attributeGroup]?.[attribute]
}

export const canManageSpecial = (
  userRole: USER_ROLE,
  attributeGroup: ATTRIBUTE_GROUP,
  attribute: ACTION_SPECIAL,
) => {
  return !!specialAttribute[userRole]?.[attributeGroup]?.[attribute]
}

export const canInvite = (userRole: USER_ROLE) => {
  const attribute = inviteRoleAttributeMap[userRole]
  if (!attribute) {
    return false
  }
  return !!accessAttribute[userRole]?.[ATTRIBUTE_GROUP.INVITE]?.[attribute]
}

// [userRole][group]
export const canModifyRoleFromTo = (
  userRole: USER_ROLE,
  attributeGroup: ATTRIBUTE_GROUP,
  fromRole: USER_ROLE,
  toRole: USER_ROLE,
) => {
  const fromAttribute = modifyRoleFromAttributeMap[fromRole]
  const toAttribute = modifyRoleToAttributeMap[toRole]
  if (!fromAttribute || !toAttribute) {
    return false
  }
  const fromResult =
    manageAttribute[userRole]?.[attributeGroup]?.[fromAttribute]
  const toResult = manageAttribute[userRole]?.[attributeGroup]?.[toAttribute]
  if (fromResult == undefined || toResult == undefined) {
    return false
  }
  return fromResult && toResult
}

export const doesNowUserAreEditorOrViewer = (userRole: USER_ROLE) => {
  return userRole === USER_ROLE.EDITOR || userRole === USER_ROLE.VIEWER
}
