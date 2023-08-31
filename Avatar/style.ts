import { SerializedStyles, css } from "@emotion/react"
import { globalColor, illaPrefix } from "@illa-design/react"

export function applyAvatarStyle(
  background: string,
  emptyStatus: boolean,
  size: number,
): SerializedStyles {
  const statusStyle = emptyStatus
    ? css`
        border: 1px dashed ${globalColor(`--${illaPrefix}-grayBlue-07`)};
        background: ${globalColor(`--${illaPrefix}-white-01`)};
      `
    : ""
  return css`
    display: flex;
    flex: none;
    flex-shrink: 0;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: ${background};
    color: ${globalColor(`--${illaPrefix}-white-01`)};
    border: 1px solid ${globalColor(`--${illaPrefix}-grayBlue-09`)};
    width: ${size}px;
    height: ${size}px;
    line-height: ${size}px;
    text-align: center;
    border-radius: 50%;
    overflow: hidden;
    font-size: ${size / 2.5}px;
    ${statusStyle};
  `
}

export const avatarImgStyle = css`
  width: 100%;
  height: 100%;
`
