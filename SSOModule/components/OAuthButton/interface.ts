import { ReactNode } from "react"

export interface OAuthButtonProps {
  icon: ReactNode
  children?: ReactNode
  type: "github" | "google"
  isMobile: boolean
  landing: "signin" | "signup" | "connect"
}
