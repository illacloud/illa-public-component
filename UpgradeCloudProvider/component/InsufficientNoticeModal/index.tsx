import { FC, useMemo } from "react"
import { useTranslation } from "react-i18next"
import { Button, CloseIcon, Modal, ModalProps } from "@illa-design/react"
import {
  modalCloseIconStyle,
  modalMaskStyle,
} from "@/illa-public-component/UpgradeCloudProvider/component/SubscriptionReminderModal/style"
import {
  actionAreaStyle,
  descriptionStyle,
  modalStyle,
  titleStyle,
} from "./style"

const modalConfigKey = {
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
  "add-storage": {
    title: "billing.modal.storage_insufficient.not_owner_title",
    description: "billing.modal.storage_insufficient.not_owner_description",
    buttonText: "billing.modal.storage_insufficient.not_owner_button",
  },
  "add-traffic": {
    title: "billing.modal.traffic_insufficient.not_owner_title",
    description: "billing.modal.traffic_insufficient.not_owner_description",
    buttonText: "billing.modal.traffic_insufficient.not_owner_button",
  },
  gpt4: {
    title: "billing.modal.upgrade_now_not_admin.upgrade_title",
    description: "billing.modal.upgrade_now_not_admin.upgrade_desc",
    buttonText: "billing.modal.upgrade_now_not_admin.upgrade_button",
  },
}

export const insufficientModalConfigKeys = Object.keys(modalConfigKey)

export type InsufficientNoticeModalType = keyof typeof modalConfigKey

interface InsufficientNoticeModalProps extends ModalProps {
  configType?: InsufficientNoticeModalType
}

export const InsufficientNoticeModal: FC<InsufficientNoticeModalProps> = (
  props,
) => {
  const { configType = "add-license", onCancel, ...otherProps } = props
  const { t } = useTranslation()

  const { title, description, buttonText } = useMemo(() => {
    return modalConfigKey[configType] ?? {}
  }, [configType])

  return (
    <Modal
      _css={modalStyle}
      withoutPadding
      maskClosable={false}
      footer={false}
      autoFocus={false}
      // onCancel={onCancel}
      maskStyle={modalMaskStyle}
      onOk={() => {}}
      {...otherProps}
    >
      <div css={modalCloseIconStyle} onClick={onCancel}>
        <CloseIcon size="12px" />
      </div>
      <div css={titleStyle}>{t(title)}</div>
      <div css={descriptionStyle}>{t(description)}</div>
      <div css={actionAreaStyle}>
        <Button colorScheme="techPurple" onClick={onCancel}>
          {t(buttonText)}
        </Button>
      </div>
    </Modal>
  )
}

InsufficientNoticeModal.displayName = "InsufficientNoticeModal"
