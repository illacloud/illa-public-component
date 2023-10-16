import { FC } from "react"
import { Link } from "react-router-dom"
import { MenuItemProps } from "./interface"
import {
  iconHotSpotStyle,
  listItemTextStyle,
  menuItemButtonStyle,
  menuItemContainerStyle,
  menuItemLinkStyle,
} from "./style"

export const MenuItem: FC<MenuItemProps> = (props) => {
  const {
    labelKey,
    labelName,
    href,
    inStation,
    icon,
    isSelected = false,
    customRender,
    onClickCallback,
  } = props

  const handleClickItem = () => {
    onClickCallback && onClickCallback(labelKey)
  }

  return (
    <div key={labelKey} css={menuItemContainerStyle(isSelected)}>
      {customRender ? (
        customRender(props)
      ) : href ? (
        <Link
          css={menuItemLinkStyle}
          to={href}
          target={inStation ? "_self" : "_blank"}
          rel="noreferrer"
          onClick={handleClickItem}
        >
          <span css={iconHotSpotStyle}>{icon}</span>
          <span css={listItemTextStyle}>{labelName}</span>
        </Link>
      ) : (
        <div css={menuItemButtonStyle} onClick={handleClickItem}>
          <span css={iconHotSpotStyle}>{icon}</span>
          <span css={listItemTextStyle}>{labelName}</span>
        </div>
      )}
    </div>
  )
}
