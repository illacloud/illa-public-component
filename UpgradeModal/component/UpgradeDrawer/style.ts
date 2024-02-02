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
  position: relative;
  padding: 0 24px;
`

export const closeIconStyle = css`
  cursor: pointer;
  position: absolute;
  top: 6px;
  right: 24px;
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

  ${applyMobileStyle(css`
    font-size: 14px;
    line-height: 22px;
  `)}
`

export const titleStyle = css`
  font-weight: 600;
  font-size: 18px;
  line-height: 24px;
  margin: 24px 0 16px;

  ${applyMobileStyle(css`
    font-size: 18px;
    line-height: 24px;
    margin: 24px 0 16px 0;
  `)}
`

export const manageItemStyle = css`
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 8px 0 24px 0;
`

export const subTotalStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding-top: 24px;
`

export const subTotalLeftStyle = css`
  color: ${getColor("grayBlue", "02")};
  font-size: 16px;
  font-weight: 500;
  line-height: 24px;
  text-transform: capitalize;
`

export const priceStyle = css`
  text-align: end;
  display: flex;
  flex-direction: column;
  gap: 12px;
  justify-content: flex-end;
`

export const priceLabelContainerStyle = css`
  display: flex;
  flex-direction: column;
`

export const priceTotalStyle = css`
  color: ${getColor("grayBlue", "02")};
  margin-bottom: 4px;
  text-align: right;
  font-size: 18px;
  font-weight: 500;
  line-height: 24px;
  text-transform: capitalize;
`

export const priceTotalLabelStyle = css`
  font-weight: 400;
  font-size: 12px;
  line-height: 20px;
  color: ${getColor("grayBlue", "03")};
`

export const textCenterStyle = css`
  text-align: center;
`

export const appSumoLinkStyle = css`
  font-size: 14px;
  line-height: 22px;

  ${applyMobileStyle(css`
    font-size: 14px;
    line-height: 22px;
  `)}
`

export const descriptionStyle = css`
  text-align: start;
  margin-top: 16px;
  margin-bottom: 24px;
  font-weight: 400;
  font-size: 12px;
  line-height: 20px;
  color: ${getColor("grayBlue", "03")};

  ${applyMobileStyle(css`
    margin-top: 16px;
    margin-bottom: 24px;
    font-size: 12px;
    line-height: 20px;
  `)}
`

export const radioContainerStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  align-self: stretch;
`

export const labelStyle = css`
  color: ${getColor("grayBlue", "02")};
  font-size: 14px;
  font-weight: 400;
  line-height: 24px;
`

export const hasExtraRadioStyle = css`
  display: flex;
  align-items: flex-start;
  gap: 8px;
`

export const extraStyle = css`
  display: flex;
  padding: 2px 8px;
  justify-content: center;
  align-items: center;
  gap: 4px;
  border-radius: 32px;
  background: ${getColor("green", "08")};
  color: ${getColor("green", "03")};
  font-size: 12px;
  font-weight: 400;
  line-height: 20px;
`

export const discountStyle = css`
  color: ${getColor("red", "03")};
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px;
  text-align: right;
`

export const monthPriceStyle = css`
  color: ${getColor("grayBlue", "02")};
  text-align: center;
  font-size: 24px;
  font-weight: 700;
  line-height: 120%;
`

export const monthUnitStyle = css`
  color: ${getColor("grayBlue", "02")};
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
`
