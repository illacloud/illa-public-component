import { Avatar } from "@illa-public/avatar"
import { CardHashTags } from "@illa-public/card-hash-tags"
import { formatNumForAgent } from "@illa-public/utils"
import { FC } from "react"
import { ForkIcon, PlayOutlineIcon, StarOutlineIcon } from "@illa-design/react"
import { getLLM } from "../modelList"
import { MarketAgentCardProps } from "./interface"
import {
  actionContainerStyle,
  actionCountStyle,
  actionStyle,
  agentIconStyle,
  cardContentContainerStyle,
  cardStyle,
  descriptionStyle,
  headerStyle,
  modalInfoStyle,
  modelLogoStyle,
  modelNameStyle,
  nameStyle,
  teamAvatarStyle,
  teamInfoContainerStyle,
  teamInfoStyle,
  teamNameStyle,
} from "./style"

export const MarketAgentCard: FC<MarketAgentCardProps> = (props) => {
  const { marketAIAgent, hashTags, ...rest } = props

  return (
    <div css={cardStyle} {...rest}>
      <div css={headerStyle}>
        <img
          css={agentIconStyle}
          src={marketAIAgent.aiAgent.icon}
          alt={marketAIAgent.aiAgent.name}
        />
        <div css={teamInfoContainerStyle}>
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
        </div>
        <div css={actionContainerStyle}>
          <div css={actionStyle}>
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
      <div css={cardContentContainerStyle}>
        <span css={nameStyle}>{marketAIAgent.aiAgent.name}</span>
        <div css={modalInfoStyle}>
          <div css={modelLogoStyle}>
            {getLLM(marketAIAgent.aiAgent.model)?.logo}
          </div>
          <div css={modelNameStyle}>
            {getLLM(marketAIAgent.aiAgent.model)?.name}
          </div>
        </div>
        <div css={descriptionStyle}>{marketAIAgent.aiAgent.description}</div>
        {hashTags && hashTags.length && (
          <CardHashTags cardHashTags={hashTags} />
        )}
      </div>
    </div>
  )
}

MarketAgentCard.displayName = "MarketAgentCard"
