import { CaseReducer, PayloadAction } from "@reduxjs/toolkit"
import { isNumber } from "@illa-design/react"
import {
  MemberInfo,
  Team,
  TeamInfo,
  USER_ROLE,
  UpdateTeamMemberUserRolePayload,
  UpdateTransUserRolePayload,
} from "./interface"

export const updateTeamReducer: CaseReducer<Team, PayloadAction<Team>> = (
  state,
  action,
) => {
  const { payload } = action
  if (!payload) return
  return payload
}

export const updateCurrentIdReducer: CaseReducer<
  Team,
  PayloadAction<string>
> = (state, action) => {
  if (!state) return
  const { payload } = action
  state = {
    ...state,
    currentId: payload,
  }
  return state
}

export const updateTeamItemsReducer: CaseReducer<
  Team,
  PayloadAction<TeamInfo[]>
> = (state, action) => {
  if (!state) return
  const { payload } = action
  state = {
    ...state,
    items: payload,
  }
  return state
}

export const updateCurrentRoleReducer: CaseReducer<
  Team,
  PayloadAction<USER_ROLE>
> = (state, action) => {
  const { payload } = action
  if (!isNumber(payload) || !state) return
  let { currentId, items } = state
  const currentIndex = items?.findIndex((item) => item.id === currentId)
  if (currentIndex !== undefined && items?.[currentIndex]) {
    items[currentIndex].myRole = payload
  }
  return {
    ...state,
    items,
  }
}

export const updateMemberListReducer: CaseReducer<
  Team,
  PayloadAction<MemberInfo[]>
> = (state, action) => {
  const { payload } = action
  if (!payload) return

  return {
    ...state,
    currentMemberList: payload,
  }
}

export const updateTransUserRoleReducer: CaseReducer<
  Team,
  PayloadAction<UpdateTransUserRolePayload>
> = (state, action) => {
  const currentTeamID = state.currentId
  const currentTeam = state.items?.find((item) => item.id === currentTeamID)
  if (!currentTeam) return
  const ownerID = currentTeam.uid
  const teamOwner = state.currentMemberList?.find(
    (item) => item.userID === ownerID,
  )
  if (!teamOwner) return
  const targetMember = state.currentMemberList?.find(
    (item) => item.userID === action.payload.teamMemberID,
  )
  if (!targetMember) return

  teamOwner.userRole = USER_ROLE.ADMIN
  currentTeam.myRole = USER_ROLE.ADMIN
  targetMember.userRole = USER_ROLE.OWNER
}

export const updateTeamMemberUserRoleReducer: CaseReducer<
  Team,
  PayloadAction<UpdateTeamMemberUserRolePayload>
> = (state, action) => {
  const targetMember = state.currentMemberList?.find(
    (item) => item.userID === action.payload.teamMemberID,
  )
  if (!targetMember) return
  targetMember.userRole = action.payload.userRole
}
