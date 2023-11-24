import { ForwardRefRenderFunction, forwardRef } from "react"
import { getColor } from "@illa-design/react"
import { IconHotSpotProps } from "./interface"
import { iconHotSpotContainerStyle } from "./style"

const IconHotSpot: ForwardRefRenderFunction<
  HTMLSpanElement,
  IconHotSpotProps
> = (props, ref) => {
  const {
    children,
    iconSize = 16,
    inactiveColor = getColor("grayBlue", "04"),
    activeColor = getColor("grayBlue", "02"),
    activeBgColor = getColor("grayBlue", "09"),
    ...otherProps
  } = props

  return (
    <span
      {...otherProps}
      css={iconHotSpotContainerStyle(
        iconSize,
        activeColor,
        inactiveColor,
        activeBgColor,
      )}
      ref={ref}
    >
      {children}
    </span>
  )
}

export default forwardRef<HTMLSpanElement, IconHotSpotProps>(IconHotSpot)
