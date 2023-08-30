import { css } from "@emotion/react"
import { getColor } from "@illa-design/react"

export const headerWrapperStyle = css`
  width: 100%;
  padding: 40px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
`

export const titleStyle = css`
  font-size: 24px;
  line-height: 32px;
  font-weight: 600;
  color: ${getColor("grayBlue", "02")};
  flex: 0;
  margin: 0;
  white-space: nowrap;
`

export const buttonGroup = css`
  display: flex;
  gap: 8px;
  align-items: center;
`

export const moreActionTextStyle = css`
  flex-grow: 1;
`

export const allowEditorOrViewerInviteWrapperStyle = css`
  display: flex;
  width: 100%;
  align-items: center;
  gap: 32px;
`
