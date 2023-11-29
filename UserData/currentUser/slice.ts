import { createSlice } from "@reduxjs/toolkit"
import { authAPI } from "../service/auth"
import {
  updateCurrentUserReducer,
  updateUserAvatarReducer,
  updateUserInfoReducer,
  updateUserIsTutorialViewedReducer,
} from "./reducer"
import { CurrentUserInitialState } from "./state"

const currentUserSlice = createSlice({
  name: "currentUser",
  initialState: CurrentUserInitialState,
  reducers: {
    updateCurrentUserReducer,
    updateUserAvatarReducer,
    updateUserIsTutorialViewedReducer,
    updateUserInfoReducer,
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      authAPI.endpoints.getUserInfoAndTeamsInfoByToken.matchFulfilled,
      (state, action) => {
        state = action.payload.user
        return state
      },
    )
  },
})

export const currentUserActions = currentUserSlice.actions
export const currentUserReducer = currentUserSlice.reducer
