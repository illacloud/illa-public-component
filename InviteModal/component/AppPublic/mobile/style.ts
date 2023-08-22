import { css } from "@emotion/react"

export const inviteLinkContainer = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 16px;
  align-items: center;
`

export const inviteLinkHeaderStyle = css`
  width: 48px;
  height: 48px;
  & > svg {
    width: 100%;
    height: 100%;
  }
`
export const inviteLinkDisableHeaderStyle = css`
  margin-top: 125px;
  margin-bottom: 71px;
  ${inviteLinkHeaderStyle};
`

export const inviteButtonStyle = css`
  padding: 12px 16px;
  font-size: 16px;
  font-weight: 500;
  line-height: 20px;
`

export const shareBlockStyle = css``

export const shareBlockContainerStyle = css`
  position: absolute;
  width: 100%;
  height: 78px;
  bottom: 48px;
`

export const inviteOptionsStyle = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`
