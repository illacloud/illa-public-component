import { css } from "@emotion/react"
import { getColor } from "@illa-design/react"

export const drawerMaskStyle = css`
  background-color: ${getColor("white", "05")};
  backdrop-filter: blur(5px);
`

export const drawerContentStyle = css`
  padding: 24px;
  color: ${getColor("grayBlue", "02")};
`
export const titleStyle = css`
  font-weight: 600;
  font-size: 18px;
  line-height: 24px;
  margin-bottom: 16px;
`

export const manageContentStyle = css`
  padding: 8px 0 24px;
`

export const manageLabelStyle = css`
  font-weight: 500;
  font-size: 14px;
  line-height: 22px;
`

export const manageItemStyle = css`
  display: flex;
  gap: 16px;
  padding-top: 8px;
`
