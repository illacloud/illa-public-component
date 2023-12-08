import { css } from "@emotion/react"
import { getColor } from "@illa-design/react"

export const oAuthStatusContainerStyle = css`
  width: 100%;
  padding: 8px 24px;
`

export const getOAuthStatusContentStyle = (isSuccess: boolean) => css`
  width: 100%;
  padding: 9px 16px;
  display: flex;
  gap: 8px;
  height: 40px;
  background: ${isSuccess ? getColor("green", "08") : getColor("orange", "08")};
  border-radius: 4px;
  align-items: center;
`

export const oAuthErrorIconStyle = css`
  font-size: 16px;
  color: ${getColor("orange", "03")};
`
