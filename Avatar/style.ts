import { SerializedStyles, css } from "@emotion/react"
import { globalColor, illaPrefix } from "@illa-design/react"

export function applyAvatarStyle(
  background: string,
  emptyStatus: boolean,
): SerializedStyles {
  const statusStyle = emptyStatus
    ? css`
        border: 1px dashed ${globalColor(`--${illaPrefix}-grayBlue-07`)};
        background: ${globalColor(`--${illaPrefix}-white-01`)};
      `
    : ""
  return css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: ${background};
    color: ${globalColor(`--${illaPrefix}-white-01`)};
    border: 1px solid ${globalColor(`--${illaPrefix}-grayBlue-09`)};
    width: 32px;
    height: 32px;
    line-height: 32px;
    text-align: center;
    border-radius: 50%;
    overflow: hidden;
    ${statusStyle};
  `
}

export const avatarImgStyle = css`
  width: 100%;
  height: 100%;
`
