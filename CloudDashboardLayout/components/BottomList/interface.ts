import { ReactNode } from "react"

export interface BottomListProps {
  onClickMenuItemCallback?: (key: string) => void
  extBottomComponent?: ReactNode
}
