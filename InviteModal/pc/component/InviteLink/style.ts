import { css } from "@emotion/react"
import { getColor } from "@illa-design/react"


export const inviteLinkContainer = css`
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
  padding: 8px 0;
  display: flex;
  flex-direction: row;
  overflow: hidden;
  align-items: center;
`

export const inviteLinkCopyContainer = css`
  display: flex;
  flex-direction: row;
  overflow: hidden;
  align-items: center;
`

export const inviteLinkMenuButtonStyle = css`
  font-size: 16px;
  width: 16px;
  height: 16px;
  flex-shrink: 0;
  color: ${getColor("grayBlue", "01")};
`