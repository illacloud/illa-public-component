import { css } from "@emotion/react"
import { getColor } from "@illa-design/react"
import { pxToRem } from "@/style"

export const cropperWrapperStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  position: relative;
`

export const modalStyle = css`
  //border: 1px solid ${getColor("grayBlue", "08")};
  border: unset;
  padding-bottom: 24px;
  overflow: auto;
`

export const modalTitleStyle = css`
  margin: 24px 0 16px;
  text-align: center;
  font-weight: 700;
  font-size: 20px;
  line-height: 28px;
  color: ${getColor("grayBlue", "02")};
`

export const applyZoomStyle = (zoom: number) => css`
  background-size: ${((zoom - 0.5) / 2.5) * 100}% 100%;
`

export const controlStyle = css`
  -webkit-appearance: none;
  -moz-appearance: none;
  height: 4px;
  border-radius: 2px;
  background: linear-gradient(
        ${getColor("techPurple", "01")},
        ${getColor("techPurple", "01")}
      )
      no-repeat,
    ${getColor("grayBlue", "08")};
  background-size: 0 100%;
  width: 100%;

  &::-moz-range-thumb {
    -webkit-appearance: none;
    -moz-appearance: none;
    border: 2px solid ${getColor("techPurple", "01")};
    border-radius: 50%;
    width: 12px;
    height: 12px;
    transition: box-shadow 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  }

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    -moz-appearance: none;
    border: 2px solid ${getColor("techPurple", "01")};
    background: ${getColor("white", "01")};
    border-radius: 50%;
    width: 12px;
    height: 12px;
    transition: box-shadow 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  }

  &:hover {
    cursor: pointer;

    input[type="range"]::-webkit-slider-thumb {
      box-shadow: 0 0 0 8px rgba(63, 81, 181, 0.16);
      border-radius: 50%;
    }

    input[type="range"]::-moz-range-thumb {
      box-shadow: 0 0 0 8px rgba(63, 81, 181, 0.16);
    }
  }
`

export const cropperContainerStyle = css`
  width: 100%;
  height: 260px;
  position: relative;
  margin-bottom: 18px;

  //.cropArea {
  //  width: 120px !important;
  //  height: 120px !important;
  //}
`

export const controlContainerStyle = css`
  padding: 0 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 26px;
`

export const closeIconStyle = css`
  cursor: pointer;
  width: 14px;
  height: 14px;
  margin: 5px;
  position: absolute;
  top: 26px;
  right: 24px;
`

export const rotateIconStyle = css`
  cursor: pointer;
  width: 16px;
  height: 16px;
  margin: 0 8px;
  margin-left: 24px;
`

export const saveButtonStyle = css`
  width: 200px;
`

export const loadingStyle = css`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`
export const rowStyle = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
`

// Mobile

export const mobileModalStyle = css`
  overflow: hidden;
  border: unset;
  width: ${pxToRem(653)};
  min-width: ${pxToRem(653)};
  border-radius: ${pxToRem(16)};
  padding-bottom: ${pxToRem(24)};

  & > div {
    &:last-child {
      display: flex;
      justify-content: flex-end;
      padding: ${pxToRem(48)} ${pxToRem(32)};
    }
  }
`

export const mobileModalTitleStyle = css`
  margin: 28rem 0;
  text-align: center;
  font-weight: 500;
  font-size: 32rem;
  line-height: 40rem;
  color: ${getColor("grayBlue", "02")};
`

export const mobileCropperContainerStyle = css`
  width: 100%;
  height: 653rem;
  position: relative;
  margin-bottom: 36rem;
`

export const mobileControlContainerStyle = css`
  padding: 0 32rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 44rem;
`

export const mobileControlStyle = css`
  ${controlStyle};
  height: 8rem;
  border-radius: 4rem;

  &::-moz-range-thumb {
    border: 4rem solid ${getColor("techPurple", "01")};
    width: 24rem;
    height: 24rem;
  }

  &::-webkit-slider-thumb {
    border: 4rem solid ${getColor("techPurple", "01")};
    width: 24rem;
    height: 24rem;
  }
`

export const mobileRotateIconStyle = css`
  cursor: pointer;
  width: 32rem;
  height: 32rem;
  margin: 0 16rem;
  margin-left: 48rem;
`

export const mobileCloseIconStyle = css`
  cursor: pointer;
  width: 21rem;
  height: 21rem;
  margin: 13.5rem;
  position: absolute;
  top: 24rem;
  right: 48rem;
`

export const mobileButtonStyle = css`
  width: 100%;
  height: ${pxToRem(88)};
  border-radius: ${pxToRem(16)};

  & > span {
    font-size: ${pxToRem(32)};
  }
`
