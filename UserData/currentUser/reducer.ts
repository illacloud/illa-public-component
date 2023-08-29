import { CaseReducer, PayloadAction } from "@reduxjs/toolkit"
import { CurrentUser } from "./interface"

export const updateCurrentUserReducer: CaseReducer<
  CurrentUser,
  PayloadAction<CurrentUser>
> = (state, action) => {
  state = action.payload
  return state
}

export const updateUserAvatarReducer: CaseReducer<
  CurrentUser,
  PayloadAction<string>
> = (state, action) => {
  if (!state) return
  const { payload } = action
  return {
    ...state,
    avatar: payload,
  }
}

export const updateUserIsTutorialViewedReducer: CaseReducer<
  CurrentUser,
  PayloadAction<boolean>
> = (state, action) => {
  if (!state) return
  const { payload } = action
  state["isTutorialViewed"] = payload
}

export const updateUserInfoReducer: CaseReducer<
  CurrentUser,
  PayloadAction<Partial<CurrentUser>>
> = (state, action) => {
  if (!state) return
  const { payload } = action
  return {
    ...state,
    ...payload,
  }
}
