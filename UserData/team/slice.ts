import { createSlice } from "@reduxjs/toolkit"
import {
  updateCurrentIdReducer,
  updateCurrentRoleReducer,
  updateMemberListReducer,
  updateTeamItemsReducer,
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
  },
})

export const teamActions = teamSlice.actions
export const teamReducer = teamSlice.reducer
