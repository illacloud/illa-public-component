import { Avatar } from "@illa-public/avatar"
import { FC } from "react"
import { useTranslation } from "react-i18next"
import { ForkIcon, PlayOutlineIcon, StarOutlineIcon } from "@illa-design/react"
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
  onClick: () => void
  icon: string
  name: string
  description: string
  contributorTeamName: string
  contributorTeamIcon: string
  contributorTeamID: string
  numForks: number
  numStars: number
  numRuns: number
}

export const MarketAgentCard: FC<MarketAgentCardProps> = (props) => {
  const {
    onClick,
    icon,
    name,
    description,
    contributorTeamName,
    contributorTeamIcon,
    contributorTeamID,
    numForks,
    numStars,
    numRuns,
  } = props
  const { t } = useTranslation()

  return (
    <div css={cardStyle} onClick={onClick}>
      <div css={headerStyle}>
        <div css={titleInfoStyle}>
          <img css={agentIconStyle} src={icon} alt="" />
          <span css={nameStyle}>{name}</span>
        </div>
      </div>
      <div>
        <div css={descriptionStyle}>
          {description || t("new_dashboard.desc.no_description")}
        </div>
      </div>

      <div css={footerStyle}>
        <div css={teamInfoStyle}>
          <Avatar
            css={teamAvatarStyle}
            avatarUrl={contributorTeamIcon}
            name={contributorTeamName}
            id={contributorTeamID}
          />
          <span css={teamNameStyle}>{contributorTeamName}</span>
        </div>
        <div css={actionContainerStyle}>
          <div css={actionCountStyle}>
            <ForkIcon />
            <span>{numForks}</span>
          </div>
          <div css={actionCountStyle}>
            <StarOutlineIcon size="16px" />
            {numStars}
          </div>
          <div css={actionCountStyle}>
            <PlayOutlineIcon size="16px" />
            {numRuns}
          </div>
        </div>
      </div>
    </div>
  )
}

MarketAgentCard.displayName = "MarketAgentCard"