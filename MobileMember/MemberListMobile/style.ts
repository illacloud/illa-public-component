import { css } from "@emotion/react"
import { globalColor, illaPrefix } from "@illa-design/react"

export const wrapperStyle = css`
  position: relative;
  height: 100%;
`

export const loadingStyle = css`
  position: relative;
  top: 40%;
  margin: 0 auto;
  display: block !important;
`

export const listWrapperStyle = css`
  display: flex;
  flex-direction: column;
  gap: 40rem;
  padding-bottom: 228rem;
`

export const headerStyle = css`
  margin: 0 0 40rem;
  font-weight: 600;
  font-size: 48rem;
  line-height: 58rem;
  color: ${globalColor(`--${illaPrefix}-grayBlue-02`)};
`

export const listItemStyle = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-weight: 500;
  font-size: 28rem;
  line-height: 44rem;
  color: ${globalColor(`--${illaPrefix}-grayBlue-02`)};
`

export const userInfoStyle = css`
  display: flex;
  align-items: center;
`

export const avatarStyle = css`
  width: 80rem;
  height: 80rem;
  margin-right: 32rem;
`

export const firstLineStyle = css`
  display: flex;
  white-space: pre;
`

export const nameStyle = css`
  max-width: 280rem;
  overflow: hidden;
  text-overflow: ellipsis;
`

export const onlyNameStyle = css`
  max-width: 420rem;
  overflow: hidden;
  text-overflow: ellipsis;
`

export const pendingStatusTextStyle = css`
  font-weight: 400;
  color: ${globalColor(`--${illaPrefix}-grayBlue-04`)};
`

export const emailStyle = css`
  font-weight: 400;
  font-size: 24rem;
  line-height: 32rem;
  color: ${globalColor(`--${illaPrefix}-grayBlue-03`)};
`
