import { createSelector } from "@reduxjs/toolkit"
import { Locale, enUS, jaJP, koKR, zhCN } from "@illa-design/react"
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

export const getCurrentConfigLanguage = (state: RootState) => {
  let selectedLocale: Locale
  const currentUser = state.currentUser
  switch (currentUser?.language) {
    case "en-US":
      selectedLocale = enUS
      break
    case "zh-CN":
      selectedLocale = zhCN
      break
    case "ja-JP":
      selectedLocale = jaJP
      break
    case "ko-KR":
      selectedLocale = koKR
      break
    default:
      selectedLocale = enUS
  }
  return selectedLocale
}

export const getCurrentTranslateLanguage = (state: RootState) => {
  const currentUser = state.currentUser
  return currentUser?.language ?? "en-US"
}

export const getCanApplyAppSumo = (state: RootState) =>
  state.currentUser?.haveAppSumoSubscription &&
  !state.currentUser?.doesAppSumoSubscriptionAppliedToTeam
