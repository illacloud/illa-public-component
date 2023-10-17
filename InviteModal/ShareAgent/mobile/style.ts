import { css } from "@emotion/react"
import { getColor } from "@illa-design/react"

export const inviteHeaderContainerStyle = css`
  padding-top: 12px;
  width: 100%;
  flex: none;
  overflow-x: hidden;
  background-color: ${getColor("white", "01")};
`

export const inviteModalStyle = css`
  flex: none;
  border-radius: 12px 12px 0 0;
  padding: 0 12px 0 12px;
`

export const inviteContainerStyle = css`
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow-y: hidden;
`

export const closeIconContainerStyle = css`
  cursor: pointer;
  display: flex;
  align-items: center;
  color: ${getColor("grayBlue", "02")};
  justify-content: flex-end;
  width: 100%;
  & > span {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
  }
`

export const tabsContainerStyle = css`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 16px;
  font-weight: 400;
  line-height: 20px;
  color: ${getColor("grayBlue", "03")};
`

export const tabTitleStyle = (selected: boolean) => {
  let selectedStyle
  if (selected) {
    selectedStyle = css`
      font-weight: 500;
      color: ${getColor("grayBlue", "02")};
    `
  } else {
    selectedStyle = css``
  }

  return css`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px 0;
    border-radius: 4px;
    cursor: pointer;
    ${selectedStyle};
  `
}

export const spaceLineStyle = css`
  height: 20px;
  width: 2px;
  background-color: ${getColor("grayBlue", "08")};
`

export const contentContainerStyle = css`
  margin-top: 20px;
  overflow-y: auto;
`

export const dividerStyle = css`
  margin-bottom: 24px;
`
