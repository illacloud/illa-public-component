import { SUBSCRIBE_PLAN, TeamInfo, USER_ROLE } from "@illa-public/public-types"
import { getPlanUtils } from "@illa-public/user-data"
import { isCloudVersion } from "@illa-public/utils"
import { AttributeConfigList } from "./attributeConfigList"
import { FreePlanAttributeConfigList } from "./freePlanAttributeConfigList"
import {
  ACTION_ACCESS,
  ACTION_DELETE,
  ACTION_MANAGE,
  ACTION_SPECIAL,
  ATTRIBUTE_CATEGORY,
  ATTRIBUTE_GROUP,
} from "./interface"
import { InvalidedSubscribePlanAttributeConfigList } from "./invalidedSubscribePlanAttributeConfigList"
import { SelfHostAttributeConfigList } from "./selfHostAttributeConifgList"

export * from "./interface"

export const USER_ROLE_ARRAY = [
  USER_ROLE.OWNER,
  USER_ROLE.ADMIN,
  USER_ROLE.EDITOR,
  USER_ROLE.VIEWER,
  USER_ROLE.GUEST,
]
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

export const getAttribute = (
  userRole: USER_ROLE,
  attributeGroup: ATTRIBUTE_GROUP,
  teamPlan: SUBSCRIBE_PLAN = SUBSCRIBE_PLAN.TEAM_LICENSE_FREE,
) => {
  if (!isCloudVersion) {
    return {
      accessAttribute:
        SelfHostAttributeConfigList?.[ATTRIBUTE_CATEGORY.ACCESS]?.[userRole]?.[
          attributeGroup
        ],
      deleteAttribute:
        SelfHostAttributeConfigList?.[ATTRIBUTE_CATEGORY.DELETE]?.[userRole]?.[
          attributeGroup
        ],
      manageAttribute:
        SelfHostAttributeConfigList?.[ATTRIBUTE_CATEGORY.MANAGE]?.[userRole]?.[
          attributeGroup
        ],
      specialAttribute:
        SelfHostAttributeConfigList?.[ATTRIBUTE_CATEGORY.SPECIAL]?.[userRole]?.[
          attributeGroup
        ],
    }
  }
  switch (teamPlan) {
    case SUBSCRIBE_PLAN.TEAM_LICENSE_PLUS:
    case SUBSCRIBE_PLAN.TEAM_LICENSE_PREMIUM:
    case SUBSCRIBE_PLAN.TEAM_LICENSE_ENTERPRISE: {
      return {
        accessAttribute:
          AttributeConfigList?.[ATTRIBUTE_CATEGORY.ACCESS]?.[userRole]?.[
            attributeGroup
          ],
        deleteAttribute:
          AttributeConfigList?.[ATTRIBUTE_CATEGORY.DELETE]?.[userRole]?.[
            attributeGroup
          ],
        manageAttribute:
          AttributeConfigList?.[ATTRIBUTE_CATEGORY.MANAGE]?.[userRole]?.[
            attributeGroup
          ],
        specialAttribute:
          AttributeConfigList?.[ATTRIBUTE_CATEGORY.SPECIAL]?.[userRole]?.[
            attributeGroup
          ],
      }
    }
    case SUBSCRIBE_PLAN.TEAM_LICENSE_ENTERPRISE: {
      return {
        accessAttribute:
          AttributeConfigList?.[ATTRIBUTE_CATEGORY.ACCESS]?.[userRole]?.[
            attributeGroup
          ],
        deleteAttribute:
          AttributeConfigList?.[ATTRIBUTE_CATEGORY.DELETE]?.[userRole]?.[
            attributeGroup
          ],
        manageAttribute:
          AttributeConfigList?.[ATTRIBUTE_CATEGORY.MANAGE]?.[userRole]?.[
            attributeGroup
          ],
        specialAttribute:
          AttributeConfigList?.[ATTRIBUTE_CATEGORY.SPECIAL]?.[userRole]?.[
            attributeGroup
          ],
      }
    }
    case SUBSCRIBE_PLAN.TEAM_LICENSE_INSUFFICIENT: {
      return {
        accessAttribute:
          InvalidedSubscribePlanAttributeConfigList?.[
            ATTRIBUTE_CATEGORY.ACCESS
          ]?.[userRole]?.[attributeGroup],
        deleteAttribute:
          InvalidedSubscribePlanAttributeConfigList?.[
            ATTRIBUTE_CATEGORY.DELETE
          ]?.[userRole]?.[attributeGroup],
        manageAttribute:
          InvalidedSubscribePlanAttributeConfigList?.[
            ATTRIBUTE_CATEGORY.MANAGE
          ]?.[userRole]?.[attributeGroup],
        specialAttribute:
          InvalidedSubscribePlanAttributeConfigList?.[
            ATTRIBUTE_CATEGORY.SPECIAL
          ]?.[userRole]?.[attributeGroup],
      }
    }
    default: {
      return {
        accessAttribute:
          FreePlanAttributeConfigList?.[ATTRIBUTE_CATEGORY.ACCESS]?.[
            userRole
          ]?.[attributeGroup],
        deleteAttribute:
          FreePlanAttributeConfigList?.[ATTRIBUTE_CATEGORY.DELETE]?.[
            userRole
          ]?.[attributeGroup],
        manageAttribute:
          FreePlanAttributeConfigList?.[ATTRIBUTE_CATEGORY.MANAGE]?.[
            userRole
          ]?.[attributeGroup],
        specialAttribute:
          FreePlanAttributeConfigList?.[ATTRIBUTE_CATEGORY.SPECIAL]?.[
            userRole
          ]?.[attributeGroup],
      }
    }
  }
}

