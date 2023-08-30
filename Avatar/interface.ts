import { HTMLAttributes } from "react"

export interface AvatarProps extends HTMLAttributes<HTMLSpanElement> {
  avatarUrl?: string
  id?: string
  name?: string
  size?: number
}
