import { css } from "@emotion/react"
import { applyMobileStyle } from "@illa-public/utils"
import { getColor } from "@illa-design/react"

export const modalMaskStyle = css`
  background-color: ${getColor("white", "05")};
  backdrop-filter: blur(5px);
`

export const actionAreaStyle = css`
  width: 100%;
  padding: 16px;
  text-align: center;

  ${applyMobileStyle(css`
    padding: 32rem;
  `)}
`
