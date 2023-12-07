import { css } from "@emotion/react"
import { getColor } from "@illa-design/react"

export const shareContainerStyle = css`
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: center;
`

export const shareLabelStyle = css`
  color: ${getColor("grayBlue", "04")};
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 22px;
`

export const shareIconContainerStyle = css`
  width: 100%;
  display: flex;
  gap: 11px;
  justify-content: center;
  align-items: center;
`

export const cardContainerStyle = css`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  padding: 12px;
  border: 1px solid ${getColor("grayBlue", "08")};
  flex: none;
  cursor: pointer;
  &:hover {
    border: 1px solid ${getColor("techPurple", "03")};
    background: ${getColor("techPurple", "08")};
    box-shadow: 0px 4px 16px 0px rgba(0, 0, 0, 0.08);
  }
`

export const cardIconStyle = css`
  display: flex;
  flex: none;
  width: 24px;
  height: 24px;
`
