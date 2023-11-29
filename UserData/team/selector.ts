import { SUBSCRIBE_PLAN, TeamInfo, USER_ROLE } from "@illa-public/public-types"
import { createSelector } from "@reduxjs/toolkit"
import { RootState } from "../store"

export const getCurrentId = (state: RootState) => {
  return state.team.currentId
}
export const getTeamItems = (state: RootState) => state.team.items
export const getCurrentMemberList = (state: RootState) =>
  state.team.currentMemberList

export const getCurrentTeamInfo = createSelector(
  [getCurrentId, getTeamItems],
  (currentId, items) => {
    if (!currentId || !items) return
    return items.find((item) => item.id === currentId)
  },
)

export const getCurrentTeamTotalLicense = createSelector(
  [getCurrentTeamInfo],
  (teamInfo) => {
    if (!teamInfo) return
    return teamInfo.totalTeamLicense
  },
)

export const getUserRoleInCurrentTeam = createSelector(
  [getCurrentTeamInfo],
  (teamInfo) => {
    if (!teamInfo) return USER_ROLE.VIEWER
    return teamInfo.myRole
  },
)

export const getCurrentTeamIdentifier = createSelector(
  [getCurrentId, getTeamItems],
  (currentId, items) => {
    if (!currentId || !items) return
    return items.find((item) => item.id === currentId)?.identifier
  },
)

export const getPlanUtils = (teamInfo?: TeamInfo) => {
  if (!teamInfo) return SUBSCRIBE_PLAN.UNDEFINED
  const { currentTeamLicense, appSumoTeamLicense } = teamInfo
  if (!currentTeamLicense && !appSumoTeamLicense) {
    return SUBSCRIBE_PLAN.UNDEFINED
  }
  if (
    currentTeamLicense.plan === SUBSCRIBE_PLAN.TEAM_LICENSE_FREE &&
    (appSumoTeamLicense?.plan === SUBSCRIBE_PLAN.TEAM_LICENSE_APPSUMO_TIER_1 ||
      appSumoTeamLicense?.plan === SUBSCRIBE_PLAN.TEAM_LICENSE_APPSUMO_TIER_2 ||
      appSumoTeamLicense?.plan === SUBSCRIBE_PLAN.TEAM_LICENSE_APPSUMO_TIER_3 ||
      appSumoTeamLicense?.plan === SUBSCRIBE_PLAN.TEAM_LICENSE_APPSUMO_TIER_4)
  ) {
    return SUBSCRIBE_PLAN.TEAM_LICENSE_PLUS
  }
  return currentTeamLicense.plan
}

export const getCurrentTeamPlan = createSelector(
  [getCurrentTeamInfo],
  (currentTeamInfo) => {
    return getPlanUtils(currentTeamInfo)
  },
)
