import { css } from "@emotion/react"
import { getColor } from "@illa-design/react"

export const baseContentContainerStyle = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
`

export const templateContentContainerStyle = css`
  display: flex;
  padding: 16px 24px;
  flex-direction: column;
  align-items: flex-start;
  gap: 40px;
  width: 100%;
  height: 100%;
  overflow-y: auto;
`

export const contentContainerStyle = css`
  height: 100%;
  position: relative;
  ${baseContentContainerStyle};
`

export const contentTitleStyle = css`
  color: ${getColor("grayBlue", "02")};
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 24px;
`

export const templateListContainerStyle = css`
  width: 100%;
  padding-bottom: 16px;
  display: grid;
  gap: 24px;
  grid-template-columns: repeat(3, minmax(200px, 1fr));
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
