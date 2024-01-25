import { css } from "@emotion/react"
import { globalColor, illaPrefix } from "@illa-design/react"
import sectionBg from "../../assets/left-cover.svg"

export const layoutWrapperStyle = css`
  width: 100vw;
  height: 100vh;
  display: flex;
`

export const leftAsideWrapperStyle = css`
  background: linear-gradient(165deg, #000 0%, #000 100%);
  height: 100%;
  width: 100%;
  max-width: 600px;
  position: relative;
  z-index: 1;
  overflow-x: hidden;
`

export const sectionBgContentStyle = css`
  position: absolute;
  bottom: 0;
  left: 0;
`

export const rightAsideWrapperStyle = css`
  max-height: 100%;
  width: 100%;
  min-width: 600px;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: auto;
  margin: auto;
`

export const sectionBackgroundStyle = css`
  background: url(${sectionBg}) no-repeat;
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  z-index: -1;
`

export const illaLogoStyle = css`
  position: absolute;
  top: 40px;
  left: 24px;
`

export const sloganStyle = css`
  font-weight: 700;
  font-size: 34px;
  line-height: 50px;
  color: ${globalColor(`--${illaPrefix}-white-01`)};
  word-break: break-word;
  margin: 0 48px;
  position: absolute;
  top: 23%;
`
export const policyStyle = css`
  margin-top: 24px;
  font-size: 12px;
  line-height: 20px;
  width: 400px;
  color: ${globalColor(`--${illaPrefix}-grayBlue-03`)};
`
