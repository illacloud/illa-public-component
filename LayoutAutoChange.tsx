import { FC, ReactNode } from "react"
import { useWindowSize } from "react-use"
import { isMobileByWindowSize } from "@/utils/screen"

interface LayoutAutoChangeProps {
  desktopPage: ReactNode
  mobilePage?: ReactNode
}

export const LayoutAutoChange: FC<LayoutAutoChangeProps> = (props) => {
  const { desktopPage, mobilePage } = props
  const { width } = useWindowSize()
  const isMobile = isMobileByWindowSize(width)
  return <>{isMobile ? mobilePage : desktopPage}</>
}
