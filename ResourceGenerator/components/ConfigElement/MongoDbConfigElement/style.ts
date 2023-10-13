import { css } from "@emotion/react"
import { getColor } from "@illa-design/react"

export const labelContainer = css`
  display: flex;
  flex-direction: row;
  justify-content: end;
  min-width: 176px;
`

export const configItem = css`
  display: flex;
  height: 48px;
  align-items: center;
  flex-direction: row;
`

export const configItemTip = css`
  font-size: 14px;
  margin-left: 192px;
  margin-bottom: 6px;
  color: ${getColor("grayBlue", "04")};
`

export const connectTypeStyle = css`
  font-size: 14px;
  color: ${getColor("grayBlue", "02")};
  margin-left: 16px;
`
