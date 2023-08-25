import { Avatar } from "@illa-public/avatar"
import { CSSProperties, FC, useCallback } from "react"
import { useTranslation } from "react-i18next"
import { ForkIcon, PlayOutlineIcon, StarOutlineIcon } from "@illa-design/react"
import { MarketAgentCardProps } from "./interface"
import {
  actionContainerStyle,
  actionCountStyle,
  agentIconStyle,
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

export const CARD_GUTTER_SIZE = 24

export const calculateStyle = (style?: CSSProperties) => {
  const { left, top, width, height, ...otherStyles } = style || {}

  return {
    ...otherStyles,
    left: typeof left === "number" ? left + CARD_GUTTER_SIZE : undefined,
    top: typeof top === "number" ? top + CARD_GUTTER_SIZE : undefined,
    width: typeof width === "number" ? width - CARD_GUTTER_SIZE : undefined,
    height: typeof height === "number" ? height - CARD_GUTTER_SIZE : undefined,
  }
}

export const MarketAgentCard: FC<MarketAgentCardProps> = (props) => {
  const { t } = useTranslation()
  const { style, aiAgent, marketplace, onClick } = props

  const onCardClick = useCallback(() => {
    onClick?.(aiAgent.aiAgentID)
  }, [onClick, aiAgent.aiAgentID])

  return (
    <div css={cardStyle} style={calculateStyle(style)} onClick={onCardClick}>
      <div css={headerStyle}>
        <div css={titleInfoStyle}>
          <img css={agentIconStyle} src={aiAgent.icon} alt="" />
          <span css={nameStyle}>{aiAgent.name}</span>
        </div>
      </div>
      <div>
        <div css={descriptionStyle}>
          {aiAgent.description || t("new_dashboard.desc.no_description")}
        </div>
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
            <span>{marketplace.numForks}</span>
          </div>
          <div css={actionCountStyle}>
            <StarOutlineIcon size="16px" />
            {marketplace.numStars}
          </div>
          <div css={actionCountStyle}>
            <PlayOutlineIcon size="16px" />
            {marketplace.numRuns}
          </div>
        </div>
      </div>
    </div>
  )
}

MarketAgentCard.displayName = "MarketAgentCard"
