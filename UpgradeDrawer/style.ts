import { css } from "@emotion/react"
import { getColor } from "@illa-design/react"

export const drawerMaskStyle = css`
  background-color: ${getColor("white", "05")};
  backdrop-filter: blur(5px);
`

export const drawerContentStyle = css`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  padding: 24px;
  color: ${getColor("grayBlue", "02")};
  font-weight: 500;
  font-size: 14px;
  line-height: 22px;
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

export const subTotalStyle = css`
  padding: 24px 0;
`

export const descriptionStyle = css`
  margin-top: 8px;
  font-weight: 400;
  font-size: 12px;
  line-height: 20px;
  color: ${getColor("grayBlue", "03")};
`
