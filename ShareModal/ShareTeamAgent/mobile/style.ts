import { css } from "@emotion/react"
import { pxToRem } from "@illa-public/utils"
import { getColor } from "@illa-design/react"

export const wrapperStyle = css`
  height: 100%;
  font-weight: 500;
  font-size: 32rem;
  padding: 72rem 0 0;
  overflow: hidden;
`

export const shareModalStyle = css`
  height: calc(var(--dvh, 1vh) * 60);
  z-index: 1000;
`

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

export const applyTabTitleItemStyle = (
  isActive?: boolean,
  disabled?: boolean,
) => {
  const statusStyle = isActive
    ? css`
        color: ${getColor("grayBlue", "02")};
      `
    : disabled
    ? css`
        cursor: not-allowed;
        color: ${getColor("grayBlue", "05")};
      `
    : ""

  return css`
    position: relative;
    width: 350rem;
    text-align: center;
    color: ${getColor("grayBlue", "03")};
    cursor: pointer;
    transition: color 0.3s;
    flex-grow: 1;
    ${statusStyle};

    &:not(:first-of-type) {
      &::after {
        position: absolute;
        left: 0;
        content: "";
        border-left: 2px solid ${getColor("gray", "08")};
        height: 40rem;
      }
    }
  `
}

export const headerWrapperStyle = css`
  height: 80rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;
`
export const tabContentWrapperStyle = css`
  height: 100%;
  overflow: auto;
  padding-bottom: 144rem;
`

export const linkLinkButtonStyle = css`
  margin: ${pxToRem(42)} 0;
  height: ${pxToRem(88)};
  font-weight: 500;

  & > span {
    font-size: ${pxToRem(32)};
    line-height: ${pxToRem(40)};
  }
`

export const turnOffLinkStyle = css`
  cursor: pointer;
  font-weight: 400;
  font-size: 28rem;
  line-height: 44rem;
  color: ${getColor("grayBlue", "02")};
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

export const turnOnLinkButtonStyle = css`
  margin: ${pxToRem(68)} 0 ${pxToRem(42)};
  height: ${pxToRem(88)};
  font-weight: 500;

  & > span {
    font-size: ${pxToRem(32)};
    line-height: ${pxToRem(40)};
  }
  margin: ${pxToRem(154)} 0 ${pxToRem(176)};
`
