import { css } from "@emotion/react"
import { getColor } from "@illa-design/react"

export const calculatorStyle = css`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 0 24px;
`

export const calculatorTitleStyle = css`
  font-size: 16px;
  font-weight: 500;
  line-height: 22px;
`
export const goodsStyle = css`
  display: flex;
  gap: 8px;
  align-items: center;
  font-size: 14px;
  font-weight: 400;
  line-height: 22px;
  color: ${getColor("grayBlue", "02")};
`

export const orStyle = css`
  color: ${getColor("grayBlue", "03")};
`
