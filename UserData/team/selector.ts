import { createSelector } from "@reduxjs/toolkit"
import { RootState } from "../store"
import { USER_ROLE } from "./interface"

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
