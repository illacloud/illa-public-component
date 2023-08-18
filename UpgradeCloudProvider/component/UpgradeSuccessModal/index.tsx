import { FC, useMemo } from "react"
import { useTranslation } from "react-i18next"
import { Button, CloseIcon, Modal, ModalProps } from "@illa-design/react"
import {
  decorateStyle,
  descriptionStyle,
  headerStyle,
  modalCloseIconStyle,
  modalStyle,
  titleStyle,
} from "../SubscriptionReminderModal/style"
import { ReactComponent as ModalDecorate } from "../UpgradeSuccessModal/assets/success-bg.svg"
import { actionAreaStyle } from "../UpgradeSuccessModal/style"

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

export type UpgradeSuccessModalType = keyof typeof modalConfigKey

interface UpgradeSuccessModalProps extends ModalProps {
  configType?: UpgradeSuccessModalType
}

export const UpgradeSuccessModal: FC<UpgradeSuccessModalProps> = (props) => {
  const { configType = "renew", onCancel, ...otherProps } = props
  const { t } = useTranslation()

  const { title, description } = useMemo(() => {
    return modalConfigKey[configType]
  }, [configType])

  return (
    <Modal
      _css={modalStyle}
      withoutPadding
      maskClosable={false}
      footer={false}
      onCancel={onCancel}
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
