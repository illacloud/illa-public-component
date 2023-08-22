import { css } from "@emotion/react"
import { getColor } from "@illa-design/react"

export const inviteHeaderContainerStyle = css`
  position: sticky;
  top: 0;
  padding-top: 12px;
  background-color: ${getColor("white", "01")};
`

export const inviteModalStyle = css`
  height: 70%;
  width: 100%;
  flex: none;
  border-radius: 12px 12px 0 0;
  padding: 0 12px 0 12px;
`

export const closeIconContainerStyle = css`
  cursor: pointer;
  display: flex;
  align-items: center;
  color: ${getColor("grayBlue", "02")};
  justify-content: flex-end;
  width: 100%;
  & > span {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
  }
`

export const inviteTeamStyle = css`
  overflow-y: auto;
`

export const dividerStyle = css`
  margin-bottom: 24px;
`