import { HTMLAttributes, ReactNode } from "react"

export interface IconHotSpotProps extends HTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  disabled?: boolean
  iconSize?: number
  activeColor?: string
  activeBgColor?: string
  inactiveColor?: string
  type?: "button" | "submit" | "reset"
}
