import { SerializedStyles, css } from "@emotion/react"
import { pxToRem } from "@illa-public/utils"
import { globalColor, illaPrefix } from "@illa-design/react"

export const formStyle: SerializedStyles = css`
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
`
export const headerStyle: SerializedStyles = css`
  display: grid;
  gap: 16rem;
`

export const formItemStyle = css`
  margin-top: 64rem;
`

export const formTitleStyle: SerializedStyles = css`
  font-size: 48rem;
  line-height: 64rem;
  font-weight: 500;
  color: ${globalColor(`--${illaPrefix}-gray-02`)};
`

export const descriptionStyle: SerializedStyles = css`
  color: ${globalColor(`--${illaPrefix}-grayBlue-04`)};
`

export const errorMsgStyle: SerializedStyles = css`
  position: absolute;
  font-size: 24rem;
  padding-top: 8rem;
  color: ${globalColor(`--${illaPrefix}-orange-03`)};
`

export const forgotPwdStyle: SerializedStyles = css`
  text-align: end;
  font-size: 24rem;
  line-height: 40rem;
  padding-right: 16rem;
  margin-top: 36rem;
`

export const mobileInputStyle = css`
  font-size: ${pxToRem(28)};
  height: ${pxToRem(96)};

  & > span {
    padding: 0 ${pxToRem(32)};

    & svg {
      font-size: ${pxToRem(40)};
    }
  }
`
export const submitButtonStyle: SerializedStyles = css`
  margin-top: ${pxToRem(54)};
  height: ${pxToRem(88)};
  border-radius: ${pxToRem(16)};

  & > span {
    font-size: ${pxToRem(32)};
  }
`

export const singleSubmitButtonStyle = css`
  position: absolute;
  bottom: 0;
  ${submitButtonStyle};
`

export const oAuthButtonGroupStyle = css`
  width: 100%;
  display: flex;
  gap: 64rem;
  justify-content: center;
  margin: auto 0 0;
`

export const oAuthButtonStyle = css`
  width: ${pxToRem(88)};
  height: ${pxToRem(88)};
`

export const oAuthIconStyle = css`
  width: 32rem;
  height: 32rem;
`

export const errorIconStyle: SerializedStyles = css`
  position: absolute;
  font-size: 16px;
  line-height: 0;
  top: 3px;
  left: 0;
`

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
