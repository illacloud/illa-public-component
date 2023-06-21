import { FC, HTMLAttributes, useMemo } from "react"
import { useTranslation } from "react-i18next"
import {
  Button,
  ButtonColorScheme,
  ButtonVariant,
  Progress,
  getColor,
} from "@illa-design/react"
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
  optionDesStyle,
  titleLineStyle,
  usageCardStyle,
  usageProgressStyle,
} from "@/illa-public-component/UsageCard/style"
import DriveIcon from "./assets/drive.svg"
import LicenseIcon from "./assets/license.svg"
import TrafficIcon from "./assets/traffic.svg"

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
      name: "License usage",
      actionText: "Manage seats",
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

  // get the unit
  // const unit = type === "License" ? "seats" : "GB"

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
        lastActionsStyle: mobileLastLineStyle,
        buttonStyle: mobileActionButtonStyle,
      }
    return {
      cardStyle: usageCardStyle,
      firstLineStyle: titleLineStyle,
      iconTypeStyle: iconStyle,
      progressStyle: usageProgressStyle,
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
          percent > 75 ? getColor("red", "03") : getColor("techPurple", "01")
        }
        w={"100%"}
        percent={percent > 100 ? 100 : percent}
        showText={false}
      />
      {type === "License" ? (
        <div>
          {t("billing.subscription_card.capacity.License", {
            total: total,
            used: current,
          })}
        </div>
      ) : (
        <div css={optionDesStyle}>
          {/*<span>{getStorageSize(current)}</span>*/}
          {/*<span>{getStorageSize(total)}</span>*/}
        </div>
      )}
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
