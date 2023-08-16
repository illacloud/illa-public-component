import { css } from "@emotion/react"
import { getColor } from "@illa-design/react"


export const itemContainer = css`
  display: flex;
  flex-direction: row;
  align-items: center;
`

export const doubtStyle = css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-left: 4px;
  font-size: 16px;
  width: 16px;
  height: 16px;
  color: ${getColor("grayBlue", "01")};
`

export const successStyle = css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
  margin-left: 22px;
  font-size: 16px;
  width: 16px;
  height: 16px;
  color: ${getColor("grayBlue", "01")};
`

export const roleSelectorRoleContainer = css`
  color: ${getColor("grayBlue", "02")};
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 22px;
`

export const roleOuterLabelStyle = css`
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 22px;
`

export const roleOuterIconStyle = css`
  margin-left: 4px;
  width: 12px;
  font-size: 12px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 12px;
`