import {
  Button,
  ButtonColorScheme,
  Progress,
  getColor,
} from "@illa-design/react"
import { FC, HTMLAttributes, useMemo } from "react"
import {
  actionButtonStyle,
  currentTextStyle,
  iconStyle,
  lastLineStyle,
  mobileActionButtonStyle,
  mobileCurrentTextStyle,
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
// import { getStorageSize } from "@/utils/storage/calculateSize"
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
}

export const UsageCard: FC<UsageCardProps> = (props) => {
  const {
    type,
    total,
    current,
    isMobile,
    actionDes,
    buttonColorScheme = "techPurple",
    onClick,
    ...rest
  } = props

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
    currentStyle,
    lastActionsStyle,
    buttonStyle,
  } = useMemo(() => {
    if (isMobile)
      return {
        cardStyle: mobileUsageCardStyle,
        firstLineStyle: mobileTitleLineStyle,
        iconTypeStyle: mobileIconStyle,
        progressStyle: mobileUsageProgressStyle,
        currentStyle: mobileCurrentTextStyle,
        lastActionsStyle: mobileLastLineStyle,
        buttonStyle: mobileActionButtonStyle,
      }
    return {
      cardStyle: usageCardStyle,
      firstLineStyle: titleLineStyle,
      iconTypeStyle: iconStyle,
      progressStyle: usageProgressStyle,
      currentStyle: currentTextStyle,
      lastActionsStyle: lastLineStyle,
      buttonStyle: actionButtonStyle,
    }
  }, [isMobile])

  return (
    <div css={cardStyle} onClick={onClick} {...rest}>
      <div css={firstLineStyle}>
        <img css={iconTypeStyle} src={config[type].icon} alt="" />
        <span>{config[type].name}</span>
      </div>
      <Progress
        _css={progressStyle}
        color={getColor("techPurple", "01")}
        w={"100%"}
        percent={percent}
        showText={false}
      />
      {type === "License" ? (
        <div>
          <span css={currentStyle}>{current}</span>
          <span>{`of ${total} Licenses used`}</span>
        </div>
      ) : (
        <div css={optionDesStyle}>
          {/*<span>{getStorageSize(current)}</span>*/}
          {/*<span>{getStorageSize(total)}</span>*/}
        </div>
      )}
      <div css={lastActionsStyle}>
        {actionDes && <span>{actionDes}</span>}
        <Button _css={buttonStyle} colorScheme={buttonColorScheme}>
          {config[type].actionText}
        </Button>
      </div>
    </div>
  )
}

UsageCard.displayName = "UsageCard"
