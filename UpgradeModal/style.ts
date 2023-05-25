import { css } from "@emotion/react"
import { getColor } from "@illa-design/react"
import decorate from "@/illa-public-component/UpgradeModal/assets/upgrad-modal-bg.svg"

export const modalStyle = css`
  border: unset;
  width: 486px;
  background: ${getColor("white", "01")};
  border: 1px solid ${getColor("grayBlue", "08")};
  box-shadow: 0 4px 16px rgb(0 0 0 / 8%);
  border-radius: 8px;
`

export const decorateStyle = css`
  width: 100%;
`

export const modalDecorateStyle = css`
  ${decorateStyle};
  background-image: url(${decorate});
`

export const footerStyle = css`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 16px;
`

export const priceContentStyle = css`
  font-size: 12px;
  line-height: 20px;
  color: ${getColor("grayBlue", "03")};
`

export const priceStyle = css`
  font-weight: 500;
  font-size: 14px;
  line-height: 22px;
  color: ${getColor("grayBlue", "02")};
`
