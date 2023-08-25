import { SerializedStyles, css } from "@emotion/react"
import { globalColor, illaPrefix } from "@illa-design/react"

export const gridFormStyle: SerializedStyles = css`
  display: grid;
  gap: 40px;
  width: 400px;
`

export const gridFormFieldStyle: SerializedStyles = css`
  display: grid;
  gap: 24px;
`

export const gridItemStyle: SerializedStyles = css`
  display: grid;
  gap: 8px;
`

export const gridValidStyle: SerializedStyles = css``

export const formTitleStyle: SerializedStyles = css`
  font-size: 24px;
  line-height: 32px;
  font-weight: 500;
  color: ${globalColor(`--${illaPrefix}-gray-02`)};
`

export const formLabelStyle: SerializedStyles = css`
  font-size: 14px;
  line-height: 22px;
  font-weight: 500;
  color: ${globalColor(`--${illaPrefix}-grayBlue-02`)};
`

export const forgotPwdStyle: SerializedStyles = css`
  font-size: 12px;
  line-height: 20px;
  margin-right: 8px;
`

export const forgotPwdContainerStyle: SerializedStyles = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const descriptionStyle: SerializedStyles = css`
  color: ${globalColor(`--${illaPrefix}-grayBlue-04`)};
`

export const errorMsgStyle: SerializedStyles = css`
  position: relative;
  font-size: 14px;
  padding-left: 24px;
  line-height: 22px;
  color: ${globalColor(`--${illaPrefix}-orange-03`)};
`

export const errorIconStyle: SerializedStyles = css`
  position: absolute;
  font-size: 16px;
  line-height: 0;
  top: 3px;
  left: 0;
`

export const mobileInputStyle = css`
  font-size: 28rem;
  height: 44rem;
`

export const oAuthButtonGroupStyle = css`
  width: 100%;
  display: flex;
  gap: 18px;
`

export const oAuthIconStyle = css`
  width: 16px;
  height: 16px;
  margin-right: 6px;
`

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
