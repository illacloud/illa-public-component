import { Button, Progress, getColor } from "@illa-design/react"
import { FC, HTMLAttributes, useMemo } from "react"
import {
  currentTextStyle,
  iconStyle,
  lastLineStyle,
  mobileCurrentTextStyle,
  mobileIconStyle,
  mobileLastLineStyle,
  mobileTitleLineStyle,
  mobileUsageCardStyle,
  mobileUsageProgressStyle,
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
}

export const UsageCard: FC<UsageCardProps> = (props) => {
  const { type, total, current, isMobile, onClick, ...rest } = props

  const config = {
    License: {
      name: "License usage",
      icon: LicenseIcon,
    },
    Drive: {
      name: "Drive",
      icon: DriveIcon,
    },
    Traffic: {
      name: "Traffic",
      icon: TrafficIcon,
    },
  }

  // get percent from total and current
  const percent = useMemo(
    () => Math.round((current / total) * 100),
    [total, current],
  )

  // get the unit
  const unit = type === "License" ? "seats" : "GB"

  const {
    cardStyle,
    firstLineStyle,
    iconTypeStyle,
    progressStyle,
    currentStyle,
    lastActionsStyle,
  } = useMemo(() => {
    if (isMobile)
      return {
        cardStyle: mobileUsageCardStyle,
        firstLineStyle: mobileTitleLineStyle,
        iconTypeStyle: mobileIconStyle,
        progressStyle: mobileUsageProgressStyle,
        currentStyle: mobileCurrentTextStyle,
        lastActionsStyle: mobileLastLineStyle,
      }
    return {
      cardStyle: usageCardStyle,
      firstLineStyle: titleLineStyle,
      iconTypeStyle: iconStyle,
      progressStyle: usageProgressStyle,
      currentStyle: currentTextStyle,
      lastActionsStyle: lastLineStyle,
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
      <div>
        <span css={currentStyle}>{current}</span>
        <span>{`of ${total} Licenses used`}</span>
      </div>
      <div css={lastActionsStyle}>
        <Button>Manage seats</Button>
      </div>
    </div>
  )
}

UsageCard.displayName = "UsageCard"
