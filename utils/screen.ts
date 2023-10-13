import { useWindowSize } from "react-use"

export const MOBILE_SCREEN_WIDTH = 780

export const isMobileByWindowSize = (currentWidth: number) => {
  return currentWidth < MOBILE_SCREEN_WIDTH
}

export const useIsMobile = () => {
  const { width } = useWindowSize()
  return isMobileByWindowSize(width)
}
