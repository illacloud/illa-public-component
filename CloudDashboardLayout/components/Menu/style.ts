import { css } from "@emotion/react"
import { getColor } from "@illa-design/react"

export const menuContainerStyle = css`
  display: flex;
  flex-direction: column;
  width: 100%;
`

export const menuItemContainerStyle = (isSelected: boolean) => css`
  display: flex;
  width: 100%;
  padding: 8px 16px;
  align-items: center;
  background-color: ${isSelected ? getColor("grayBlue", "09") : "unset"};
`

export const menuItemLinkStyle = css`
  display: flex;
  align-items: center;
  gap: 8px;
  overflow: hidden;
  width: 100%;
`

export const menuItemButtonStyle = css`
  ${menuItemLinkStyle};
  cursor: pointer;
`

export const iconHotSpotStyle = css`
  display: flex;
  width: 24px;
  height: 24px;
  padding: 4px;
  justify-content: center;
  align-items: center;
  flex: none;
`
export const listItemTextStyle = css`
  color: ${getColor("grayBlue", "02")};
  font-size: 14px;
  font-weight: 500;
  line-height: 22px;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
`
