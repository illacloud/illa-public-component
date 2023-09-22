// this keys not equal to success modal keys
export const INSUFFICIENT_MODAL_CONFIG_KEY = {
  upgrade: {
    title: "billing.modal.expired.your_subscription_ha_not_owner",
    description: "billing.modal.expired.all_members_except_f_not_owner",
    buttonText: "billing.modal.expired.upgrade_not_owner",
  },
  "add-license": {
    title: "billing.modal.upgrade_not_admin.insufficient_license_title",
    description:
      "billing.modal.upgrade_not_admin.insufficient_license_description",
    buttonText: "billing.modal.upgrade_not_admin.insufficient_license_button",
  },
  agent: {
    title: "billing.modal.upgrade_now_not_admin.upgrade_title",
    description: "billing.modal.upgrade_now_not_admin.upgrade_desc",
    buttonText: "billing.modal.upgrade_now_not_admin.upgrade_button",
  },
}

export const INSUFFICIENT_MODAL_CONFIG_KEYS = Object.keys(
  INSUFFICIENT_MODAL_CONFIG_KEY,
)
