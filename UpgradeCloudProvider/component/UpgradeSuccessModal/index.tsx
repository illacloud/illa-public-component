import { Button, CloseIcon, Modal, ModalProps } from "@illa-design/react"
import { FC, useMemo } from "react"
import { useTranslation } from "react-i18next"
import { ReactComponent as ModalDecorate } from "@/illa-public-component/UpgradeCloudProvider/component/SubscriptionReminderModal/assets/upgrad-modal-bg.svg"
import {
  decorateStyle,
  descriptionStyle,
  headerStyle,
  modalCloseIconStyle,
  modalMaskStyle,
  modalStyle,
  titleStyle,
} from "@/illa-public-component/UpgradeCloudProvider/component/SubscriptionReminderModal/style"
import { actionAreaStyle } from "@/illa-public-component/UpgradeCloudProvider/component/UpgradeSuccessModal/style"

const modalConfigKey = {
  "subscribe-license": {
    title: "billing.modal.sub_suc.subscription_success",
    description: "billing.modal.sub_suc.you_can_now_invite_m",
  },
  "upgrade-license": {
    title: "billing.modal.sub_suc.payment_successful",
    description: "billing.modal.sub_suc.we_have_added_the_li",
  },
  "upgrade-storage": {
    title: "billing.modal.sub_suc.payment_successful",
    description: "billing.modal.sub_suc.we_have_added_the_st",
  },
  "upgrade-traffic": {
    title: "billing.modal.sub_suc.payment_successful",
    description: "billing.modal.sub_suc.we_have_added_the_tr",
  },
  renew: {
    title: "billing.modal.sub_suc.successfully_updated",
    description: "billing.modal.sub_suc.the_change_to_the_su",
  },
}

type ModalType = keyof typeof modalConfigKey

interface UpgradeSuccessModalProps extends ModalProps {
  successType?: ModalType
}

export const UpgradeSuccessModal: FC<UpgradeSuccessModalProps> = (props) => {
  const { successType = "renew", onCancel, ...otherProps } = props
  const { t } = useTranslation()

  const { title, description } = useMemo(() => {
    return modalConfigKey[successType]
  }, [successType])

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
      <ModalDecorate css={decorateStyle} />
      <div css={headerStyle}>
        <div css={titleStyle}>{t(title)}</div>
        <div css={descriptionStyle}>{t(description)}</div>
      </div>
      <div css={actionAreaStyle}>
        <Button colorScheme="techPurple" size="large" onClick={onCancel}>
          {t("billing.modal.sub_suc.got_it")}
        </Button>
      </div>
    </Modal>
  )
}

UpgradeSuccessModal.displayName = "UpgradeSuccessModal"
