import { css } from "@emotion/react"
import { globalColor, illaPrefix } from "@illa-design/react"

export const resetPasswordSubtitleWrapperStyle = css`
  margin-top: 8px;
  color: ${globalColor(`--${illaPrefix}-grayBlue-02`)};
  font-size: 14px;
  font-weight: 400;
  line-height: normal;
  user-select: none;
`

export const hotspotWrapperStyle = css`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
`

export const prevIconStyle = css`
  width: 12px;
  height: 12px;
  font-size: 12px;
  flex: none;
`
