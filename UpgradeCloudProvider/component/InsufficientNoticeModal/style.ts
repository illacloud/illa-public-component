import { css } from "@emotion/react"
import { getColor } from "@illa-design/react"

export const modalStyle = css`
  width: 320px;
  min-width: unset;
  background: ${getColor("white", "01")};
  border: 1px solid ${getColor("grayBlue", "08")};
  box-shadow: 0 4px 16px rgb(0 0 0 / 8%);
  border-radius: 4px;
`
export const titleStyle = css`
  text-align: center;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  margin-top: 24px;
  margin-bottom: 8px;
`

export const descriptionStyle = css`
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  margin: 8px 24px;
`

export const actionAreaStyle = css`
  width: 100%;
  padding: 16px;
  text-align: center;
`
