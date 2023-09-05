import { ReactNode } from "react"

export interface AvatarUploadProps {
  onOk: (blob: Blob) => Promise<boolean>
  isMobile?: boolean
  children: ReactNode
  disabled?: boolean
}
