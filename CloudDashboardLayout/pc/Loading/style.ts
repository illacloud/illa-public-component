import { css, keyframes } from "@emotion/react"
import { rightContainerStyle } from "../style"

export const PANEL_TRANSLATE_WIDTH = 40

const enlargeRightPanel = keyframes`
  0% {
    transform: translate3d(${PANEL_TRANSLATE_WIDTH}px, 0, 0);
    opacity: 0;
  }
  100% {
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }
`

export const rightAnimationStyle = css`
  ${rightContainerStyle};
  opacity: 0;
  transform: translate3d(${PANEL_TRANSLATE_WIDTH}px, 0, 0);
  animation: ${enlargeRightPanel} 300ms ease-in-out 200ms forwards;
`
