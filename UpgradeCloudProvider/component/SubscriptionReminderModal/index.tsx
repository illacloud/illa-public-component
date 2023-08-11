import { UpgradeIcon } from "@illa-public/icon"
import { FC, ReactNode, useCallback, useContext, useMemo } from "react"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import {
  Button,
  CloseIcon,
  Link,
  Modal,
  ModalProps,
  Trigger,
} from "@illa-design/react"
import {
  SUBSCRIBE_PLAN,
  SUBSCRIPTION_CYCLE,
} from "@/illa-public-component/MemberList/interface"
import { getCurrentTeamInfo } from "@/redux/team/teamSelector"
import { UpgradeCloudContext } from "../../index"
import { ReactComponent as DoubtIcon } from "./assets/doubt.svg"
import { ReactComponent as TipIcon } from "./assets/pricing-tip.svg"
import { ReactComponent as ModalDecorate } from "./assets/upgrad-modal-bg.svg"
import {
  applyCardListStyle,
  decorateStyle,
  descriptionStyle,
  doubtStyle,
  footerStyle,
  headerStyle,
  highlightStyle,
  iconStyle,
  modalCloseIconStyle,
  modalMaskStyle,
  modalStyle,
  priceContentStyle,
  priceStyle,
  titleStyle,
  upgradeButtonStyle,
} from "./style"

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
export const upgradeModalConfigKeys = Object.keys(modalConfigKey)

export type UpgradeModalType = keyof typeof modalConfigKey

const highlightMap: Partial<Record<UpgradeModalType, string>> = {
  agent: "billing.modal.ai-agent.string1",
}

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
  const { handleLicenseDrawerVisible } = useContext(UpgradeCloudContext)

  const teamInfo = useSelector(getCurrentTeamInfo)

  const { title, description, buttonText } = useMemo(() => {
    return modalConfigKey[configType]
  }, [configType])

  const highlight = useMemo(() => {
    return highlightMap?.[configType]
  }, [configType])

  const billingUrl = useMemo(() => {
    if (!teamInfo?.identifier) return ""
    return `${location.protocol}//${process.env.ILLA_CLOUD_URL}/team/${teamInfo?.identifier}/billing`
  }, [teamInfo?.identifier])

  const openDrawer = useCallback(() => {
    const currentTeamLicense = teamInfo?.currentTeamLicense
    onCancel?.()
    handleLicenseDrawerVisible(true, {
      type: "license",
      subscribeInfo: {
        quantity: currentTeamLicense?.cancelAtPeriodEnd
          ? 1
          : currentTeamLicense?.volume ?? 1,
        cycle: currentTeamLicense?.cycle || SUBSCRIPTION_CYCLE.MONTHLY,
        plan: SUBSCRIBE_PLAN.TEAM_LICENSE_PREMIUM,
        currentPlan: currentTeamLicense?.plan,
        cancelAtPeriodEnd: currentTeamLicense?.cancelAtPeriodEnd,
      },
    })
  }, [onCancel, teamInfo?.currentTeamLicense, handleLicenseDrawerVisible])

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
        <div css={descriptionStyle}>
          {highlight ? <span css={highlightStyle}>{t(highlight)}</span> : null}
          <span>{t(description)}</span>
        </div>
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
          <Link colorScheme="techPurple" href={billingUrl}>
            {t("billing.modal.upgrade_now_admin.learn_more")}
          </Link>
        </div>
        <div css={footerStyle}>
          <div>
            <div css={priceStyle}>$16.7</div>
            <div css={priceContentStyle}>
              {t("billing.modal.upgrade_now_admin.pricing")}
            </div>
          </div>
          <Button
            css={upgradeButtonStyle}
            leftIcon={<UpgradeIcon />}
            colorScheme="techPurple"
            onClick={openDrawer}
          >
            {t(buttonText)}
          </Button>
        </div>
      </div>
    </Modal>
  )
}

SubscriptionReminderModal.displayName = "SubscriptionReminderModal"
