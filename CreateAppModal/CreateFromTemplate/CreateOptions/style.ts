import { css } from "@emotion/react"
import { getColor } from "@illa-design/react"

export const createOptionsStyle = css`
  width: 100%;
  display: flex;
  align-items: flex-start;
  gap: 24px;
`

export const createOptionsContainerStyle = (
  isInModal: boolean,
  bgColor: string,
  loading?: boolean,
) => {
  const isInModalStyle = css`
    height: 118px;
    width: 200px;
    padding: 24px;
    flex-direction: column;
    text-align: center;
    gap: 8px;
  `
  const isNotInModalStyle = css`
    height: 120px;
    width: 250px;
    padding: 30px 24px;
    gap: 16px;
  `
  return css`
    display: flex;
    color: ${getColor("white", "01")};
    border-radius: 8px;
    align-items: center;
    background-color: ${bgColor};
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 22px;
    pointer-events: ${loading ? "none" : "auto"};
    cursor: pointer;
    ${isInModal ? isInModalStyle : isNotInModalStyle}
  `
}

export const iconStyle = css`
  display: flex;
  padding: 12px;
  width: 40px;
  height: 40px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  border-radius: 50%;
  background-color: ${getColor("white", "07")};
  position: relative;
`
