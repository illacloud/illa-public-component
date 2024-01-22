import { css } from "@emotion/react"
import { getColor } from "@illa-design/react"
import {
  CARD_LARGE_HEIGHT,
  CARD_LARGE_WIDTH,
  CARD_NORMAL_HEIGHT,
  CARD_NORMAL_WIDTH,
} from "./constants"
import { CardSize } from "./interface"

export const cardContainerStyle = (size: CardSize) => css`
  display: flex;
  flex: none;
  min-width: ${size === "normal" ? CARD_NORMAL_WIDTH : CARD_LARGE_WIDTH}px;
  padding-bottom: 16px;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  border: 1px solid ${getColor("grayBlue", "08")};
  border-radius: 8px;
  overflow: hidden;
`

export const cardImageContainerStyle = (size: CardSize) => css`
  width: 100%;
  height: ${size === "normal" ? CARD_NORMAL_HEIGHT : CARD_LARGE_HEIGHT}px;
  overflow: hidden;
  position: relative;
  background-color: ${getColor("grayBlue", "09")};
`

export const cardImageStyle = css`
  width: 100%;
`

export const cardMaskStyle = (show: boolean) => css`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${getColor("blackAlpha", "05")};
  height: 100%;
  width: 100%;
  bottom: 0;
  left: 0;
  overflow: hidden;
  opacity: ${show ? 1 : 0};
  transition: opacity 0.2s ease-in-out;
`

export const cardContentContainerStyle = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 0 12px;
`

export const appNameStyle = (size: CardSize) => css`
  overflow: hidden;
  color: ${getColor("grayBlue", "02")};
  font-size: ${size === "normal" ? 12 : 14}px;
  font-style: normal;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-weight: 500;
  line-height: ${size === "normal" ? 18 : 22}px;
`

export const appDescriptionStyle = css`
  overflow: hidden;
  color: ${getColor("grayBlue", "03")};
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 18px;
`
