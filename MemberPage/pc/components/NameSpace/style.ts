import { css } from "@emotion/react"
import { getColor } from "@illa-design/react"

export const nameSpaceWrapperStyle = css`
  max-width: 520px;
  display: flex;
  gap: 8px;
  align-items: center;
`

export const nameSpaceStyle = css`
  flex: none;
`

export const nameAndEmailWrapperStyle = css`
  display: flex;
  flex-direction: column;
  overflow: hidden;
`

export const textOverflowStyle = css`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

export const nameStyle = css`
  font-size: 14px;
  font-weight: 500;
  line-height: 22px;
  color: ${getColor("grayBlue", "02")};
  margin: 0;
  display: flex;
  gap: 4px;
`

export const memberStatusWhenPending = css`
  font-weight: 400;
  color: ${getColor("grayBlue", "04")};
`

export const emailStyle = css`
  font-size: 12px;
  font-weight: 400;
  line-height: 16px;
  color: ${getColor("grayBlue", "03")};
  margin: 0;
`
