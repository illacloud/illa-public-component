import { css } from "@emotion/react"
import { getColor } from "@illa-design/react"

export const listItemContainerStyle = css`
  padding: 10px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const listAvatarAndNameContainerStyle = css`
  display: flex;
  gap: 16px;
  align-items: center;
`

export const nickNameAndEmailContainerStyle = css`
  max-width: 241px;
  display: flex;
  flex-direction: column;
`

export const nickNameContainerStyle = css`
  max-width: 192px;
  color: ${getColor("grayBlue", "02")};
  font-size: 14px;
  font-weight: 500;
  line-height: 22px;
`

export const statusStyle = css`
  color: ${getColor("grayBlue", "04")};
  font-size: 14px;
  line-height: 22px;
`

export const emailStyle = css`
  color: ${getColor("grayBlue", "03")};
  font-size: 12px;
  line-height: 16px;
`
