import { Button, Progress } from "@illa-design/react"
import { FC, HTMLAttributes } from "react"
import { Avatar } from "@/illa-public-component/Avatar"
import {
  iconStyle,
  titleLineStyle,
  usageCardStyle,
} from "@/illa-public-component/UsageCard/style"
import DriveIcon from "./assets/drive.svg"
import LicenseIcon from "./assets/license.svg"
import TrafficIcon from "./assets/traffic.svg"

interface UsageCardProps extends HTMLAttributes<HTMLDivElement> {
  type: "License" | "Drive" | "Traffic"
  percent?: number
}

export const UsageCard: FC<UsageCardProps> = (props) => {
  const { onClick, type, ...rest } = props

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

  return (
    <div css={usageCardStyle} onClick={onClick} {...rest}>
      <div css={titleLineStyle}>
        <img css={iconStyle} src={config[type].icon} alt="" />
        <span>{config[type].name}</span>
      </div>
      <Progress color={"techPurple"} w={"100%"} percent={20} />
      <div></div>
      <Button>Manage seats</Button>
    </div>
  )
}

UsageCard.displayName = "UsageCard"
