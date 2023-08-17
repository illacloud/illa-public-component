import { css } from "@emotion/react"
import { globalColor, illaPrefix } from "@illa-design/react"

export const listWrapperStyle = css`
  display: flex;
  flex-direction: column;
  gap: 40rem;
`

export const hiddenStyle = css`
  visibility: hidden;
`

export const valueLabelStyle = css`
  display: flex;
  gap: 16rem;
  align-items: center;
`

export const optionContentStyle = css`
  width: 320rem;
  padding: 16rem 0;
  font-weight: 500;
  font-size: 28rem;
  line-height: 44rem;
  color: ${globalColor(`--${illaPrefix}-grayBlue-02`)};
`

export const optionItemStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20rem 32rem;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${globalColor(`--${illaPrefix}-grayBlue-09`)};
  }

  & > svg {
    width: 32rem;
    height: 32rem;
  }
`
