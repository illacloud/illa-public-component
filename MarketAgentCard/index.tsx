// import { ForkIcon, PlayOutlineIcon, StarOutlineIcon } from "@illa-design/react"
import { Avatar } from "@illa-public/avatar"
import { CSSProperties, FC, useCallback } from "react"
import { useTranslation } from "react-i18next"
import { PublicMarketAiAgent } from "@/redux/aiAgent/aiAgentState"
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

interface MarketAgentCardProps {
  style?: CSSProperties
  agentInfo: PublicMarketAiAgent
  onClick?: (aiAgentID: string) => void
}

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
  const { style, agentInfo, onClick } = props

  const onCardClick = useCallback(() => {
    onClick?.(agentInfo.aiAgent.aiAgentID)
  }, [onClick, agentInfo.aiAgent.aiAgentID])

  return (
    <div css={cardStyle} style={calculateStyle(style)} onClick={onCardClick}>
      <div css={headerStyle}>
        <div css={titleInfoStyle}>
          <img css={agentIconStyle} src={agentInfo.aiAgent.icon} alt="" />
          <span css={nameStyle}>{agentInfo.aiAgent.name}</span>
        </div>
      </div>
      <div>
        <div css={descriptionStyle}>
          {agentInfo.aiAgent.description ||
            t("new_dashboard.desc.no_description")}
        </div>
      </div>

      <div css={footerStyle}>
        <div css={teamInfoStyle}>
          <Avatar
            css={teamAvatarStyle}
            avatarUrl={agentInfo.marketplace.contributorTeam.icon}
            name={agentInfo.marketplace.contributorTeam.name}
            id={agentInfo.marketplace.contributorTeam.teamID}
          />
          <span css={teamNameStyle}>
            {agentInfo.marketplace.contributorTeam.name}
          </span>
        </div>
        <div css={actionContainerStyle}>
          <div css={actionCountStyle}>
            {/*<ForkIcon />*/}
            <span>{agentInfo.marketplace.numForks}</span>
          </div>
          <div css={actionCountStyle}>
            {/*<StarOutlineIcon size="16px" />*/}
            {agentInfo.marketplace.numStars}
          </div>
          <div css={actionCountStyle}>
            {/*<PlayOutlineIcon size="16px" />*/}
            {agentInfo.marketplace.numRuns}
          </div>
        </div>
      </div>
    </div>
  )
}

MarketAgentCard.displayName = "MarketAgentCard"
