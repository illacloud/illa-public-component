import { css } from "@emotion/react"
import { getColor } from "@illa-design/react"

export const tagContainer = css`
  display: flex;
  flex-direction: column;
  padding: 8px 24px;
`

export const tagInputContainerStyle = css`
  display: flex;
  flex-direction: row;
`

export const titleStyle = css`
  color: ${getColor("grayBlue", "02")};
  text-align: right;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 22px;
`
