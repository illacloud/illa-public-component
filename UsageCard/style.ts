import { SerializedStyles, css } from "@emotion/react"
import { getColor } from "@illa-design/react"

export const usageCardStyle = css`
  width: 100%;
  padding: 24px;
  color: ${getColor("grayBlue", "02")};
  /* illa_Grayblue/08 */

  border: 1px solid ${getColor("grayBlue", "08")};
  border-radius: 8px;
`

export const titleLineStyle = css`
  display: flex;
  align-items: center;
  gap: 16px;
  font-weight: 500;
  font-size: 14px;
  line-height: 22px;
`

export const iconStyle = css`
  width: 64px;
  height: 64px;
`
