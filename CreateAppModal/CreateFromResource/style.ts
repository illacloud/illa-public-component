import { css } from "@emotion/react"
import { getColor } from "@illa-design/react"

export const modalContainerStyle = css`
  display: unset;
  @media (max-width: 800px) {
    display: none;
  }
`

export const modalCloseIconStyle = css`
  position: absolute;
  width: 24px;
  height: 24px;
  line-height: 10px;
  text-align: center;
  top: 20px;
  right: 24px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${getColor("grayBlue", "02")};
  z-index: 1;
`

export const headerStyle = css`
  padding: 20px 24px;
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  gap: 32px;
`

export const footerStyle = css`
  display: flex;
  width: 100%;
  padding: 24px;
  justify-content: flex-end;
  align-items: center;
`

export const containerStyle = css`
  position: relative;
  width: 800px;
  overflow-x: auto;
`
export const contentContainerStyle = css`
  min-height: 300px;
  max-height: 800px;
  overflow-y: auto;
  width: 100%;
  position: relative;
`

export const resourceOptionStyle = css`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 8px;
`

export const labelStyle = css`
  display: flex;
  gap: 8px;
  align-items: center;
  min-width: 250px;
  max-width: 300px;
`

export const emptyStyle = css`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  bottom: 0;
`