export const canAccess = (
  userRole: USER_ROLE,
  attributeGroup: ATTRIBUTE_GROUP,
  teamPlan: SUBSCRIBE_PLAN = SUBSCRIBE_PLAN.TEAM_LICENSE_FREE,
  attribute: ACTION_ACCESS,
) => {
  const accessAttribute = getAttribute(
    userRole,
    attributeGroup,
    teamPlan,
  ).accessAttribute
  return !!accessAttribute?.[attribute]
}
export const canDelete = (
  userRole: USER_ROLE,
  attributeGroup: ATTRIBUTE_GROUP,
  teamPlan: SUBSCRIBE_PLAN = SUBSCRIBE_PLAN.TEAM_LICENSE_FREE,
  attribute: ACTION_DELETE,
) => {
  const deleteAttribute = getAttribute(
    userRole,
    attributeGroup,
    teamPlan,
  ).deleteAttribute
  return !!deleteAttribute?.[attribute]
}

export const canManage = (
  userRole: USER_ROLE,
  attributeGroup: ATTRIBUTE_GROUP,
  teamPlan: SUBSCRIBE_PLAN = SUBSCRIBE_PLAN.TEAM_LICENSE_FREE,
  attribute: ACTION_MANAGE,
) => {
  const manageAttribute = getAttribute(
    userRole,
    attributeGroup,
    teamPlan,
  ).manageAttribute
  return !!manageAttribute?.[attribute]
}

export const canAccessManage = (
  userRole: USER_ROLE = USER_ROLE.VIEWER,
  teamPlan: SUBSCRIBE_PLAN = SUBSCRIBE_PLAN.TEAM_LICENSE_FREE,
  isSubscribeAndSufficient?: boolean,
) => {
  if (isSubscribeAndSufficient) return true
  const accessAttribute = getAttribute(
    userRole,
    ATTRIBUTE_GROUP.BILLING,
    teamPlan,
  ).accessAttribute
  return !!accessAttribute?.[ACTION_ACCESS.VIEW]
}
export const canUseUpgradeFeature = (
  userRole: USER_ROLE = USER_ROLE.VIEWER,
  teamPlan: SUBSCRIBE_PLAN = SUBSCRIBE_PLAN.TEAM_LICENSE_FREE,
  isSubscribe?: boolean,
  isSubscribeAndSufficient?: boolean,
) => {
  if (!isCloudVersion) return true
  if (!isSubscribe) return false
  const accessAttribute = getAttribute(
    userRole,
    ATTRIBUTE_GROUP.BILLING,
    teamPlan,
  ).accessAttribute

  return isSubscribeAndSufficient || !!accessAttribute?.[ACTION_ACCESS.VIEW]
}

