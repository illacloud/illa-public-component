import { SerializedStyles, css } from "@emotion/react"
import { getColor, globalColor, illaPrefix } from "@illa-design/react"
import { pxToRem } from "@/style"

export const inviteModalStyle = css`
  height: calc(var(--dvh, 1vh) * 60);
  z-index: 1000;
`

export const inviteListWrapperStyle = css`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 16px;
  max-height: 224px;
  overflow-y: auto;
`

export const inviteListTitleStyle = css`
  font-weight: 400;
  font-size: 28rem;
  line-height: 34rem;
  color: ${globalColor(`--${illaPrefix}-grayBlue-04`)};
`

export const applyInviteCountStyle = (count: number) => {
  return css`
    color: ${count > 0 ? getColor("grayBlue", "03") : getColor("red", "03")};
  `
}

export const closeIconStyle = css`
  font-size: 18rem;
`
export const closeIconContainerStyle = css`
  cursor: pointer;
  position: absolute;
  top: ${pxToRem(10)};
  right: ${pxToRem(10)};
  margin: ${pxToRem(29)};
`

export const contentStyle = css`
  font-weight: 500;
  font-size: 32rem;
  line-height: 40rem;
  padding: 72rem 0 0;
  display: flex;
  flex-direction: column;
  height: 100%;
`

export const tabTitleStyle = css`
  height: 80rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;
`

export const applyTabTitleItemStyle = (
  isActive?: boolean,
  disabled?: boolean,
): SerializedStyles => {
  const statusStyle = isActive
    ? css`
        color: ${globalColor(`--${illaPrefix}-grayBlue-02`)};
      `
    : disabled
    ? css`
        cursor: not-allowed;
        color: ${globalColor(`--${illaPrefix}-grayBlue-05`)};
      `
    : ""

  return css`
    position: relative;
    width: 350rem;
    text-align: center;
    color: ${globalColor(`--${illaPrefix}-grayBlue-03`)};
    cursor: pointer;
    transition: color 0.3s;
    flex-grow: 1;
    ${statusStyle};

    &:not(:first-of-type) {
      &::after {
        position: absolute;
        left: 0;
        content: "";
        border-left: 2px solid ${globalColor(`--${illaPrefix}-gray-08`)};
        height: 40rem;
      }
    }
  `
}

export const inviteByLinkStyle = css`
  flex-grow: 1;
  overflow: auto;
  padding: 0 32rem;
`

export const inviteWrapperStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 48rem 32rem 0;
  overflow: auto;
`

export const linkIconStyle = css`
  width: 96rem;
  height: 96rem;
`
export const roleSelectStyle = css`
  margin: 8rem 0 48rem;
  padding: 16rem 24rem;
  border-radius: 16rem;
  background: ${globalColor(`--${illaPrefix}-grayBlue-09`)};
  line-height: 44rem;
`

export const applyLinkStyle = (error: boolean) => {
  return css`
    width: 100%;
    height: 40rem;
    overflow: hidden;
    text-align: center;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: ${error ? getColor("red", "03") : getColor("grayBlue", "02")};
  `
}

export const skeletonStyle = css`
  & > ul > li {
    height: ${pxToRem(40)};
  }
`

export const linkLinkButtonStyle = css`
  margin: ${pxToRem(68)} 0 ${pxToRem(42)};
  height: ${pxToRem(88)};
  font-weight: 500;

  & > span {
    font-size: ${pxToRem(32)};
    line-height: ${pxToRem(40)};
  }
`

export const turnOnLinkButtonStyle = css`
  ${linkLinkButtonStyle};
  margin: ${pxToRem(154)} 0 ${pxToRem(176)};
`

export const turnOffLinkStyle = css`
  cursor: pointer;
  font-weight: 400;
  font-size: 28rem;
  line-height: 44rem;
  color: ${globalColor(`--${illaPrefix}-grayBlue-02`)};
  @media screen and (orientation: landscape) {
    padding-bottom: 48rem;
  }
`

export const inviteOffWrapperStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 134rem 32rem 0;
`

export const applyInviteByEmailWrapperStyle = (autoHeight?: boolean) => {
  const heightStyle = autoHeight
    ? css`
        overflow: auto;
      `
    : css`
        flex-grow: 1;
      `
  return css`
    display: flex;
    flex-direction: column;
    z-index: 2;
    padding: 0 ${pxToRem(32)};
    ${heightStyle};
  `
}

export const emailAreaStyle = css`
  margin: 40rem 0 64rem;
`

export const emailInputStyle = css`
  height: ${pxToRem(88)};
  font-size: ${pxToRem(28)};
  line-height: ${pxToRem(34)};

  & > span {
    z-index: unset !important;
  }
`
