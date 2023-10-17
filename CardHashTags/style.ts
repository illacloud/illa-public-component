import { css } from "@emotion/react"
import { getColor } from "@illa-design/react"

export const cardTagsContainerStyle = css`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`

export const tagContainerCoverStyle = css`
  padding: 1px 8px;
`

export const tagContentStyle = css`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  color: ${getColor("grayBlue", "02")};
  font-size: 12px;
  font-weight: 400;
  line-height: 20px;
`
