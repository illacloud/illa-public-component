import { css } from "@emotion/react"
import { applyMobileStyle } from "@illa-public/utils"
import { getColor } from "@illa-design/react"

export const drawerMaskStyle = css`
  background-color: ${getColor("white", "05")};
  backdrop-filter: blur(5px);
`

export const drawerStyle = css`
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.08);
`
export const drawerPaddingStyle = css`
  padding: 0 24px;
`

export const titleContainerStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  ${drawerPaddingStyle};
  padding-bottom: 16px;
`

export const closeIconContainerStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 6px;
  cursor: pointer;
`

export const closeIconStyle = css`
  font-size: 12px;
`

export const drawerContentStyle = css`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  color: ${getColor("grayBlue", "02")};
  font-weight: 500;
  font-size: 14px;
  line-height: 22px;
  padding: 24px 0;

  ${applyMobileStyle(css`
    font-size: 14px;
    line-height: 22px;
  `)}
`

export const titleStyle = css`
  font-weight: 600;
  font-size: 18px;
  line-height: 24px;
`

export const manageContentStyle = css`
  padding: 8px 24px 24px 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`

export const manageHeaderStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`

export const managePriceStyle = css`
  display: flex;
  flex-direction: column;
  gap: 4px;
  align-items: flex-end;
  color: ${getColor("grayBlue", "03")};
  font-weight: 400;
  line-height: 20px;
  font-size: 12px;
`
export const accountsStyle = css`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 24px;
`
export const labelStyle = css`
  font-weight: 500;
  font-size: 14px;
  line-height: 22px;
`

export const manageItemStyle = css`
  display: flex;
  gap: 16px;
  padding-top: 8px;
`

export const subTotalStyle = css`
  display: flex;
  justify-content: space-between;
`

export const priceStyle = css`
  text-align: end;
`

export const priceTotalStyle = css`
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  color: ${getColor("techPurple", "03")};
  margin-bottom: 4px;

  ${applyMobileStyle(css`
    font-size: 16px;
    line-height: 24px;
    margin-bottom: 4px;
  `)}
`

export const priceTotalLabelStyle = css`
  font-weight: 400;
  font-size: 12px;
  line-height: 20px;
  color: ${getColor("grayBlue", "03")};

  ${applyMobileStyle(css`
    font-size: 12px;
    line-height: 20px;
  `)}
`

export const descriptionStyle = css`
  text-align: start;
  font-weight: 400;
  font-size: 12px;
  line-height: 20px;
  color: ${getColor("grayBlue", "03")};
  ${drawerPaddingStyle};
`
