import { css } from "@emotion/react"
import { getColor } from "@illa-design/react"

export const pcLayoutContainerStyle = css`
  background-color: #fafafa;
  width: 100%;
  height: 100%;
  padding: 24px 0px;
  padding-right: 24px;
  display: flex;
`

export const leftContainerStyle = css`
  width: 240px;
  height: 100%;
  display: flex;
  flex: none;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`

export const leftTopContainerStyle = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
`

export const tipsContainerStyle = css`
  width: 100%;
  padding: 8px 16px;
`

export const avatarAndInfoContainerStyle = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 4px;
  padding: 8px 16px;
  overflow: hidden;
`

export const avatarContainerStyle = css`
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const nickNameStyle = css`
  color: ${getColor("grayBlue", "02")};
  text-align: center;
  font-size: 16px;
  font-weight: 600;
  line-height: 22px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 100%;
`

export const emailStyle = css`
  color: ${getColor("grayBlue", "03")};
  text-align: center;
  font-size: 12px;
  line-height: 16px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 100%;
`

export const dynamicMenuContainerStyle = css`
  width: 100%;
`

export const rightContainerStyle = css`
  width: 100%;
  height: 100%;
  overflow: hidden;
  border-radius: 16px;
  background-color: ${getColor("white", "01")};
  box-shadow: 0px 4px 16px 0px rgba(0, 0, 0, 0.06);
  position: relative;
`

export const leftBottomContainerStyle = css`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
`
