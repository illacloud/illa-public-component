import { CurrentUserInfo } from "@illa-public/public-types"
import { CaseReducer, PayloadAction } from "@reduxjs/toolkit"

export const updateCurrentUserReducer: CaseReducer<
  CurrentUserInfo,
  PayloadAction<CurrentUserInfo>
> = (state, action) => {
  state = action.payload
  return state
}

export const updateUserAvatarReducer: CaseReducer<
  CurrentUserInfo,
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
  CurrentUserInfo,
  PayloadAction<boolean>
> = (state, action) => {
  if (!state) return
  const { payload } = action
  state["isTutorialViewed"] = payload
}

export const updateUserInfoReducer: CaseReducer<
  CurrentUserInfo,
  PayloadAction<Partial<CurrentUserInfo>>
> = (state, action) => {
  if (!state) return
  const { payload } = action
  return {
    ...state,
    ...payload,
  }
}
