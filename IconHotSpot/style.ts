import { css } from "@emotion/react"

export const iconHotSpotContainerStyle = (
  iconSize: number = 16,
  activeColor: string,
  inactiveColor: string,
  activeBgColor: string,
) => css`
  padding: 4px;
  border-radius: 4px;
  font-size: ${iconSize}px;
  color: ${inactiveColor};
  width: ${iconSize + 4 * 2}px;
  height: ${iconSize + 4 * 2}px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex: none;
  border: none;
  background-color: transparent;
  cursor: pointer;
  :disabled {
    cursor: not-allowed;
  }
  :hover {
    color: ${activeColor};
    background-color: ${activeBgColor};
  }
`
