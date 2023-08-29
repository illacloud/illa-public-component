import { createSlice } from "@reduxjs/toolkit"
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
})

export const currentUserActions = currentUserSlice.actions
export const currentUserReducer = currentUserSlice.reducer
