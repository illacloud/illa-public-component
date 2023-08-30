import { Avatar } from "@illa-public/avatar"
import { formatNumForAgent } from "@illa-public/utils"
import { FC, useCallback } from "react"
import { ForkIcon, StarOutlineIcon } from "@illa-design/react"
import { MarketAppCardProps } from "./interface"
import {
  actionContainerStyle,
  actionCountStyle,
  cardStyle,
  descriptionStyle,
  footerStyle,
  headerStyle,
  nameStyle,
  teamAvatarStyle,
  teamInfoStyle,
  teamNameStyle,
  titleInfoStyle,
} from "./style"

export const MarketAppCard: FC<MarketAppCardProps> = (props) => {
  const { app, marketplace, onClick } = props

  const onCardClick = useCallback(() => {
    onClick?.(app.appId)
  }, [onClick, app.appId])

  return (
    <div css={cardStyle} onClick={onCardClick}>
      <div css={headerStyle}>
        <div css={titleInfoStyle}>
          <span css={nameStyle}>{app.appName}</span>
        </div>
      </div>
      <div>
        <div css={descriptionStyle}>{app.config.description}</div>
      </div>
      <div css={footerStyle}>
        <div css={teamInfoStyle}>
          <Avatar
            css={teamAvatarStyle}
            avatarUrl={marketplace.contributorTeam.icon}
            name={marketplace.contributorTeam.name}
            id={marketplace.contributorTeam.teamID}
          />
          <span css={teamNameStyle}>{marketplace.contributorTeam.name}</span>
        </div>
        <div css={actionContainerStyle}>
          <div css={actionCountStyle}>
            <ForkIcon />
            {formatNumForAgent(marketplace.numForks)}
          </div>
          <div css={actionCountStyle}>
            <StarOutlineIcon size="16px" />
            {formatNumForAgent(marketplace.numStars)}
          </div>
        </div>
      </div>
    </div>
  )
}

MarketAppCard.displayName = "MarketAppCard"
