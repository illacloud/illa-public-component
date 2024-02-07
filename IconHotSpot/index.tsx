import { ForwardRefRenderFunction, forwardRef } from "react"
import { getColor } from "@illa-design/react"
import { IconHotSpotProps } from "./interface"
import { iconHotSpotContainerStyle } from "./style"

const IconHotSpot: ForwardRefRenderFunction<
  HTMLButtonElement,
  IconHotSpotProps
> = (props, ref) => {
  const {
    children,
    iconSize = 16,
    inactiveColor = getColor("grayBlue", "04"),
    activeColor = getColor("grayBlue", "02"),
    activeBgColor = getColor("grayBlue", "09"),
    type = "button",
    ...otherProps
  } = props

  return (
    <button
      {...otherProps}
      type={type}
      css={iconHotSpotContainerStyle(
        iconSize,
        activeColor,
        inactiveColor,
        activeBgColor,
      )}
      ref={ref}
    >
      {children}
    </button>
  )
}

export default forwardRef<HTMLButtonElement, IconHotSpotProps>(IconHotSpot)
