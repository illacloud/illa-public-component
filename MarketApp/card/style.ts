import { css } from "@emotion/react"
import { applyMobileStyle } from "@illa-public/utils"
import { getColor } from "@illa-design/react"

export const cardStyle = css`
  display: flex;
  flex-direction: column;
  gap: 16px;
  justify-content: space-between;
  padding: 24px;
  width: 100%;
  height: 100%;
  border-radius: 8px;
  border: 1px solid ${getColor("grayBlue", "08")};
  background: ${getColor("white", "01")};
  transition: all 0.2s ease-in-out;
  cursor: pointer;

  &:hover {
    border-color: ${getColor("techPurple", "03")};
    box-shadow: 0 4px 16px 0 rgba(0, 0, 0, 0.08);
    .dashboardAgentEditButton,
    .dashboardAgentRunButton {
      visibility: visible;
    }
  }

  ${applyMobileStyle(css`
    gap: 12px;
    padding: 16px;
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
    width: 20px;
    height: 20px;
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
  justify-content: space-between;
  align-items: flex-start;
  gap: 16px;
`

export const titleInfoStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
  overflow: hidden;
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
  width: 240px;
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
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
  word-wrap: break-word;
  ${applyMobileStyle(css`
    height: 36px;
    line-height: 18px;
  `)}
`

export const cardTagContainerStyle = css`
  width: 220px;
  ${applyMobileStyle(css`
    width: 100%;
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

export const cardItemStyle = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
  ${applyMobileStyle(css`
    gap: 12px;
  `)}
`
