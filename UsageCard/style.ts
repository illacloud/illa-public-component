import { SerializedStyles, css } from "@emotion/react"
import { getColor } from "@illa-design/react"
import { pxToRem } from "@/style"

export const usageCardStyle = css`
  width: 100%;
  padding: 24px;
  color: ${getColor("grayBlue", "02")};
  font-size: 14px;

  border: 1px solid ${getColor("grayBlue", "08")};
  border-radius: 8px;
`

export const titleLineStyle = css`
  display: flex;
  align-items: center;
  gap: 16px;
  font-weight: 500;
  font-size: 14px;
`

export const iconStyle = css`
  width: 64px;
  height: 64px;
`

export const usageProgressStyle = css`
  margin: 24px 0 8px;
`

export const currentTextStyle = css`
  padding: 0 5px;
  background: ${getColor("grayBlue", "09")};
  border-radius: 10px;
  margin-right: 8px;
`

export const lastLineStyle = css`
  margin-top: 16px;
  text-align: end;
`

// Mobile

export const mobileUsageCardStyle = css`
  width: 100%;
  padding: 32rem;
  color: ${getColor("grayBlue", "02")};
  font-size: 28rem;

  border: 1px solid ${getColor("grayBlue", "08")};
  border-radius: 16rem;
`

export const mobileTitleLineStyle = css`
  display: flex;
  align-items: center;
  gap: 32rem;
  font-weight: 500;
`

export const mobileIconStyle = css`
  width: 128rem;
  height: 128rem;
`

export const mobileUsageProgressStyle = css`
  margin: ${pxToRem(40)} 0 ${pxToRem(16)};
  & > div {
    height: ${pxToRem(8)};
    & > div {
      border-radius: ${pxToRem(4)};
      height: ${pxToRem(8)};
    }
  }
`

export const mobileCurrentTextStyle = css`
  padding: 0 10rem;
  background: ${getColor("grayBlue", "09")};
  border-radius: 20rem;
  margin-right: 16rem;
`

export const mobileLastLineStyle = css`
  margin-top: 24rem;
  text-align: end;
`
