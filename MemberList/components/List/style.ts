import { css } from "@emotion/react"
import { getColor } from "@illa-design/react"

export const listBodyStyle = css`
  overflow: auto;
  thead {
    tr {
      th {
        background-color: white;
      }
    }
  }
`

export const listWrapperStyle = css`
  width: 100%;
  height: 100%;
  padding: 0 32px;
  box-sizing: border-box;
  overflow: hidden;
`

/**
 * NameSpace style
 */

export const nameSpaceWrapperStyle = css`
  max-width: 520px;
  display: flex;
  gap: 8px;
  align-items: center;
`

export const nameAndEmailWrapperStyle = css`
  display: flex;
  flex-direction: column;
`

export const nameStyle = css`
  font-size: 14px;
  font-weight: 500;
  line-height: 22px;
  color: ${getColor("grayBlue", "02")};
  margin: 0;
`

export const emailStyle = css`
  font-size: 12px;
  font-weight: 400;
  line-height: 16px;
  color: ${getColor("grayBlue", "03")};
  margin: 0;
`
