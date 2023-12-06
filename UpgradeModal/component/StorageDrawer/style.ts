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

  ${applyMobileStyle(css`
    padding: 0 24px;
  `)}
`

export const closeIconStyle = css`
  cursor: pointer;
  position: absolute;
  top: 6px;
  right: 24px;
  font-size: 12px;

  ${applyMobileStyle(css`
    top: 6px;
    right: 24px;
    font-size: 12px;
  `)}
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

export const manageContentStyle = css`
  padding: 8px 0 24px;

  ${applyMobileStyle(css`
    padding: 8px 0 24px 0;
  `)}
`

export const labelStyle = css`
  font-weight: 500;
  font-size: 14px;
  line-height: 22px;

  ${applyMobileStyle(css`
    font-size: 14px;
    line-height: 22px;
  `)}
`

export const manageItemStyle = css`
  display: flex;
  gap: 16px;
  padding-top: 8px;

  ${applyMobileStyle(css`
    gap: 16px;
    padding-top: 8px;
  `)}
`

export const subTotalStyle = css`
  display: flex;
  justify-content: space-between;
  padding: 24px 0;

  ${applyMobileStyle(css`
    padding: 24px 0;
  `)}
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
