import { css } from "@emotion/react"
import { globalColor, illaPrefix } from "@illa-design/react"
import mobileUserBg from "@/illa-public-component/User/assets/mobile-user-bg.svg"

export const layoutStyle = css`
  background: url(${mobileUserBg}) ${globalColor(`--${illaPrefix}-white-01`)}
    no-repeat;
  background-size: contain;
  padding: 244rem 32rem 100rem;
`

export const contentStyle = css`
  height: 1115rem;
  border-radius: 32rem;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  background: ${globalColor(`--${illaPrefix}-white-01`)};
  padding: 64rem 40rem 40rem;
  font-size: 28rem;
`

export const policyStyle = css`
  margin-top: 80rem;
  font-size: 24rem;
  color: ${globalColor(`--${illaPrefix}-grayBlue-03`)};
`
