export interface CurrentUser {
  userID: string
  uid: string
  nickname: string
  email: string
  avatar?: string
  language: string
  isTutorialViewed?: boolean
  isPasswordSet: boolean
  ssoVerified: {
    github: boolean
    google: boolean
  }
  haveAppSumoSubscription: boolean
  doesAppSumoSubscriptionAppliedToTeam: boolean
  createdAt: string
  updatedAt: string
}

export interface UserInfoResponse {
  id: string
  uid: string
  nickname: string
  email: string
  avatar?: string
  language: string
  createdAt: string
  updatedAt: string
  userID: string
  isTutorialViewed: boolean
}
