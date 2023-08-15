import { css } from "@emotion/react"
import { getColor } from "@illa-design/react"

export const mediaGroupStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16rem;
`

export const mediaTitleStyle = css`
  color: ${getColor("grayBlue", "04")};
  text-align: center;
  font-size: 28rem;
  font-weight: 400;
  line-height: 44rem;
  text-transform: capitalize;
`

export const mediaContainerStyle = css`
  display: flex;
  align-items: flex-start;
  gap: 22rem;
`

export const mediaItemStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 96rem;
  height: 96rem;
  border-radius: 48rem;
  border: 1px solid ${getColor("grayBlue", "08")};
  background: ${getColor("white", "01")};
`

export const mediaItemIconStyle = css`
  width: 48rem;
  height: 48rem;
`
