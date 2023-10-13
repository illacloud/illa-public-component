import { css } from "@emotion/react"
import { getColor } from "@illa-design/react"

export const optionLabelStyle = css`
  height: 38px;
  display: flex;
  font-size: 14px;
  font-weight: 500;
  padding: 8px 24px;
  color: ${getColor("grayBlue", "04")};
  align-items: center;
`

export const configItemStyle = css`
  display: flex;
  height: 48px;
  align-items: center;
  flex-direction: row;
  padding-left: 24px;
`

export const configItemTipStyle = css`
  font-size: 14px;
  font-weight: 400;
  margin-left: 192px;
  padding-bottom: 8px;
  line-height: 22px;
  padding-left: 24px;
  color: ${getColor("grayBlue", "04")};
`

export const connectContainerTypeStyle = css`
  display: flex;
  height: 38px;
  align-items: center;
  padding-left: 24px;
`

export const labelContainerStyle = css`
  display: flex;
  justify-content: end;
  min-width: 176px;
`

export const connectTypeStyle = css`
  font-size: 14px;
  height: 22px;
  display: flex;
  align-items: center;
  color: ${getColor("grayBlue", "02")};
  margin-left: 16px;
`

export const containerStyle = css`
  width: 100%;
  max-height: 685px;
  overflow-y: auto;
`

export const footerStyle = css`
  height: 80px;
  padding: 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const dividerStyle = css`
  height: 16px;
`

export function applyConfigItemLabelTextStyle(color: string, margin?: boolean) {
  let marginLeft = css``
  if (margin) {
    marginLeft = css`
      margin-left: 4px;
    `
  }
  return css`
    font-size: 14px;
    color: ${color};
    font-weight: 500;
    ${marginLeft};
  `
}

export const errorMsgStyle = css`
  position: relative;
  font-size: 14px;
  padding-left: 24px;
  line-height: 22px;
  color: ${getColor("orange", "03")};
`

export const errorIconStyle = css`
  position: absolute;
  font-size: 16px;
  line-height: 0;
  top: 3px;
  left: 0;
`

export const privateKeyItemStyle = css`
  display: flex;
  width: 100%;
  padding-top: 8px;
  padding-left: 24px;
  align-items: flex-start;
`

export const getOAuthStatusContentStyle = (isSuccess: boolean) => {
  return css`
    width: 100%;
    padding: 9px 16px;
    display: flex;
    gap: 8px;
    height: 40px;
    background: ${isSuccess
      ? getColor("green", "07")
      : getColor("orange", "07")};
    border-radius: 4px;
    align-items: center;
  `
}

export const oAuthStatusContainerStyle = css`
  width: 100%;
  padding: 8px 24px;
`

export const oAuthErrorIconStyle = css`
  font-size: 16px;
  color: ${getColor("orange", "03")};
`
