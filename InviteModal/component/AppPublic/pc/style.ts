import { css } from "@emotion/react"
import { getColor } from "@illa-design/react"


export const publicContainerStyle = css`
  display: flex;
  flex-direction: column;
`

export const blockContainerStyle = css`
  display: flex;
  padding: 8px 0;
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
  display: flex;
  flex-direction: row;
  overflow: hidden;
  align-items: center;
`

export const premiumContainerStyle = css`
  align-items: center;
  display: inline-flex;
  margin-left: 8px;
  box-sizing: border-box;
  border-radius: 4px;
  padding: 1px 7px;
  color: ${getColor("techPurple", "01")};
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 22px;
  text-transform: capitalize;
  background: ${getColor("techPurple", "07")};
`