import { css } from "@emotion/react"
import { getColor } from "@illa-design/react"

export const modalStyle = css`
  width: 486px;
  min-width: unset;
  background: ${getColor("white", "01")};
  border: 1px solid ${getColor("grayBlue", "08")};
  box-shadow: 0 4px 16px rgb(0 0 0 / 8%);
  border-radius: 8px;
`

export const modalMaskStyle = css`
  background-color: ${getColor("white", "05")};
  backdrop-filter: blur(5px);
`

export const headerWrapperStyle = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;

  color: ${getColor("grayBlue", "02")};
  font-size: 14px;
  font-weight: 500;
  line-height: 22px;
`

export const closeIconStyle = css`
  width: 12px;
  height: 12px;
  margin: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 12px;
`

export const modalTabWrapperStyle = css`
  display: flex;
  gap: 16px;
`

export const applyTabLabelStyle = (active: boolean) => css`
  font-size: 14px;
  line-height: 22px;
  font-weight: ${active ? 500 : 400};
  color: ${active ? getColor("grayBlue", "02") : getColor("grayBlue", "03")};
  text-transform: capitalize;
  cursor: pointer;
`
