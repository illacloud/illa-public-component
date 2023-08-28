import { createSlice } from "@reduxjs/toolkit"
import {
  addTeamItemReducer,
  deleteMemberListReducer,
  updateCurrentIdReducer,
  updateCurrentMemberListReducer,
  updateCurrentRoleReducer,
  updateCurrentTeamLicenseReducer,
  updateCurrentTeamPersonalConfigReducer,
  updateMemberListReducer,
  updateTeamItemsReducer,
  updateTeamMemberPermissionReducer,
  updateTeamMemberSubscribeReducer,
  updateTeamMemberUserRoleReducer,
  updateTeamReducer,
  updateTransUserRoleReducer,
} from "./reducer"
import { teamInitialState } from "./state"

const teamSlice = createSlice({
  name: "team",
  initialState: teamInitialState,
  reducers: {
    updateTeamReducer,
    updateCurrentIdReducer,
    updateTeamItemsReducer,
    updateCurrentRoleReducer,
    updateMemberListReducer,
    updateTransUserRoleReducer,
    updateTeamMemberUserRoleReducer,
    updateTeamMemberPermissionReducer,
    updateTeamMemberSubscribeReducer,
    updateCurrentTeamLicenseReducer,
    updateCurrentTeamPersonalConfigReducer,
    addTeamItemReducer,
    updateCurrentMemberListReducer,
    deleteMemberListReducer,
  },
})

export const teamActions = teamSlice.actions
export const teamReducer = teamSlice.reducer
