import {
  Button,
  CloseIcon,
  Link,
  Modal,
  ModalProps,
  Trigger,
} from "@illa-design/react"
import { FC, ReactNode, useMemo } from "react"
import { useTranslation } from "react-i18next"
import { UpgradeIcon } from "@/illa-public-component/Icon/upgrade"
import { ReactComponent as ModalDecorate } from "@/illa-public-component/UpgradeCloudProvider/component/SubscriptionReminderModal/assets/upgrad-modal-bg.svg"
import {
  applyCardListStyle,
  decorateStyle,
  descriptionStyle,
  doubtStyle,
  footerStyle,
  headerStyle,
  iconStyle,
  modalCloseIconStyle,
  modalMaskStyle,
  modalStyle,
  priceContentStyle,
  priceStyle,
  titleStyle,
} from "@/illa-public-component/UpgradeCloudProvider/component/SubscriptionReminderModal/style"
import { ReactComponent as DoubtIcon } from "./assets/doubt.svg"
import { ReactComponent as TipIcon } from "./assets/pricing-tip.svg"

const modalConfigKey = {
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
}

export type UpgradeModalType = keyof typeof modalConfigKey

interface UpgradeModalProps extends ModalProps {
  title?: ReactNode
  description?: ReactNode
  configType?: UpgradeModalType
}

const featureConfig = [
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

export const SubscriptionReminderModal: FC<UpgradeModalProps> = (props) => {
  const { configType = "upgrade", onCancel, ...otherProps } = props
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
      <ModalDecorate css={decorateStyle} />
      <div css={headerStyle}>
        <div css={titleStyle}>{t(title)}</div>
        <div css={descriptionStyle}>{t(description)}</div>
      </div>
      <div>
        {featureConfig.map(({ label, tip }, i) => {
          return (
            <div css={applyCardListStyle(label)} key={`${label}${i}`}>
              {label && <TipIcon css={iconStyle} />}
              <span>{t(label)}</span>
              {tip && (
                <Trigger
                  trigger="hover"
                  colorScheme="techPurple"
                  content={t(tip)}
                >
                  <span css={doubtStyle}>
                    <DoubtIcon css={iconStyle} />
                  </span>
                </Trigger>
              )}
            </div>
          )
        })}
        <div css={applyCardListStyle("learn_more")}>
          <Link colorScheme="techPurple">
            {t("billing.modal.upgrade_now_admin.learn_more")}
          </Link>
        </div>
        <div css={footerStyle}>
          <div>
            <div css={priceStyle}>$8.3</div>
            <div css={priceContentStyle}>
              {t("billing.modal.upgrade_now_admin.pricing")}
            </div>
          </div>
          <Button colorScheme="techPurple">
            <UpgradeIcon />
            {t(buttonText)}
          </Button>
        </div>
      </div>
    </Modal>
  )
}

SubscriptionReminderModal.displayName = "SubscriptionReminderModal"
