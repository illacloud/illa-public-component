import { css } from "@emotion/react"
import { getColor } from "@illa-design/react"

export const inviteListWrapperStyle = css`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 16px;
  max-height: 224px;
  overflow-y: auto;
`

export const inviteListTitleWrapperStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const avatarAndNameWrapperStyle = css`
  display: flex;
  gap: 8px;
  align-items: center;
`

export const inviteAvatarStyle = css`
  width: 32px;
  height: 32px;
  border: 1px dashed ${getColor("grayBlue", "07")};
  flex: none;
  border-radius: 16px;
`
export const nicknameStyle = css`
  font-size: 14px;
  line-height: 22px;
  font-weight: 500;
  color: ${getColor("grayBlue", "02")};
`
