import { SerializedStyles, css } from "@emotion/react"

export const MOBILE_MIN_WIDTH = 320
export const MOBILE_MAX_WIDTH = 780

export const pxToRem = (px: number) => {
  return `${px / 100}rem`
}

export const applyMobileStyle = (style: SerializedStyles) => css`
  @media screen and (max-width: ${MOBILE_MAX_WIDTH}px) {
    ${style};
  }
`
