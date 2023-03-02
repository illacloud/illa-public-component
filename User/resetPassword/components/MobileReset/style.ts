import { css } from "@emotion/react"
import { globalColor, illaPrefix } from "@illa-design/react"

export const resetPasswordSubtitleWrapperStyle = css`
  margin-top: 16rem;
  color: ${globalColor(`--${illaPrefix}-grayBlue-02`)};
  font-size: 28rem;
  font-weight: 400;
  line-height: normal;
  user-select: none;
`

export const hotspotWrapperStyle = css`
  display: inline-flex;
  align-items: center;
  gap: 8rem;
  cursor: pointer;
`

export const prevIconStyle = css`
  width: 24rem;
  height: 24rem;
  font-size: 24rem;
  flex: none;
`
