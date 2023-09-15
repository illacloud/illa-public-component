import { css } from "@emotion/react"
import { applyMobileStyle } from "@illa-public/utils"
import { getColor } from "@illa-design/react"

export const market_agent_card_height = 204

export const cardStyle = css`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 24px;
  width: 100%;
  height: ${market_agent_card_height}px;
  border-radius: 8px;
  border: 1px solid ${getColor("grayBlue", "08")};
  background: ${getColor("white", "01")};
  transition: all 0.2s ease-in-out;
  cursor: pointer;

  &:hover {
    border-color: ${getColor("techPurple", "01")};
    box-shadow: 0 4px 16px 0 rgba(0, 0, 0, 0.08);

    .dashboardAgentEditButton,
    .dashboardAgentRunButton {
      visibility: visible;
    }
  }

  ${applyMobileStyle(css`
    gap: 12px;
    padding: 16px;
    height: 180px;

    &:hover {
      border-color: ${getColor("grayBlue", "08")};
      box-shadow: none;

      .dashboardAgentEditButton,
      .dashboardAgentRunButton {
        visibility: hidden;
      }
    }
  `)}
`
export const teamInfoStyle = css`
  display: flex;
  align-items: center;
  gap: 8px;
`

export const teamAvatarStyle = css`
  width: 24px;
  height: 24px;
  flex-shrink: 0;

  ${applyMobileStyle(css`
    width: 28px;
    height: 28px;
  `)}
`

export const teamNameStyle = css`
  font-size: 12px;
  font-weight: 400;
  line-height: 20px;
  color: ${getColor("grayBlue", "02")};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

export const actionContainerStyle = css`
  display: flex;
  align-items: center;
  gap: 16px;
`

export const actionCountStyle = css`
  display: flex;
  align-items: center;
  color: ${getColor("grayBlue", "04")};
  font-size: 14px;
  font-weight: 400;
  line-height: 22px;
`

export const headerStyle = css`
  display: flex;
  flex-direction: row;
  align-items: center;
`

export const titleInfoStyle = css`
  display: flex;
  margin-left: 16px;
  flex-direction: column;
  overflow: hidden;
`

export const modelContainerStyle = css`
  display: flex;
  margin-top: 4px;
  flex-direction: row;
  align-items: center;
  gap: 8px;
`

export const modelNameStyle = css`
  color: ${getColor("grayBlue", "02")};
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px;
`

export const modelLogoStyle = css`
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  & svg {
    height: 100%;
    width: 100%;
  }
  ${applyMobileStyle(css`
    width: 20px;
    height: 20px;
  `)}
`

export const agentIconStyle = css`
  object-fit: cover;
  width: 64px;
  height: 64px;
  border-radius: 8px;
  background: ${getColor("grayBlue", "09")};

  ${applyMobileStyle(css`
    width: 60px;
    height: 60px;
  `)}
`

export const textEllipsisStyle = css`
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`

export const nameStyle = css`
  color: #1d2129;
  font-size: 14px;
  font-weight: 500;
  line-height: 22px;
  ${textEllipsisStyle};

  ${applyMobileStyle(css`
    font-size: 16px;
  `)}
`

export const descriptionStyle = css`
  color: #787e85;
  height: 40px;
  font-size: 12px;
  font-weight: 400;
  line-height: 20px;
  text-overflow: ellipsis;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;

  ${applyMobileStyle(css`
    height: 36px;
    line-height: 18px;
  `)}
`

export const footerStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 24px;
`

export const applyHiddenStyle = (isHidden: boolean) => css`
  visibility: ${isHidden ? "hidden" : "visible"};
`
