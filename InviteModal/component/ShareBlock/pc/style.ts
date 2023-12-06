import { css } from "@emotion/react"
import { getColor } from "@illa-design/react"

export const shareContainerStyle = css`
  margin-top: 16px;
  display: flex;
  flex-direction: column;
`

export const shareLabelStyle = css`
  color: ${getColor("grayBlue", "02")};
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 22px;
`

export const shareGridLayoutStyle = css`
  margin-top: 8px;
  display: grid;
  grid-gap: 8px;
  grid-template-columns: repeat(auto-fill, minmax(146px, 1fr));
`

export const cardContainerStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 8px;
  padding: 16px;
  border: 1px solid ${getColor("grayBlue", "08")};
  transition: all 0.2s ease-in-out;
  justify-content: center;
  flex-shrink: 0;
  cursor: pointer;

  &:hover {
    border: 1px solid ${getColor("techPurple", "03")};
    background: ${getColor("techPurple", "08")};
    box-shadow: 0 4px 16px 0 rgba(0, 0, 0, 0.08);
  }
`

export const cardIconStyle = css`
  font-size: 24px;
  width: 24px;
  height: 24px;
`

export const cardNameStyle = css`
  margin-top: 8px;
  color: ${getColor("grayBlue", "01")};
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 22px;
`
