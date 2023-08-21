import { CurrentUser } from "./interface"

export const CurrentUserInitialState: CurrentUser = {
  userID: "",
  uid: "",
  nickname: "",
  language: "",
  email: "",
  isTutorialViewed: false,
  isPasswordSet: false,
  ssoVerified: {
    github: false,
    google: false,
  },
  haveAppSumoSubscription: false,
  doesAppSumoSubscriptionAppliedToTeam: false,
  createdAt: "",
  updatedAt: "",
}
