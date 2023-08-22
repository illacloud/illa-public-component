export interface BaseUserInfo {
  userID: string
  uid: string
  nickname: string
  email: string
  avatar: string
  language: string
  isSubscribed?: boolean
  isPasswordSet: boolean
  isNewUser: boolean
  createdAt: string
  updatedAt: string
}

export interface CurrentUser extends BaseUserInfo {
  isTutorialViewed?: boolean
  ssoVerified?: {
    github: boolean
    google: boolean
  }
  haveAppSumoSubscription?: boolean
  doesAppSumoSubscriptionAppliedToTeam?: boolean
}
