import { css } from "@emotion/react"
import { pxToRem } from "@illa-public/utils"
import { getColor } from "@illa-design/react"

export const shareModalStyle = css`
  height: calc(var(--dvh, 1vh) * 60);
  z-index: 1000;
`

export const closeIconStyle = css`
  font-size: 18rem;
`

export const closeIconContainerStyle = css`
  cursor: pointer;
  position: absolute;
  top: ${pxToRem(10)};
  right: ${pxToRem(10)};
  margin: ${pxToRem(29)};
`
export const wrapperStyle = css`
  padding: 16px;
`

export const linkIconStyle = css`
  width: 96rem;
  height: 96rem;
`

export const linkStyle = css`
  color: ${getColor("grayBlue", "02")};
  text-align: center;
  font-size: 32rem;
  font-weight: 500;
  line-height: 40rem;
`

export const linkButtonStyle = css`
  margin: ${pxToRem(64)} 0 ${pxToRem(42)};
  height: ${pxToRem(88)};
  font-weight: 500;

  & > span {
    font-size: ${pxToRem(32)};
    line-height: ${pxToRem(40)};
  }
`

export const mediaGroupStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16rem;
`
