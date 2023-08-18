import { css } from "@emotion/react"
import { getColor } from "@illa-design/react"
import { applyMobileStyle } from "@illa-public/utils"

export const modalMaskStyle = css`
  background-color: ${getColor("white", "05")};
  backdrop-filter: blur(5px);
`

export const actionAreaStyle = css`
  width: 100%;
  padding: 16px;
  text-align: center;

  ${applyMobileStyle(css`
    padding: 16px;
  `)}
`

export const decorateStyle = css`
  width: 100%;

  ${applyMobileStyle(css`
    height: 202px;
  `)};
`

export const descriptionStyle = css`
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  color: ${getColor("grayBlue", "03")};

  ${applyMobileStyle(css`
    font-size: 14px;
    line-height: 17px;
  `)};
`

export const headerStyle = css`
  padding: 16px;
`

export const modalCloseIconStyle = css`
  position: absolute;
  width: 24px;
  height: 24px;
  line-height: 10px;
  text-align: center;
  top: 18px;
  right: 17px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${getColor("grayBlue", "02")};
`

export const modalStyle = css`
  border: unset;
  width: 486px;
  min-width: 486px;
  background: ${getColor("white", "01")};
  border: 1px solid ${getColor("grayBlue", "08")};
  box-shadow: 0 4px 16px rgb(0 0 0 / 8%);
  border-radius: 8px;
  overflow: hidden;

  ${applyMobileStyle(css`
    width: 358px;
    min-width: 358px;
    border-radius: 8px;
  `)}
`

export const titleStyle = css`
  font-weight: 600;
  font-size: 18px;
  line-height: 22px;
  margin-bottom: 8px;

  ${applyMobileStyle(css`
    font-size: 18px;
    line-height: 22px;
    margin-bottom: 8px;
  `)};
`