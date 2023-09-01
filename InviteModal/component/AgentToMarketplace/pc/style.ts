import { css } from "@emotion/react"
import { getColor } from "@illa-design/react"


export const publicContainerStyle = css`
  display: flex;
  flex-direction: column;
`

export const blockContainerStyle = css`
  margin-top: 16px;
  display: flex;
  align-items: center;
  flex-direction: row;
`

export const blockLabelStyle = css`
  color: ${getColor("grayBlue", "02")};
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 22px;
`

export const linkCopyContainer = css`
  margin-top: 8px;
  display: flex;
  flex-direction: row;
  overflow: hidden;
  align-items: center;
`

export const contributingDocStyle = css`
  margin-top: 8px;
  color: ${getColor("grayBlue", "04")};
  margin-right: 54px;
  white-space: break-spaces;
  word-break: break-all;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`