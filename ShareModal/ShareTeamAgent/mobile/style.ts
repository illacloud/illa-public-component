import { css } from "@emotion/react"
import { getColor } from "@illa-design/react"
import { pxToRem } from "@/style"

export const wrapperStyle = css`
  height: 100%;
  font-weight: 500;
  font-size: 32rem;
  padding: 72rem 0 0;
  overflow: hidden;
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
