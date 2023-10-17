import { Avatar } from "@illa-public/avatar"
import { CardHashtags } from "@illa-public/card-hash-tags"
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
  const { marketAIAgent, ...rest } = props
  const { aiAgent, marketplace } = marketAIAgent ?? {}

  return (
    <div css={cardStyle} {...rest}>
      <div css={headerStyle}>
        <img css={agentIconStyle} src={aiAgent.icon} alt={aiAgent.name} />
        <div css={teamInfoContainerStyle}>
          <div css={teamInfoStyle}>
            <Avatar
              css={teamAvatarStyle}
              avatarUrl={marketplace?.contributorTeam?.icon}
              name={marketplace?.contributorTeam?.name}
              id={marketplace?.contributorTeam?.teamID}
            />
            <span css={teamNameStyle}>
              {marketplace?.contributorTeam?.name}
            </span>
          </div>
        </div>
        <div css={actionContainerStyle}>
          <div css={actionStyle}>
            <div css={actionCountStyle}>
              <ForkIcon size="16px" />
              {formatNumForAgent(marketplace?.numForks)}
            </div>
            <div css={actionCountStyle}>
              <StarOutlineIcon size="16px" />
              {formatNumForAgent(marketplace?.numStars)}
            </div>
            <div css={actionCountStyle}>
              <PlayOutlineIcon size="16px" />
              {formatNumForAgent(marketplace?.numRuns)}
            </div>
          </div>
        </div>
      </div>
      <div css={cardContentContainerStyle}>
        <span css={nameStyle}>{aiAgent?.name}</span>
        <div css={modalInfoStyle}>
          <div css={modelLogoStyle}>{getLLM(aiAgent?.model)?.logo}</div>
          <div css={modelNameStyle}>{getLLM(aiAgent?.model)?.name}</div>
        </div>
        <div css={descriptionStyle}>{aiAgent?.description}</div>
        {!!(marketplace?.hashtags && marketplace?.hashtags.length) && (
          <CardHashtags cardHashtags={marketplace?.hashtags} />
        )}
      </div>
    </div>
  )
}

MarketAgentCard.displayName = "MarketAgentCard"
