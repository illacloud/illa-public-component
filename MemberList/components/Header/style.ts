import { css } from "@emotion/react"
import { getColor } from "@illa-design/react"

export const headerWrapperStyle = css`
  width: 100%;
  padding: 40px 32px;
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
`

export const buttonGroup = css`
  display: flex;
  gap: 8px;
  align-items: center;
`

/**
 * MoreAction Style
 */

export const allowEditorOrViewerInviteWrapperStyle = css`
  display: flex;
  align-items: center;
  gap: 32px;
`
