import { FC, HTMLAttributes, useMemo } from "react"
import { useTranslation } from "react-i18next"
import {
  Button,
  ButtonColorScheme,
  ButtonVariant,
  Progress,
  getColor,
} from "@illa-design/react"
import DriveIcon from "./assets/drive.svg"
import LicenseIcon from "./assets/license.svg"
import TrafficIcon from "./assets/traffic.svg"
import {
  actionButtonStyle,
  iconStyle,
  lastLineStyle,
  mobileActionButtonStyle,
  mobileIconStyle,
  mobileLastLineStyle,
  mobileTitleLineStyle,
  mobileUsageCardStyle,
  mobileUsageProgressStyle,
  progressDetailStyle,
  titleLineStyle,
  totalStyle,
  usageCardStyle,
  usageProgressStyle,
  usedStyle,
} from "./style"

interface UsageCardProps extends HTMLAttributes<HTMLDivElement> {
  type: "License" | "Drive" | "Traffic"
  percent?: number
  total: number
  current: number
  isMobile?: boolean
  actionDes?: string
  buttonColorScheme?: ButtonColorScheme
  buttonVariant?: ButtonVariant
  onClick?: () => void
}

export const UsageCard: FC<UsageCardProps> = (props) => {
  const {
    type,
    total,
    current,
    isMobile,
    actionDes,
    buttonColorScheme = "techPurple",
    buttonVariant,
    onClick,
    ...rest
  } = props
  const { t } = useTranslation()

  const config = {
    License: {
      name: t("billing.subscription_card.title.License"),
      actionText: t("billing.subscription_card.button.License"),
      icon: LicenseIcon,
    },
    Drive: {
      name: "Drive",
      actionText: "Manage storage",
      icon: DriveIcon,
    },
    Traffic: {
      name: "Traffic",
      actionText: "Expand",
      icon: TrafficIcon,
    },
  }

  // get percent from total and current
  const percent = useMemo(
    () => Math.round((current / total) * 100),
    [total, current],
  )

  const {
    cardStyle,
    firstLineStyle,
    iconTypeStyle,
    progressStyle,
    lastActionsStyle,
    buttonStyle,
  } = useMemo(() => {
    if (isMobile)
      return {
        cardStyle: mobileUsageCardStyle,
        firstLineStyle: mobileTitleLineStyle,
        iconTypeStyle: mobileIconStyle,
        progressStyle: mobileUsageProgressStyle,
        processDetailStyle: progressDetailStyle,
        usedStyle: usedStyle,
        totalStyle: totalStyle,
        lastActionsStyle: mobileLastLineStyle,
        buttonStyle: mobileActionButtonStyle,
      }
    return {
      cardStyle: usageCardStyle,
      firstLineStyle: titleLineStyle,
      iconTypeStyle: iconStyle,
      progressStyle: usageProgressStyle,
      processDetailStyle: progressDetailStyle,
      usedStyle: usedStyle,
      totalStyle: totalStyle,
      lastActionsStyle: lastLineStyle,
      buttonStyle: actionButtonStyle,
    }
  }, [isMobile])

  return (
    <div css={cardStyle} {...rest}>
      <div css={firstLineStyle}>
        <img css={iconTypeStyle} src={config[type].icon} alt="" />
        <span>{config[type].name}</span>
      </div>
      <Progress
        _css={progressStyle}
        color={
          percent > 75 ? getColor("red", "03") : getColor("techPurple", "03")
        }
        w={"100%"}
        percent={percent > 100 ? 100 : percent}
        showText={false}
      />
      {type === "License" ? (
        <div css={progressDetailStyle}>
          <span css={usedStyle}>{current}</span>
          <span css={totalStyle}>
            {t("billing.subscription_card.capacity.License", {
              total: total,
            })}
          </span>
        </div>
      ) : null}
      <div css={lastActionsStyle}>
        {actionDes && <span>{actionDes}</span>}
        <Button
          _css={buttonStyle}
          colorScheme={buttonColorScheme}
          variant={buttonVariant}
          onClick={onClick}
        >
          {config[type].actionText}
        </Button>
      </div>
    </div>
  )
}

UsageCard.displayName = "UsageCard"
