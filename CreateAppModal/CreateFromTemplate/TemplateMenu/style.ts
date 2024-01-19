import { css } from "@emotion/react"
import { getColor } from "@illa-design/react"

export const menuContainerStyle = css`
  width: 200px;
  padding: 8px 0;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  border-right: 1px solid ${getColor("grayBlue", "08")};
`

export const menuItemStyle = (selected: boolean) => css`
  display: flex;
  padding: 9px 16px;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  cursor: pointer;
  background-color: ${selected ? getColor("techPurple", "08") : "transparent"};
`
