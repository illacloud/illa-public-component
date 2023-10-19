import { ReactNode } from "react"

export interface BaseMenuItemInfo {
  labelName: string
  labelKey: string
  icon: ReactNode
  href?: string
  inStation?: boolean
  onClickCallback?: (labelKey: string) => void
  hidden?: boolean
}

export interface MenuItemShape extends BaseMenuItemInfo {
  customRender?: (menuItemInfo: BaseMenuItemInfo) => ReactNode
}

export interface MenuItemProps extends MenuItemShape {
  isSelected?: boolean
}

export interface DynamicMenuProps {
  config: MenuItemShape[]
  selectedKey?: string
}