export const canManagePayment = (
  userRole: USER_ROLE = USER_ROLE.VIEWER,
  teamPlan: SUBSCRIBE_PLAN = SUBSCRIBE_PLAN.TEAM_LICENSE_FREE,
  isSubscribe?: boolean,
) => {
  const attribute = isSubscribe
    ? ACTION_MANAGE.PAYMENT_INFO
    : ACTION_MANAGE.PAYMENT

  const manageAttribute = getAttribute(
    userRole,
    ATTRIBUTE_GROUP.BILLING,
    teamPlan,
  ).manageAttribute

  return !!manageAttribute?.[attribute]
}

export const canManageSpecial = (
  userRole: USER_ROLE,
  attributeGroup: ATTRIBUTE_GROUP,
  teamPlan: SUBSCRIBE_PLAN = SUBSCRIBE_PLAN.TEAM_LICENSE_FREE,
  attribute: ACTION_SPECIAL,
) => {
  const specialAttribute = getAttribute(
    userRole,
    attributeGroup,
    teamPlan,
  ).accessAttribute
  return !!specialAttribute?.[attribute]
}

export const canInvite = (
  userRole: USER_ROLE,
  teamPlan: SUBSCRIBE_PLAN = SUBSCRIBE_PLAN.TEAM_LICENSE_FREE,
) => {
  const attribute = inviteRoleAttributeMap[userRole]
  if (!attribute) {
    return false
  }
  const accessAttribute = getAttribute(
    userRole,
    ATTRIBUTE_GROUP.INVITE,
    teamPlan,
  ).accessAttribute
  return !!accessAttribute?.[attribute]
}

// [userRole][group]
export const canModifyRoleFromTo = (
  userRole: USER_ROLE,
  attributeGroup: ATTRIBUTE_GROUP,
  fromRole: USER_ROLE,
  toRole: USER_ROLE,
  teamPlan: SUBSCRIBE_PLAN = SUBSCRIBE_PLAN.TEAM_LICENSE_FREE,
) => {
  const fromAttribute = modifyRoleFromAttributeMap[fromRole]
  const toAttribute = modifyRoleToAttributeMap[toRole]
  if (!fromAttribute || !toAttribute) {
    return false
  }
  const manageAttribute = getAttribute(
    userRole,
    attributeGroup,
    teamPlan,
  ).accessAttribute
  const fromResult = manageAttribute?.[fromAttribute]
  const toResult = manageAttribute?.[toAttribute]
  if (fromResult == undefined || toResult == undefined) {
    return false
  }
  return fromResult && toResult
}

export const doesNowUserAreEditorOrViewer = (userRole: USER_ROLE) => {
  return userRole === USER_ROLE.EDITOR || userRole === USER_ROLE.VIEWER
}

export const canManageInvite = (
  currentUserRole: USER_ROLE,
  allowEditorManageTeamMember?: boolean,
  allowViewerManageTeamMember?: boolean,
) => {
  if (allowViewerManageTeamMember && allowEditorManageTeamMember) {
    return isBiggerThanTargetRole(USER_ROLE.VIEWER, currentUserRole)
  } else {
    return [USER_ROLE.OWNER, USER_ROLE.ADMIN].includes(currentUserRole)
  }
}

export const showInviteModal = (teamInfo?: TeamInfo) => {
  if (!teamInfo) return false
  return canManageInvite(
    teamInfo.myRole,
    teamInfo.permission.allowEditorManageTeamMember,
    teamInfo.permission.allowViewerManageTeamMember,
  )
}

export const openInviteModal = (teamInfo: TeamInfo) => {
  if (isCloudVersion) {
    return canUseUpgradeFeature(
      teamInfo.myRole,
      getPlanUtils(teamInfo),
      teamInfo.totalTeamLicense.teamLicensePurchased,
      teamInfo.totalTeamLicense.teamLicenseAllPaid,
    )
  } else {
    return true
  }
}

