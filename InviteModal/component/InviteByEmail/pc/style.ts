import { SerializedStyles, css } from "@emotion/react"
import { getColor } from "@illa-design/react"

export const inviteByEmailContainerStyle = css`
  margin-top: 16px;
  display: flex;
  flex-direction: column;
`

export const inviteByEmailLabelStyle = css`
  color: ${getColor("grayBlue", "02")};
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 22px;
`

export const inviteByEmailInputContainerStyle = css`
  margin-top: 8px;
  display: flex;
  flex-direction: row;
`

export const licenseContainerStyle = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 8px;
`

export const licenseLabelStyle = css`
  color: ${getColor("grayBlue", "03")};
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px;
`

export function applyLicenseNumberStyle(isEnough: boolean): SerializedStyles {
  return css`
    color: ${isEnough ? getColor("grayBlue", "03") : getColor("red", "03")};
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    margin-left: 4px;
    line-height: 20px;
  `
}

export const inviteListContainerStyle = css`
  margin-top: 8px;
  display: flex;
  flex-direction: column;
`

export const avatarContainerStyle = css`
  margin-top: 16px;
  display: flex;
  flex-direction: row;
  align-items: center;
`

export const nicknameStyle = css`
  color: ${getColor("grayBlue", "02")};
  white-space: nowrap;
  flex: 1;
  text-overflow: ellipsis;
  margin-left: 4px;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 22px;
`

export const roleSelectContainerStyle = css`
  height: 100%;
`
