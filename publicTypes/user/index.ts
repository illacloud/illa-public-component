export enum USER_ROLE {
  "GUEST" = -1,
  "OWNER" = 1,
  "ADMIN",
  "EDITOR",
  "VIEWER",
}

export enum USER_STATUS {
  "OK" = 1,
  "PENDING" = 2,
}

export enum PROMOTION_CODE_USAGE {
  DEFAULT_REGISTER = 1,
}

export interface BasePromotionCode {
  promotionCode: string
  expiresAt: string
  maxRedemptions: number
  usage: PROMOTION_CODE_USAGE
}
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
  promotionCode?: BasePromotionCode[]
}

export interface CurrentUserInfo extends BaseUserInfo {
  isTutorialViewed?: boolean
  ssoVerified?: {
    github: boolean
    google: boolean
  }
  haveAppSumoSubscription?: boolean
  doesAppSumoSubscriptionAppliedToTeam?: boolean
}
