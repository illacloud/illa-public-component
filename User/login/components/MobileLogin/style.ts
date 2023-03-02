import { SerializedStyles, css } from "@emotion/react"
import { globalColor, illaPrefix } from "@illa-design/react"
import { pxToRem } from "@/style"

export const formStyle: SerializedStyles = css`
  position: relative;
  height: 100%;
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
  position: absolute;
  bottom: 0;
  height: ${pxToRem(88)};
  border-radius: ${pxToRem(16)};

  & > span {
    font-size: ${pxToRem(32)};
  }
`
