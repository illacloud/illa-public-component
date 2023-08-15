import { createSlice } from "@reduxjs/toolkit"
import {
  updateCurrentUserReducer,
  updateUserAvatarReducer,
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
  },
})

export const currentUserActions = currentUserSlice.actions
export const currentUserReducer = currentUserSlice.reducer
