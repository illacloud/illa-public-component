import { UpgradeModalType } from "./interface";

export const HIGHLIGHT_MAP: Partial<Record<UpgradeModalType, string>> = {
  ['agent']: "billing.modal.ai-agent.string1",
}

export const FEATURE_CONFIG = [
  {
    label: "billing.modal.upgrade_now_admin.add_unlimited_viewer",
  },
  {
    label: "billing.modal.upgrade_now_admin.publish_public_appli",
  },
  {
    label: "billing.apps.sql",
    tip: "billing.tips.sql",
  },
  {
    label: "billing.modal.upgrade_now_admin.audit_logs",
  },
]

// this keys not equal to success modal keys
export const UPGRADE_MODAL_CONFIG_KEY = {
  "add-license": {
    title: "billing.modal.upgrade_now_admin.insufficient_license_title",
    description:
      "billing.modal.upgrade_now_admin.insufficient_license_description",
    buttonText: "billing.modal.upgrade_now_admin.insufficient_license_button",
  },
  upgrade: {
    title: "billing.modal.upgrade_now_admin.upgrade_to_plus",
    description: "billing.modal.upgrade_now_admin.this_feature_is_avai",
    buttonText: "billing.modal.upgrade_now_admin.upgrade",
  },
  expired: {
    title: "billing.modal.expired.your_subscription_ha",
    description: "billing.modal.expired.all_members_except_f",
    buttonText: "billing.modal.expired.upgrade",
  },
  agent: {
    title: "billing.modal.upgrade_now_admin.upgrade_to_plus",
    description: "billing.modal.ai-agent.string2",
    buttonText: "billing.modal.upgrade_now_admin.upgrade",
  },
}
export const UPGRADE_MODAL_CONFIG_KEYS = Object.keys(UPGRADE_MODAL_CONFIG_KEY)