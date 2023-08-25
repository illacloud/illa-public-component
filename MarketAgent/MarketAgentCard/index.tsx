import { Avatar } from "@illa-public/avatar"
import { formatNumForAgent } from "@illa-public/utils"
import { FC } from "react"
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

export const MarketAgentCard: FC<MarketAgentCardProps> = (props) => {
  const { t } = useTranslation()
  const { marketAIAgent, ...rest } = props

  return (
    <div css={cardStyle} {...rest}>
      <div css={headerStyle}>
        <div css={titleInfoStyle}>
          <img css={agentIconStyle} src={marketAIAgent.aiAgent.icon} alt="" />
          <span css={nameStyle}>{marketAIAgent.aiAgent.name}</span>
        </div>
      </div>
      <div>
        <div css={descriptionStyle}>
          {marketAIAgent.aiAgent.description ||
            t("new_dashboard.desc.no_description")}
        </div>
      </div>

      <div css={footerStyle}>
        <div css={teamInfoStyle}>
          <Avatar
            css={teamAvatarStyle}
            avatarUrl={marketAIAgent.marketplace.contributorTeam.icon}
            name={marketAIAgent.marketplace.contributorTeam.name}
            id={marketAIAgent.marketplace.contributorTeam.teamID}
          />
          <span css={teamNameStyle}>
            {marketAIAgent.marketplace.contributorTeam.name}
          </span>
        </div>
        <div css={actionContainerStyle}>
          <div css={actionCountStyle}>
            <ForkIcon size="16px" />
            {formatNumForAgent(marketAIAgent.marketplace.numForks)}
          </div>
          <div css={actionCountStyle}>
            <StarOutlineIcon size="16px" />
            {formatNumForAgent(marketAIAgent.marketplace.numStars)}
          </div>
          <div css={actionCountStyle}>
            <PlayOutlineIcon size="16px" />
            {formatNumForAgent(marketAIAgent.marketplace.numRuns)}
          </div>
        </div>
      </div>
    </div>
  )
}

MarketAgentCard.displayName = "MarketAgentCard"