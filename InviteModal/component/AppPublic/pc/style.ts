import { css } from "@emotion/react"
import { getColor } from "@illa-design/react"

export const publicContainerStyle = css`
  display: flex;
  flex-direction: column;
`

export const blockContainerStyle = css`
  display: flex;
  margin-top: 16px;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
`

export const doubtStyle = css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-left: 4px;
  font-size: 16px;
  width: 16px;
  height: 16px;
  color: ${getColor("grayBlue", "04")};
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
  gap: 8px;
  flex-direction: row;
  overflow: hidden;
  align-items: center;
  margin-top: 8px;
`

export const premiumContainerStyle = css`
  align-items: center;
  display: inline-flex;
  margin-left: 8px;
  box-sizing: border-box;
  border-radius: 4px;
  padding: 1px 7px;
  color: ${getColor("techPurple", "03")};
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 22px;
  text-transform: capitalize;
  background: ${getColor("techPurple", "08")};
`

export const labelContainerStyle = css`
  display: flex;
  align-items: center;
`
