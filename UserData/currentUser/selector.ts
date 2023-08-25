import { createSelector } from "@reduxjs/toolkit"
import { RootState } from "../store"

export const getCurrentUser = (state: RootState) => {
  return state.currentUser
}

export const getCurrentUserEmail = (state: RootState) => {
  return state.currentUser.email
}

export const getCurrentUserID = (state: RootState) => {
  return state.currentUser.userID
}

export const getCurrentUserId = createSelector(
  [getCurrentUser],
  (currentUser) => {
    return currentUser.userID
  },
)

export const getIsTutorialViewed = (state: RootState) => {
  return state.currentUser.isTutorialViewed
}

export const getCurrentUserIsLogin = (state: RootState) => {
  return state.currentUser.userID !== ""
}

export const getCurrentTranslateLanguage = (state: RootState) => {
  const currentUser = state.currentUser
  return currentUser?.language ?? "en-US"
}

export const getCanApplyAppSumo = (state: RootState) =>
  state.currentUser?.haveAppSumoSubscription &&
  !state.currentUser?.doesAppSumoSubscriptionAppliedToTeam
