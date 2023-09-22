import { SUBSCRIBE_PLAN } from "@illa-public/user-data"

// processed as payment only
export const isSubscribeForDrawer = (subscribePlan?: SUBSCRIBE_PLAN) => {
  return (
    subscribePlan === SUBSCRIBE_PLAN.TEAM_LICENSE_ENTERPRISE ||
    subscribePlan === SUBSCRIBE_PLAN.TEAM_LICENSE_PREMIUM ||
    subscribePlan === SUBSCRIBE_PLAN.TEAM_LICENSE_INSUFFICIENT ||
    subscribePlan === SUBSCRIBE_PLAN.DRIVE_VOLUME_PAID ||
    subscribePlan === SUBSCRIBE_PLAN.DRIVE_VOLUME_INSUFFICIENT ||
    subscribePlan === SUBSCRIBE_PLAN.COLLA_SUBSCRIBE_INSUFFICIENT ||
    subscribePlan === SUBSCRIBE_PLAN.COLLA_SUBSCRIBE_PAID
  )
}

// display is the processing of relevant function permissions, and there is an additional cancel status.
export const isSubscribeForBilling = (subscribePlan?: SUBSCRIBE_PLAN) => {
  return (
    subscribePlan === SUBSCRIBE_PLAN.TEAM_LICENSE_ENTERPRISE ||
    subscribePlan === SUBSCRIBE_PLAN.TEAM_LICENSE_PREMIUM ||
    subscribePlan === SUBSCRIBE_PLAN.TEAM_LICENSE_INSUFFICIENT ||
    subscribePlan === SUBSCRIBE_PLAN.TEAM_LICENSE_CANCELED ||
    subscribePlan === SUBSCRIBE_PLAN.DRIVE_VOLUME_PAID ||
    subscribePlan === SUBSCRIBE_PLAN.DRIVE_VOLUME_INSUFFICIENT ||
    subscribePlan === SUBSCRIBE_PLAN.COLLA_SUBSCRIBE_INSUFFICIENT ||
    subscribePlan === SUBSCRIBE_PLAN.COLLA_SUBSCRIBE_PAID ||
    subscribePlan === SUBSCRIBE_PLAN.COLLA_SUBSCRIBE_CANCELED
  )
}
