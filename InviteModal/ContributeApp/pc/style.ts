import { css } from "@emotion/react"
import { getColor } from "@illa-design/react"

export const blockStyle = css`
  padding: 8px 0;
  display: flex;
  flex-direction: column;
`

export const blockLabelStyle = css`
  color: ${getColor("grayBlue", "02")};
  font-size: 14px;
  margin-bottom: 8px;
  font-weight: 500;
  line-height: 22px;
`

export const blockRequireStyle = css`
  margin-left: 4px;
`

export const blockCheckboxStyle = css`
  width: 100%;
  padding-top: 16px;
`
