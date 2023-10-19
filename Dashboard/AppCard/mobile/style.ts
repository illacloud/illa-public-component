import { css } from "@emotion/react"
import { getColor } from "@illa-design/react"

export const cardItemContainerStyle = css`
  width: 100%;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  border: 1px solid ${getColor("grayBlue", "08")};
  border-radius: 8px;
  background-color: #fff;
`

export const headerContainerStyle = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 2px;
`

export const titleStyle = css`
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-weight: 500;
  font-size: 14px;
  line-height: 22px;
  color: ${getColor("grayBlue", "02")};
  margin: 0;
  padding: 0;
`

export const editTimeInfo = css`
  font-size: 12px;
  line-height: 20px;
  color: ${getColor("grayBlue", "04")};
  margin: 0;
  padding: 0;
`

export const cardItemFooterContainerStyle = css`
  display: flex;
  flex-direction: column;
  gap: 16px;
`

export const editorInfoContainerStyle = css`
  width: 100%;
  overflow: hidden;
  display: flex;
`

export const descContainerStyle = css`
  width: 100%;
  margin: 0;
  padding: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 12px;
  font-weight: 400;
  line-height: 20px;
  color: ${getColor("grayBlue", "03")};
`

export const editorAvatarStyle = css`
  margin-right: -6px;
`

export const tagContainerStyle = css`
  display: flex;
  align-items: center;
  gap: 8px;
`

export const linkButtonStyle = css`
  display: block;
  line-height: 1;
  font-size: 12px;
`
