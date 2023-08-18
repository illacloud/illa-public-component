import { SUBSCRIPTION_CYCLE } from "@illa-public/user-data"
import { PurchaseItem } from "../../service/interface"

export const CONFIG_KEY = {
  license: {
    title: "billing.payment_sidebar.title.manage_licenses",
    manageLabel: "billing.payment_sidebar.plan_label.License",
  },
  storage: {
    title: "billing.payment_sidebar.title.manage_storage",
    manageLabel: "billing.payment_sidebar.plan_label.Storage",
  },
  traffic: {
    title: "billing.payment_sidebar.title.expand_traffic_capac",
    manageLabel: "billing.payment_sidebar.plan_label.Traffic",
  },
}

export const SUBSCRIBE_UNIT_PRICE = {
  license: {
    [SUBSCRIPTION_CYCLE.FREE]: 0,
    [SUBSCRIPTION_CYCLE.MONTHLY]: 20,
    [SUBSCRIPTION_CYCLE.YEARLY]: 200,
  },
  storage: {
    [SUBSCRIPTION_CYCLE.FREE]: 0,
    [SUBSCRIPTION_CYCLE.MONTHLY]: 10,
    [SUBSCRIPTION_CYCLE.YEARLY]: 100,
  },
  traffic: {
    [PurchaseItem.DRIVE_TRAFFIC_1GB]: 10,
  },
}

export const LEARN_MORE_LINK =
  "https://builder.illacloud.com/illa_policy/deploy/app/ILAex4p1C7sk"