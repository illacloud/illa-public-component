import { css } from "@emotion/react"
import { getColor } from "@illa-design/react"

export const resourceCardContainerStyle = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 24px;
  gap: 16px;
  border: 1px solid ${getColor("grayBlue", "08")};
  border-radius: 8px;
  .editActionButton {
    visibility: hidden;
  }
  :hover {
    border-color: ${getColor("techPurple", "03")};
    box-shadow: 0 4px 16px 0 rgba(0, 0, 0, 0.08);
    .editActionButton {
      visibility: visible;
    }
  }
`

export const headerContainerStyle = css`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  position: relative;
`

export const resourceIconAndNameContainerStyle = css`
  display: flex;
  align-items: center;
  gap: 16px;
  max-width: 304px;
`

export const resourceNameStyle = css`
  font-size: 16px;
  font-weight: 500;
  line-height: 24px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin: 0;
  padding: 0;
`

export const dbNameStyle = (hasDBName: boolean) => css`
  font-size: 14px;
  line-height: 22px;
  color: ${hasDBName ? getColor("grayBlue", "02") : getColor("grayBlue", "03")};
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  margin: 0;
  padding: 0;
`

export const footerContainerStyle = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`

export const resourceTypeStyle = css`
  color: ${getColor("grayBlue", "03")};
  font-size: 14px;
  line-height: 22px;
  margin: 0;
  padding: 0;
`
