import { css } from "@emotion/react"
import { getColor } from "@illa-design/react"


export const inviteLinkContainer = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 28px;
  align-items: center;
  padding-bottom: 12px;
`

export const disInviteLinkContainer = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;
  padding-bottom: 32px;
  & > svg {
    width: 48px;
    height: 48px;
  }
`

export const inviteLinkHeaderStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  & > svg {
    width: 48px;
    height: 48px;
  }
`

export const inviteOptionsStyle = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;

`

export const inviteButtonStyle = css`
  padding: 12px 16px;
  font-size: 16px;
  font-weight: 500;
  line-height: 20px;
`

export const roleSelectorStyle = css`
  display: flex;
  padding: 8px 12px;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  background-color: ${getColor("grayBlue", "09")};
`