export const showShareAppModal = (
  teamInfo: TeamInfo,
  userRoleForThisApp: USER_ROLE,
  isPublic: boolean,
  isContributed: boolean,
  isDeployed: boolean,
) => {
  if (!isCloudVersion) return false

  const canInvite = canManageInvite(
    teamInfo.myRole,
    teamInfo.permission.allowEditorManageTeamMember,
    teamInfo.permission.allowViewerManageTeamMember,
  )

  if (canInvite) {
    return true
  } else if (
    canManage(
      userRoleForThisApp,
      ATTRIBUTE_GROUP.APP,
      getPlanUtils(teamInfo),
      ACTION_MANAGE.EDIT_APP,
    )
  ) {
    return true
  } else return (isPublic || isContributed) && isDeployed
}

export const openShareAppModal = (
  teamInfo: TeamInfo,
  userRoleForThisApp: USER_ROLE,
  isPublic: boolean,
  isContributed: boolean,
) => {
  if (isPublic || isContributed) {
    return true
  } else if (
    canManage(
      userRoleForThisApp,
      ATTRIBUTE_GROUP.APP,
      getPlanUtils(teamInfo),
      ACTION_MANAGE.EDIT_APP,
    )
  ) {
    return true
  } else
    return canManageInvite(
      teamInfo.myRole,
      teamInfo.permission.allowEditorManageTeamMember,
      teamInfo.permission.allowViewerManageTeamMember,
    )
}

export const showShareAgentModal = (
  teamInfo: TeamInfo,
  userRoleForThisAgent: USER_ROLE,
  isContributed: boolean,
) => {
  const canInvite = canManageInvite(
    teamInfo.myRole,
    teamInfo.permission.allowEditorManageTeamMember,
    teamInfo.permission.allowViewerManageTeamMember,
  )
  if (isContributed) {
    return true
  } else if (canInvite) {
    return true
  } else {
    return canManage(
      userRoleForThisAgent,
      ATTRIBUTE_GROUP.AI_AGENT,
      getPlanUtils(teamInfo),
      ACTION_MANAGE.CREATE_AI_AGENT,
    )
  }
}

export const showShareAgentModalOnlyForShare = (teamInfo: TeamInfo) => {
  return canManageInvite(
    teamInfo.myRole,
    teamInfo.permission.allowEditorManageTeamMember,
    teamInfo.permission.allowViewerManageTeamMember,
  )
}

export const openShareAgentModal = (
  teamInfo: TeamInfo,
  userRoleForThisAgent: USER_ROLE,
  isContributed: boolean,
) => {
  if (isContributed) {
    return true
  } else if (
    canManage(
      userRoleForThisAgent,
      ATTRIBUTE_GROUP.AI_AGENT,
      getPlanUtils(teamInfo),
      ACTION_MANAGE.CREATE_AI_AGENT,
    )
  ) {
    return true
  } else {
    return canManageInvite(
      teamInfo.myRole,
      teamInfo.permission.allowEditorManageTeamMember,
      teamInfo.permission.allowViewerManageTeamMember,
    )
  }
}

export const canCreateApp = (
  userRole: USER_ROLE = USER_ROLE.VIEWER,
  teamPlan: SUBSCRIBE_PLAN = SUBSCRIBE_PLAN.TEAM_LICENSE_FREE,
) => {
  const manageAttribute = getAttribute(
    userRole,
    ATTRIBUTE_GROUP.APP,
    teamPlan,
  ).manageAttribute
  return !!manageAttribute?.[ACTION_MANAGE.CREATE_APP]
}

export const canEditApp = (
  userRole: USER_ROLE = USER_ROLE.VIEWER,
  teamPlan: SUBSCRIBE_PLAN = SUBSCRIBE_PLAN.TEAM_LICENSE_FREE,
) => {
  const manageAttribute = getAttribute(
    userRole,
    ATTRIBUTE_GROUP.APP,
    teamPlan,
  ).manageAttribute
  return !!manageAttribute?.[ACTION_MANAGE.EDIT_APP]
}
