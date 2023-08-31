import { css } from "@emotion/react"
import { getColor } from "@illa-design/react"


export const inviteLinkContainer = css`
  margin-top: 16px;
  display: flex;
  flex-direction: column;
`

export const inviteLinkLabelStyle = css`
  color: ${getColor("grayBlue", "02")};
  flex-grow: 1;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 22px;
`

export const inviteLinkMenuContainer = css`
  display: flex;
  flex-direction: row;
  overflow: hidden;
  align-items: center;
`

export const inviteLinkCopyContainer = css`
  display: flex;
  margin-top: 8px;
  flex-direction: row;
  overflow: hidden;
  align-items: center;
`

export const inviteLinkMenuButtonStyle = css`
  font-size: 16px;
  cursor: pointer;
  width: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 16px;
  flex-shrink: 0;
  color: ${getColor("grayBlue", "01")};
`

export const closeInviteLinkContainerStyle = css`
  display: flex;
  margin-top: 8px;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
`

export const secretLinkStyle = css`
  color: ${getColor("grayBlue", "02")};
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`

export const inviteLinkStyle = css`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`