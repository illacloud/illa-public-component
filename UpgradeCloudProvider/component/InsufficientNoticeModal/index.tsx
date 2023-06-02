import { Button, CloseIcon, Modal, ModalProps } from "@illa-design/react"
import { FC, useMemo } from "react"
import { useTranslation } from "react-i18next"
import {
  descriptionStyle,
  modalStyle,
  titleStyle,
} from "@/illa-public-component/UpgradeCloudProvider/component/InsufficientNoticeModal/style"
import {
  modalCloseIconStyle,
  modalMaskStyle,
} from "@/illa-public-component/UpgradeCloudProvider/component/SubscriptionReminderModal/style"
import { actionAreaStyle } from "@/illa-public-component/UpgradeCloudProvider/component/UpgradeSuccessModal/style"

const modalConfigKey = {
  license: {
    title: "billing.modal.upgrade_not_admin.insufficient_license_title",
    description:
      "billing.modal.upgrade_not_admin.insufficient_license_description",
    buttonText: "billing.modal.upgrade_not_admin.insufficient_license_button",
  },
  storage: {
    title: "billing.modal.storage_insufficient.not_owner_title",
    description: "billing.modal.storage_insufficient.not_owner_description",
    buttonText: "billing.modal.storage_insufficient.not_owner_button",
  },
  traffic: {
    title: "billing.modal.traffic_insufficient.not_owner_title",
    description: "billing.modal.traffic_insufficient.not_owner_description",
    buttonText: "billing.modal.traffic_insufficient.not_owner_button",
  },
}

type ModalType = keyof typeof modalConfigKey

interface InsufficientNoticeModalProps extends ModalProps {
  configType?: ModalType
}

export const InsufficientNoticeModal: FC<InsufficientNoticeModalProps> = (
  props,
) => {
  const { configType = "license", onCancel, ...otherProps } = props
  const { t } = useTranslation()

  const { title, description, buttonText } = useMemo(() => {
    return modalConfigKey[configType]
  }, [configType])

  return (
    <Modal
      _css={modalStyle}
      withoutPadding
      maskClosable={false}
      footer={false}
      onCancel={onCancel}
      maskStyle={modalMaskStyle}
      {...otherProps}
    >
      <div css={modalCloseIconStyle} onClick={onCancel}>
        <CloseIcon size="12px" />
      </div>
      <div css={titleStyle}>{t(title)}</div>
      <div css={descriptionStyle}>{t(description)}</div>
      <div css={actionAreaStyle}>
        <Button colorScheme="techPurple" size="large" onClick={onCancel}>
          {t(buttonText)}
        </Button>
      </div>
    </Modal>
  )
}

InsufficientNoticeModal.displayName = "InsufficientNoticeModal"
