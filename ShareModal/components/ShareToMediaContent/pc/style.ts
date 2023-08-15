import { css } from "@emotion/react"
import { getColor } from "@illa-design/react"

export const wrapperStyle = css`
  display: flex;
  padding: 16px;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
`

export const labelStyle = css`
  color: ${getColor("grayBlue", "02")};
  font-size: 14px;
  font-weight: 500;
  line-height: 22px;
`

export const mediaGroupStyle = css`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
`

export const linkWrapperStyle = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
`

export const mediaContainerStyle = css`
  display: flex;
  width: 454px;
  align-items: flex-start;
  align-content: flex-start;
  gap: 8px;
  flex-wrap: wrap;
`

export const mediaItemStyle = css`
  display: flex;
  width: 146px;
  padding: 16px 0;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
  border-radius: 8px;
  border: 1px solid ${getColor("grayBlue", "08")};
  background: ${getColor("white", "01")};
  transition: all 0.2s ease-in-out;

  &:hover {
    border: 1px solid ${getColor("purple", "01")};
    background: ${getColor("purple", "07")};
    box-shadow: 0 4px 16px 0 rgba(0, 0, 0, 0.08);
  }
`

export const mediaItemIconStyle = css`
  width: 24px;
  height: 24px;
`

export const mediaItemNameStyle = css`
  color: ${getColor("grayBlue", "01")};
  font-size: 14px;
  font-weight: 500;
  line-height: 22px;
`
