import { css } from "@emotion/react"
import { getColor } from "@illa-design/react"

export const headerContainerStyle = css`
  width: 100%;
`

export const titleStyle = css`
  display: flex;
  width: 100%;
  padding: 17px 24px;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
  color: ${getColor("grayBlue", "02")};
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 24px;
`

export const modalCloseIconStyle = css`
  width: 24px;
  height: 24px;
  line-height: 10px;
  text-align: center;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${getColor("grayBlue", "02")};
`

export const searchContainerStyle = css`
  width: 100%;
  display: flex;
  padding: 0px 24px 24px 24px;
  align-items: center;
  align-self: stretch;
  box-shadow: 0px -1px 0px 0px #e5e6eb inset;
`
