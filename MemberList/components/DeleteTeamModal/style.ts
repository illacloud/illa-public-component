import { css } from "@emotion/react"
import { pxToRem } from "@illa-public/utils"

export const mobileModalStyle = css`
  width: ${pxToRem(653)};
  min-width: ${pxToRem(653)};
  border-radius: ${pxToRem(16)};

  & > div {
    &:last-child {
      display: flex;
      justify-content: flex-end;
      padding: ${pxToRem(48)} ${pxToRem(32)};
    }
  }
`

export const mobileModalTitleStyle = css`
  margin: 48rem 48rem 0;
  font-weight: 500;
  font-size: 32rem;
  line-height: 48rem;
  text-align: start;
`

export const mobileModalContentStyle = css`
  margin: 32rem 48rem;
  font-weight: 400;
  font-size: 28rem;
  line-height: 44rem;
`

export const mobileModalButtonStyle = css`
  padding: ${pxToRem(10)} ${pxToRem(32)};
  & > span {
    font-size: ${pxToRem(28)};
  }
`

export const descStyle = css`
  margin-bottom: 16px;
`
