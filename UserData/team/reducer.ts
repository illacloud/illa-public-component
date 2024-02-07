import {
  ITeamCustomInfo,
  MemberInfo,
  SubscribeInfo,
  Team,
  TeamInfo,
  TeamPersonalConfig,
  USER_ROLE,
  UpdateTeamMemberPermissionPayload,
  UpdateTeamMemberUserRolePayload,
  UpdateTeamSubscribePayload,
  UpdateTransUserRolePayload,
} from "@illa-public/public-types"
import { CaseReducer, PayloadAction } from "@reduxjs/toolkit"

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
  if (typeof payload !== "number" || !state) return
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
  const ownerID = currentTeam.teamMemberID
  const teamOwner = state.currentMemberList?.find(
    (item) => item.teamMemberID === ownerID,
  )
  if (!teamOwner) return
  const targetMember = state.currentMemberList?.find(
    (item) => item.teamMemberID === action.payload.teamMemberID,
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
    (item) => item.teamMemberID === action.payload.teamMemberID,
  )
  if (!targetMember) return
  targetMember.userRole = action.payload.userRole
}

export const updateTeamMemberPermissionReducer: CaseReducer<
  Team,
  PayloadAction<UpdateTeamMemberPermissionPayload>
> = (state, action) => {
  const index =
    state.items?.findIndex((item) => item.id === action.payload.teamID) ?? -1
  if (state.items && index != -1) {
    state.items[index].permission = {
      ...state.items[index].permission,
      ...action.payload.newPermission,
    }
  }
}

export const updateTeamMemberSubscribeReducer: CaseReducer<
  Team,
  PayloadAction<UpdateTeamSubscribePayload>
> = (state, action) => {
  const index =
    state.items?.findIndex((item) => item.id === action.payload.teamID) ?? -1
  if (state.items && index != -1) {
    state.items[index].currentTeamLicense = action.payload.subscribeInfo
  }
}

export const updateCurrentTeamLicenseReducer: CaseReducer<
  Team,
  PayloadAction<{
    teamIdentifier?: string
    currentTeamLicense: SubscribeInfo
  }>
> = (state, action) => {
  if (!state) return
  const { payload } = action
  let { items } = state
  const { teamIdentifier, currentTeamLicense } = payload
  const currentIndex = items?.findIndex(
    (item) => item.identifier === teamIdentifier,
  )
  if (currentIndex !== undefined && items?.[currentIndex]) {
    items[currentIndex].currentTeamLicense = currentTeamLicense
  }
}

export const updateCurrentTeamLicenseByTeamIDReducer: CaseReducer<
  Team,
  PayloadAction<{
    teamID: string
    currentTeamLicense: SubscribeInfo
  }>
> = (state, action) => {
  if (!state) return
  const { payload } = action
  let { items } = state
  const { teamID, currentTeamLicense } = payload
  const currentIndex = items?.findIndex((item) => item.id === teamID)
  if (
    currentIndex !== undefined &&
    currentIndex !== -1 &&
    items?.[currentIndex]
  ) {
    items[currentIndex].currentTeamLicense = currentTeamLicense
  }
}

export const updateCurrentTeamPersonalConfigReducer: CaseReducer<
  Team,
  PayloadAction<{
    teamIdentifier?: string
    personalConfig: TeamPersonalConfig
  }>
> = (state, action) => {
  if (!state) return
  const { payload } = action
  let { items } = state
  const { teamIdentifier, personalConfig } = payload
  const currentIndex = items?.findIndex(
    (item) => item.identifier === teamIdentifier,
  )
  if (currentIndex !== undefined && items?.[currentIndex]) {
    items[currentIndex].personalConfig = personalConfig
  }
}

export const addTeamItemReducer: CaseReducer<Team, PayloadAction<TeamInfo>> = (
  state,
  action,
) => {
  if (!state) return
  const { payload } = action
  state = {
    ...state,
    items: state.items?.length ? [payload].concat(state.items) : [payload],
  }
  return state
}

export const updateCurrentMemberListReducer: CaseReducer<
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

export const deleteMemberListReducer: CaseReducer<
  Team,
  PayloadAction<string>
> = (state, action) => {
  state.currentMemberList = state.currentMemberList?.filter(
    (item) => item.teamMemberID !== action.payload,
  )
}

export const updateInvitedUserReducer: CaseReducer<
  Team,
  PayloadAction<MemberInfo[]>
> = (state, action) => {
  const { payload } = action
  if (!payload) return
  const currentMemberList = state.currentMemberList ?? []
  for (let i = 0; i < action.payload.length; i++) {
    const index = currentMemberList.findIndex(
      (item) => item.teamMemberID === action.payload[i].teamMemberID,
    )
    if (index === -1) {
      currentMemberList.unshift(action.payload[i])
    } else {
      currentMemberList[index] = action.payload[i]
    }
  }
  state.currentMemberList = currentMemberList
}

export const deleteTeamInfoReducer: CaseReducer<Team, PayloadAction<void>> = (
  state,
) => {
  const currentId = state.currentId
  const teamList = state.items ?? []
  const index = teamList.findIndex((item) => item.id === currentId)
  if (index !== -1) {
    teamList.splice(index, 1)
    if (teamList.length > 0) {
      state.currentId = teamList[0].id
    } else {
      state.currentId = undefined
    }
  }
  state.items = teamList
  state.currentMemberList = []
}

export const updateCurrentTeamInfoReducer: CaseReducer<
  Team,
  PayloadAction<{
    identifier?: string
    name?: string
  }>
> = (state, action) => {
  const currentId = state.currentId
  const teamList = state.items ?? []
  const index = teamList.findIndex((item) => item.id === currentId)
  if (index !== -1) {
    teamList[index] = {
      ...teamList[index],
      ...action.payload,
    }
  }
  state.items = teamList
}

export const updateTargetTeamInfoCustomInfoReducer: CaseReducer<
  Team,
  PayloadAction<{
    teamID: string
    customInfo: Partial<ITeamCustomInfo>
  }>
> = (state, action) => {
  const { teamID, customInfo } = action.payload
  const teamList = state.items ?? []
  const index = teamList.findIndex((item) => item.id === teamID)
  if (index !== -1) {
    teamList[index].customInfo = {
      ...teamList[index].customInfo,
      ...customInfo,
    }
  }
  state.items = teamList
}
