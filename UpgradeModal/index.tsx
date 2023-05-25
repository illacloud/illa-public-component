import { CloseIcon, Link, Modal, ModalProps, Trigger } from "@illa-design/react"
import { FC } from "react"
import { useTranslation } from "react-i18next"
import { ReactComponent as ModalDecorate } from "@/illa-public-component/UpgradeModal/assets/upgrad-modal-bg.svg"
import {
  decorateStyle,
  modalStyle,
} from "@/illa-public-component/UpgradeModal/style"
import { ReactComponent as DoubtIcon } from "@/page/billing/assets/doubt.svg"
import { ReactComponent as TipIcon } from "@/page/billing/assets/pricing-tip.svg"
import {
  applyCardListStyle,
  doubtStyle,
  iconStyle,
} from "@/page/billing/components/pricing/style"
import {
  modalCloseIconStyle,
  modalMaskStyle,
} from "@/page/workspace/components/CreateTeamModal/style"

interface UpgradeModalProps extends ModalProps {}

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
  const { onCancel, ...otherProps } = props
  const { t } = useTranslation()

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
      </div>
    </Modal>
  )
}

UpgradeModal.displayName = "UpgradeModal"
