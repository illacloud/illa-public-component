import { SerializedStyles, css } from "@emotion/react"
import { getColor } from "@illa-design/react"

export const inviteByEmailContainerStyle = css`
  display: flex;
  flex-direction: column;
`

export const inviteByEmailTitleStyle = css`
  color: ${getColor("grayBlue", "02")};
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 17px;
  margin-bottom: 16px;
`
export const inviteByEmailInputContainerStyle = css`
  display: flex;
  flex-direction: row;
`

export const licenseContainerStyle = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 32px;
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
    color: ${isEnough ? getColor("techPurple", "01") : getColor("red", "03")};
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
  padding: 10px 0;
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

export const emailInputStyle = css`
  height: 44px;
  font-size: 14px;
  line-height: 17px;
`

export const loadingStyle = css`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`