import { css } from "@emotion/react"
import { globalColor, illaPrefix } from "@illa-design/react"
import sectionBg from "@/illa-public-component/User/assets/left-cover.svg"

export const layoutWrapperStyle = css`
  width: 100vw;
  height: 100vh;
  display: flex;
`

export const leftAsideWrapperStyle = css`
  background: linear-gradient(164.87deg, #654aec 0%, #4d4aec 100%);
  height: 100%;
  width: 520px;
  position: relative;
  display: flex;
  align-items: center;
  padding: 0 40px;
`

export const rightAsideWrapperStyle = css`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

export const sectionBackgroundStyle = css`
  background: url(${sectionBg}) no-repeat;
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
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
`
export const policyStyle = css`
  margin-top: 24px;
  font-size: 12px;
  line-height: 20px;
  width: 400px;
  color: ${globalColor(`--${illaPrefix}-grayBlue-03`)};
`
