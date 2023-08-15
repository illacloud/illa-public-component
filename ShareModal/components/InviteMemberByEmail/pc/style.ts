import { css } from "@emotion/react"
import { getColor } from "@illa-design/react"

export const subBodyWrapperStyle = css`
  width: 100%;
  display: flex;
  flex-direction: column;
`

export const subBodyTitleWrapperStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
`

export const subtitleStyle = css`
  font-size: 14px;
  line-height: 22px;
  font-weight: 500;
  color: ${getColor("grayBlue", "02")};
  margin: 0;
`

export const inviteEmailWrapperStyle = css`
  display: flex;
  justify-content: space-between;
  gap: 8px;
  align-items: flex-start;
`

export const emailInputStyle = css`
  width: 378px;
  flex-shrink: 0;

  & > span:first-of-type {
    overflow: hidden;
  }
`

export const applyHiddenStyle = (isHidden: boolean) => css`
  display: ${isHidden ? "none" : "inherit"};
`

export const remainInviteCountStyle = css`
  margin-top: 8px;
  font-weight: 400;
  font-size: 12px;
  line-height: 20px;
  color: ${getColor("grayBlue", "03")};
`

export const applyInviteCountStyle = (count: number) => {
  return css`
    color: ${count > 0 ? getColor("grayBlue", "03") : getColor("red", "03")};
  `
}
