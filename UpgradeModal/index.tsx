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
import { ReactComponent as ModalDecorate } from "@/illa-public-component/UpgradeModal/assets/upgrad-modal-bg.svg"
import {
  decorateStyle,
  descriptionStyle,
  footerStyle,
  headerStyle,
  modalCloseIconStyle,
  modalStyle,
  priceContentStyle,
  priceStyle,
  titleStyle,
} from "@/illa-public-component/UpgradeModal/style"
import { ReactComponent as DoubtIcon } from "@/page/billing/assets/doubt.svg"
import { ReactComponent as TipIcon } from "@/page/billing/assets/pricing-tip.svg"
import {
  applyCardListStyle,
  doubtStyle,
  iconStyle,
} from "@/page/billing/components/pricing/style"
import { modalMaskStyle } from "@/page/workspace/components/CreateTeamModal/style"

interface UpgradeModalProps extends ModalProps {
  title?: ReactNode
  description?: ReactNode
  upgradeType?: "upgrade" | "add license"
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

export const UpgradeModal: FC<UpgradeModalProps> = (props) => {
  const { upgradeType = "upgrade", onCancel, ...otherProps } = props
  const { t } = useTranslation()

  const { title, description, buttonText } = useMemo(() => {
    if (upgradeType === "add license") {
      return {
        title: t("billing.modal.upgrade_now_admin.insufficient_license_title"),
        description: t(
          "billing.modal.upgrade_now_admin.insufficient_license_description",
        ),
        buttonText: t(
          "billing.modal.upgrade_now_admin.insufficient_license_button",
        ),
      }
    }
    return {
      title: t("billing.modal.upgrade_now_admin.upgrade_to_plus"),
      description: t("billing.modal.upgrade_now_admin.this_feature_is_avai"),
      buttonText: t("billing.modal.upgrade_now_admin.upgrade"),
    }
  }, [upgradeType, t])

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
        <div css={titleStyle}>{title}</div>
        <div css={descriptionStyle}>{description}</div>
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
            {buttonText}
          </Button>
        </div>
      </div>
    </Modal>
  )
}

UpgradeModal.displayName = "UpgradeModal"
